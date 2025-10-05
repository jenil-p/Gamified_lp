const Role = require('../models/Role.model');

async function AddRole(req, res) {
  const { role } = req.body;

  console.log(req);

  const isRoleExists = await Role.findOne({ role });
  if (isRoleExists) {
    return res.status(409).json({ message: "This role already exists in the system!" });
  }

  await Role.create({ role });
  return res.json({ message: "Role created successfully" });
}



module.exports = { AddRole };
