const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  try {
    // Get the JWT token from the 'x-auth-token' header
    const token = req.headers.authorization.split(" ")[1]

    if (!token) {
      // If no token is provided, return a 401 (Unauthorized) response
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    // Verify the token using the JWT_SECRET_KEY
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Attach the user's ID from the token to the request object
    req.user = decoded;

    // Call the next middleware or route handler
    next();
  } catch (err) {
    // If there's an error during token verification, return a 401 (Unauthorized) response
    return res.status(401).json({ error: 'Invalid token.' });
  }
}

module.exports = auth;
