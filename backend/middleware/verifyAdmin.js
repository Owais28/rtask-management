const verifyAdmin = (req, res, next) => {
  // Check if the user has the admin role
  if (req.role === 'admin') {
    // User is an admin, proceed to the next middleware or route handler
    next();
  } else {
    // User is not an admin, return a forbidden error
    res.status(403).json({ error: 'Access denied. Only admin users are allowed.' });
  }
};


module.exports = verifyAdmin