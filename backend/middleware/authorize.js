const authorize = (permissionKeys = []) => {
  return (req, res, next) => {
    if (!req.admin.permissions) {
      return res.status(403).json({ success: false, msg: "Access denied" });
    }

    const hasPermission = permissionKeys.some(
      (key) => req.admin.permissions[key]
    );

    if (!hasPermission) {
      return res.status(403).json({ success: false, msg: "Access denied" });
    }

    next();
  };
};
module.exports = authorize;
