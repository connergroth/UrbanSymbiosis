# Database Schema

## Overview
This document outlines the initial database schema for Urban Symbiosis. The schema is designed to support membership management, events, marketplace, rentals, and social features.

## Schema Design Principles
- Normalize where it makes sense, denormalize for performance
- Use UUID primary keys for security and scalability
- Leverage PostgreSQL features (JSONB, arrays, timestamps)
- Implement soft deletes where applicable
- Use Supabase Row Level Security (RLS) for authorization

## Core Tables

### users (Supabase Auth table - extended)
Supabase manages the core `auth.users` table. We extend it with a public profile table.

### profiles
Stores public member profile information.

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255),
  display_name VARCHAR(100),
  avatar_url TEXT,
  bio TEXT,
  zip_code VARCHAR(10),
  date_of_birth DATE,
  phone VARCHAR(20),

  -- Membership info
  membership_tier VARCHAR(50) DEFAULT 'free', -- free, basic, premium
  membership_status VARCHAR(20) DEFAULT 'active', -- active, inactive, suspended
  membership_start_date TIMESTAMP WITH TIME ZONE,
  membership_end_date TIMESTAMP WITH TIME ZONE,

  -- Demographics
  gender VARCHAR(50),
  interests TEXT[], -- Array of interest tags

  -- Privacy settings
  profile_visibility VARCHAR(20) DEFAULT 'members', -- public, members, private
  show_email BOOLEAN DEFAULT false,
  show_phone BOOLEAN DEFAULT false,

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_active_at TIMESTAMP WITH TIME ZONE
);

-- Indexes
CREATE INDEX idx_profiles_zip_code ON profiles(zip_code);
CREATE INDEX idx_profiles_membership_status ON profiles(membership_status);
CREATE INDEX idx_profiles_interests ON profiles USING GIN(interests);
```

### events
Stores information about workshops, classes, and community events.

```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,

  -- Event details
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  category VARCHAR(100), -- workshop, class, social, meeting, etc.
  tags TEXT[],

  -- Location
  location_type VARCHAR(20), -- physical, virtual, hybrid
  location_name VARCHAR(255),
  location_address TEXT,
  location_details JSONB, -- Room, building, special instructions

  -- Scheduling
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  timezone VARCHAR(50) DEFAULT 'America/New_York',
  is_recurring BOOLEAN DEFAULT false,
  recurrence_rule JSONB, -- RRULE format for recurring events

  -- Capacity
  capacity INTEGER,
  waitlist_enabled BOOLEAN DEFAULT false,

  -- Access
  visibility VARCHAR(20) DEFAULT 'members', -- public, members, private
  members_only BOOLEAN DEFAULT true,
  requires_approval BOOLEAN DEFAULT false,

  -- Pricing
  is_free BOOLEAN DEFAULT true,
  price DECIMAL(10, 2),

  -- Media
  image_url TEXT,
  images TEXT[],

  -- Status
  status VARCHAR(20) DEFAULT 'draft', -- draft, published, cancelled
  cancelled_at TIMESTAMP WITH TIME ZONE,
  cancellation_reason TEXT,

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- Indexes
CREATE INDEX idx_events_start_time ON events(start_time);
CREATE INDEX idx_events_category ON events(category);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_slug ON events(slug);
```

### event_registrations
Tracks who has registered for events (RSVPs).

```sql
CREATE TABLE event_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,

  -- Registration details
  status VARCHAR(20) DEFAULT 'registered', -- registered, waitlisted, cancelled, attended
  guests_count INTEGER DEFAULT 0,
  notes TEXT,

  -- Timestamps
  registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  cancelled_at TIMESTAMP WITH TIME ZONE,
  attended_at TIMESTAMP WITH TIME ZONE,

  -- Unique constraint: one registration per user per event
  UNIQUE(event_id, user_id)
);

-- Indexes
CREATE INDEX idx_event_registrations_event ON event_registrations(event_id);
CREATE INDEX idx_event_registrations_user ON event_registrations(user_id);
CREATE INDEX idx_event_registrations_status ON event_registrations(status);
```

### products
Marketplace items (food, goods, services).

```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,

  -- Product details
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  short_description VARCHAR(500),
  category VARCHAR(100), -- food, goods, services, etc.
  tags TEXT[],

  -- Pricing
  price DECIMAL(10, 2) NOT NULL,
  compare_at_price DECIMAL(10, 2), -- Original price for sale items

  -- Inventory
  sku VARCHAR(100),
  track_inventory BOOLEAN DEFAULT true,
  stock_quantity INTEGER DEFAULT 0,
  allow_backorder BOOLEAN DEFAULT false,

  -- Availability
  is_available BOOLEAN DEFAULT true,
  available_from TIMESTAMP WITH TIME ZONE,
  available_until TIMESTAMP WITH TIME ZONE,

  -- Media
  image_url TEXT,
  images TEXT[],

  -- Status
  status VARCHAR(20) DEFAULT 'draft', -- draft, active, archived

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- Indexes
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_slug ON products(slug);
```

### orders
Customer orders for products.

```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  order_number VARCHAR(50) UNIQUE NOT NULL,

  -- Order totals
  subtotal DECIMAL(10, 2) NOT NULL,
  tax DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,

  -- Status
  status VARCHAR(20) DEFAULT 'pending', -- pending, confirmed, preparing, ready, completed, cancelled
  payment_status VARCHAR(20) DEFAULT 'pending', -- pending, paid, refunded

  -- Fulfillment
  fulfillment_type VARCHAR(20), -- pickup, delivery
  fulfillment_date TIMESTAMP WITH TIME ZONE,
  notes TEXT,

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
```

### order_items
Line items for each order.

```sql
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,

  -- Item details (snapshot at time of order)
  product_name VARCHAR(255) NOT NULL,
  product_sku VARCHAR(100),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);
