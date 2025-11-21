// Input validation middleware for route parameters

// UUID validation regex pattern
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Validates that a route parameter is a valid UUID format
 * Returns 400 Bad Request if invalid
 * 
 * Usage:
 * router.get('/:id', validateUUID('id'), handler);
 */


/**
 * Middleware to validate multiple UUID parameters
 * 
 * Usage:
 * router.get('/:userId/:bookingId', validateUUIDs(['userId', 'bookingId']), handler);
 */
export function validateUUID(paramName = 'id') {
  return (req, res, next) => {
    const value = req.params[paramName];

    if (!UUID_REGEX.test(value)) {
      return res.status(400).json({
        error: `Invalid UUID format for '${paramName}'`,
      });
    }

    next();
  };
}

export function validateUUIDs(paramNames) {
  return (req, res, next) => {
    for (const name of paramNames) {
      const value = req.params[name];

      if (!UUID_REGEX.test(value)) {
        return res.status(400).json({
          error: `Invalid UUID format for '${name}'`,
        });
      }
    }

    next();
  };
}


/**
 * Generic request body validation middleware
 * 
 * Usage:
 * router.post('/', validateBody({
 *   name: { type: 'string', required: true, min: 2 },
 *   email: { type: 'email', required: true },
 *   age: { type: 'number', required: false, min: 0 },
 * }), handler);
 */
export function validateBody(schema) {
  return (req, res, next) => {
    const errors = [];

    for (const field in schema) {
      const rules = schema[field];
      const value = req.body[field];

      // Required field check
      if (rules.required && (value === undefined || value === null || value === '')) {
        errors.push(`${field} is required`);
        continue;
      }

      // Optional fields: skip if not provided
      if (!rules.required && value === undefined) {
        continue;
      }

      // Type validation
      switch (rules.type) {
        case 'string':
          if (typeof value !== 'string') errors.push(`${field} must be a string`);

          if (rules.min && value.length < rules.min)
            errors.push(`${field} must be at least ${rules.min} characters`);

          if (rules.max && value.length > rules.max)
            errors.push(`${field} must be at most ${rules.max} characters`);
          break;

        case 'number':
          if (typeof value !== 'number') errors.push(`${field} must be a number`);

          if (rules.min !== undefined && value < rules.min)
            errors.push(`${field} must be >= ${rules.min}`);

          if (rules.max !== undefined && value > rules.max)
            errors.push(`${field} must be <= ${rules.max}`);
          break;

        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) errors.push(`${field} must be a valid email`);
          break;

        case 'uuid':
          if (!UUID_REGEX.test(value))
            errors.push(`${field} must be a valid UUID`);
          break;

        case 'date':
          if (isNaN(Date.parse(value)))
            errors.push(`${field} must be a valid date string`);
          break;

        default:
          errors.push(`Unknown validation type for ${field}`);
      }
    }

    // If there are errors, return 400
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    next();
  };
}




/**
 * Sanitizes input to prevent SQL injection
 * (Note: Supabase uses parameterized queries, but good to validate anyway)
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return input;

  // Remove dangerous characters
  return input.replace(/['";\-]/g, '');
}


// Example schema for creating/updating users
export const userSchema = {
  name: { type: 'string', required: true, min: 2, max: 100 },
  email: { type: 'email', required: true },
  membership_type: { type: 'string', required: true },
};

// Example schema for creating/updating bookings
export const bookingSchema = {
  user_id: { type: 'uuid', required: true },
  event_name: { type: 'string', required: true, min: 3 },
  booking_date: { type: 'date', required: true },
  status: { type: 'string', required: false },
};