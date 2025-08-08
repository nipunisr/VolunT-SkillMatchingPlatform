// const permit = (...allowedRoles) => {
//   return (req, res, next) => {
//     if (req.user && allowedRoles.includes(req.user.userType)) {
//       next();
//     } else {
//       res.status(403).json({ message: 'Forbidden: insufficient permissions' });
//     }
//   };
// };

// module.exports = permit;


module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.userType)) {
      return res.status(403).json({ message: 'Forbidden - Insufficient role' });
    }
    next();
  };
};
