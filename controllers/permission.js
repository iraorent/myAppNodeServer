const Permission = require("../models/permission");

exports.cretePermission = (req, res, next) => {
    console.log("per--")
    console.log("per body"+req.body.module);
    const permission = new Permission({
        module: req.body.module,
        name: req.body.name,
        description: req.body.description,
        creator: req.userData.userId
    });
    console.log("-User Data--"+permission);
    
    permission
        .save()
        .then(createdPermission => {
            console.log("success per--")
            res.status(201).json({
                message: "Permission added successfully",
                permission: {
                    ...createdPermission,
                    id: createdPermission._id
                }
            })
        })
        .catch(error => {
            console.log("error per--")
            res.status(500).json({
                message: "Creating a permission failed!"
            });
        });

};

  
exports.getPermissions = (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const permissionQuery = Permission.find();
    let fetchedPermissions;
    if (pageSize && currentPage) {
        permissionQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    permissionQuery
      .then(documents => {
        fetchedPermissions = documents;
        return Permission.count();
      })
      .then(count => {
        res.status(200).json({
          message: "Posts fetched successfully!",
          permissions: fetchedPermissions,
          maxPermissions: count
        });
      })
      .catch(error => {
        res.status(500).json({
          message: "Fetching permissions failed!"
        });
      });
  };
  
exports.getPermission = (req, res, next) => {
    Permission.findById(req.params.id)
      .then(permission => {
        if (permission) {
          res.status(200).json(permission);
        } else {
          res.status(404).json({ message: "Permission not found!" });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Fetching permission failed!"
        });
      });
  };

  exports.deletePermission = (req, res, next) => {
    Permission.deleteOne({ _id: req.params.id, creator: req.userData.userId })
      .then(result => {
        console.log(result);
        if (result.n > 0) {
          res.status(200).json({ message: "Deletion successful!" });
        } else {
          res.status(401).json({ message: "Not authorized!" });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Deleting permissions failed!"
        });
      });
    }
