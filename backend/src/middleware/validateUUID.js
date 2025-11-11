/**
 * Middleware to validate UUID parameters
 * Ensures that any :id passed in the route is a valid UUID v4
 * Returns 400 Bad Request for invalid or unsafe input
 */

export function validateUUID(req, res, next) {
    const { id } = req.params;
  
    // Simple regex for UUID v4 validation
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  
    // Check if ID is missing or invalid
    if (!id || !uuidRegex.test(id)) {
      console.warn(` Invalid ID received: ${id}`);
      return res.status(400).json({
        error: 'Invalid ID format. Please provide a valid UUID.',
      });
    }
  
    // Extra safety: reject obvious SQL injection attempts
    if (/['";\-]/.test(id)) {
      console.warn(` Possible injection attempt blocked: ${id}`);
      return res.status(400).json({
        error: 'Invalid input detected.',
      });
    }
  
    next(); // continue to route handler
  }