```

### spaces
Physical spaces available for rental.

```sql
CREATE TABLE spaces (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Space details
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  space_type VARCHAR(50), -- kitchen, meeting_room, event_space, etc.
  capacity INTEGER,

  -- Amenities
  amenities TEXT[], -- wifi, projector, kitchen_access, etc.

  -- Pricing
  hourly_rate DECIMAL(10, 2),
  half_day_rate DECIMAL(10, 2),
  full_day_rate DECIMAL(10, 2),

  -- Availability
  is_available BOOLEAN DEFAULT true,
  booking_buffer_hours INTEGER DEFAULT 1, -- Time between bookings
  min_booking_hours INTEGER DEFAULT 1,
  max_booking_hours INTEGER DEFAULT 8,

  -- Media
  image_url TEXT,
  images TEXT[],

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- Indexes
CREATE INDEX idx_spaces_space_type ON spaces(space_type);
CREATE INDEX idx_spaces_is_available ON spaces(is_available);
```

### space_bookings
Reservations for spaces.

```sql
CREATE TABLE space_bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  space_id UUID REFERENCES spaces(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,

  -- Booking details
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  purpose TEXT,
  expected_attendees INTEGER,

  -- Pricing
  total_price DECIMAL(10, 2) NOT NULL,

  -- Status
  status VARCHAR(20) DEFAULT 'pending', -- pending, confirmed, in_progress, completed, cancelled
  payment_status VARCHAR(20) DEFAULT 'pending', -- pending, paid, refunded

  -- Cancellation
  cancelled_at TIMESTAMP WITH TIME ZONE,
  cancellation_reason TEXT,

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_space_bookings_space ON space_bookings(space_id);
CREATE INDEX idx_space_bookings_user ON space_bookings(user_id);
CREATE INDEX idx_space_bookings_start_time ON space_bookings(start_time);
CREATE INDEX idx_space_bookings_status ON space_bookings(status);
```

### messages
Member-to-member direct messages.

```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  recipient_id UUID REFERENCES profiles(id) ON DELETE CASCADE,

  -- Message content
  subject VARCHAR(255),
  body TEXT NOT NULL,

  -- Status
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP WITH TIME ZONE,

  -- Threading (optional - for future)
  parent_message_id UUID REFERENCES messages(id) ON DELETE CASCADE,

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- Indexes
CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_recipient ON messages(recipient_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);
```

### posts
Community feed posts (social feature).

```sql
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,

  -- Post content
  content TEXT NOT NULL,
  post_type VARCHAR(20) DEFAULT 'text', -- text, image, link, event_share

  -- Media
  image_urls TEXT[],
  link_url TEXT,
  link_metadata JSONB,

  -- Related content
  related_event_id UUID REFERENCES events(id) ON DELETE SET NULL,

  -- Engagement
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,

  -- Visibility
  visibility VARCHAR(20) DEFAULT 'members', -- public, members, private

  -- Status
  status VARCHAR(20) DEFAULT 'published', -- draft, published, hidden, flagged

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- Indexes
CREATE INDEX idx_posts_author ON posts(author_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_status ON posts(status);
```

### notifications
In-app notifications for users.

```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,

  -- Notification details
  type VARCHAR(50) NOT NULL, -- event_reminder, message_received, order_update, etc.
  title VARCHAR(255) NOT NULL,
  message TEXT,

  -- Related entities
  related_entity_type VARCHAR(50), -- event, message, order, etc.
  related_entity_id UUID,
  link_url TEXT,

  -- Status
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP WITH TIME ZONE,

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);
```

## Row Level Security (RLS) Examples

Supabase uses RLS policies to secure data access. Here are example policies:

```sql
-- Profiles: Users can read all members, update only their own
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by members"
  ON profiles FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Events: Members can view published events, admins can manage
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published events are viewable by members"
  ON events FOR SELECT
  USING (status = 'published' AND auth.role() = 'authenticated');

CREATE POLICY "Event creators can update their events"
  ON events FOR UPDATE
  USING (created_by = auth.uid());
```

## Next Steps

1. **Initial Migration**: Create these tables in Supabase
2. **RLS Policies**: Implement comprehensive security policies
3. **Triggers**: Add updated_at triggers, cascading deletes, etc.
4. **Indexes**: Monitor query performance and add indexes as needed
5. **Materialized Views**: Create views for complex analytics queries
6. **Backup Strategy**: Configure automated backups in Supabase

## Migration Strategy

- Use Supabase migrations for version control
- Test migrations in development first
- Document all schema changes
- Keep migrations reversible when possible
