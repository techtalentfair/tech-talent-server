const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
	Title: String,
	Members: [String],
	details: String,
	vedio: String,
	GitHub: String,
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
