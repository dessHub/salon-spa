const mongoose   = require('mongoose');
const Schema     = mongoose.Schema;

const RoleSchema = new Schema({
    name: { type: String, unique: true, lowercase: true }
});

module.exports = mongoose.model('Role', RoleSchema);
