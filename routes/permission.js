const express = require("express");
const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const PermissionController = require("../controllers/permission");
const router = express.Router();

router.post("",checkAuth,PermissionController.cretePermission);

// router.put("/:id", checkAuth, PermissionController.updatePermission);

router.get("", PermissionController.getPermissions);

router.get("/:id", PermissionController.getPermission);

router.delete("/:id", checkAuth, PermissionController.deletePermission);

module.exports = router;