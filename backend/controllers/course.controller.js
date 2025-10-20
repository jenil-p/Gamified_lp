const Course = require('../models/Course.model');
const Class = require('../models/Class.model');
const User = require('../models/User.model');


async function createCourse(req, res) {
  try {
    const { name, courseCode, tutorId, classId } = req.body;

    if (!name || !tutorId || !classId)
      return res.status(400).json({ message: "name, tutorId, and classId are required" });

    const tutor = await User.findById(tutorId);
    if (!tutor) return res.status(404).json({ message: "Tutor not found" });

    const classObj = await Class.findById(classId);
    if (!classObj) return res.status(404).json({ message: "Class not found" });

    const existing = await Course.findOne({ courseCode });
    if (existing) return res.status(409).json({ message: "Course code already exists" });

    const newCourse = await Course.create({
      name,
      courseCode,
      tutor: tutor._id,
      class: classObj._id,
    });

    res.json({ message: "Course created successfully", course: newCourse });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Admin updates tutor for an existing course
async function assignTutorToCourse(req, res) {
  try {
    const { courseId, tutorId } = req.body;

    const tutor = await User.findById(tutorId);
    if (!tutor) return res.status(404).json({ message: "Tutor not found" });

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    course.tutor = tutor._id;
    await course.save();

    res.json({ message: "Tutor assigned successfully", course });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Teacher fetches their assigned courses
async function getCoursesForTutor(req, res) {
  try {
    const courses = await Course.find({ tutor: req.userId }).populate('class');
    res.json({ courses });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { createCourse, assignTutorToCourse, getCoursesForTutor };
