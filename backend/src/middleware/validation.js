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
export function validateUUID(paramName = 'id') {
  return (req, res, next) => {
    // TODO: Extract parameter from req.params using paramName
    // TODO: Check if it matches UUID_REGEX
    // TODO: Return 400 with error message if invalid: res.status(400).json({ error: 'Invalid UUID format' })
    // TODO: Call next() if valid
    
    next(); // Placeholder - remove this when implementing
  };
}

/**
 * Middleware to validate multiple UUID parameters
 * 
 * Usage:
 * router.get('/:userId/:bookingId', validateUUIDs(['userId', 'bookingId']), handler);
 */
export function validateUUIDs(paramNames) {
  return (req, res, next) => {
    // TODO: Loop through paramNames array
    // TODO: Validate each parameter against UUID_REGEX
    // TODO: Return 400 if any are invalid
    // TODO: Call next() if all valid
    
    next(); // Placeholder - remove this when implementing
  };
}

/**
 * Sanitizes input to prevent SQL injection
 * (Note: Supabase uses parameterized queries, but good to validate anyway)
 */
export function sanitizeInput(input) {
  // TODO: Remove or escape potentially dangerous characters
  // TODO: Validate input length
  // TODO: Return sanitized input
  return input;
}

