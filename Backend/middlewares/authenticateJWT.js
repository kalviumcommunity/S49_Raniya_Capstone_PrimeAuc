const jwt = require('jsonwebtoken');

// Middleware to validate JWT
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Access denied, no token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add the decoded token payload to the request object
    next(); // Call the next middleware or route handler
  } catch (err) {
    return res.status(400).json({ error: 'Invalid token' });
  }
};

module.exports = authenticateJWT;
