const Class = require('../models/Class.model');

// only admin can create class
async function createClass(req, res) {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Class name is required" });

    const existing = await Class.findOne({ name });
    if (existing) return res.status(409).json({ message: "Class already exists" });

    const newClass = await Class.create({ name });
    res.json({ message: "Class created successfully", class: newClass });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// list all classes
async function getAllClasses(req, res) {
  try {
    const classes = await Class.find({});
    res.json({ classes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// delete a class
async function deleteClass(req, res) {
  try {
    const { id } = req.params;
    const deleted = await Class.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Class not found" });
    res.json({ message: "Class deleted successfully", deleted });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { createClass, getAllClasses, deleteClass };
