const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'role', required: true },
    operation: { type: mongoose.Schema.Types.ObjectId, ref: 'operation', required: true },
    table: { type: mongoose.Schema.Types.ObjectId, ref: 'table', required: true },
})

const permission = mongoose.model('permission', permissionSchema);

module.exports = permission;