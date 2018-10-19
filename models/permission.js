const mongoose = require("mongoose");

const permissionSchema = mongoose.Schema({
  module: { 
    type: String, 
    required: true 
  },

  name: { 
    type: String, 
    required: true 
  },

  description: { 
    type: String,
    required: true 
  },

  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }

});

module.exports = mongoose.model("Permission", permissionSchema);
