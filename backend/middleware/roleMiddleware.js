const permit = (...allowedRoles) => {
  return (req, res, next) => {
    if (req.user && allowedRoles.includes(req.user.userType)) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden: insufficient permissions' });
    }
  };
};

module.exports = permit;
