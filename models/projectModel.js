const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
	name: String,
	leader: String,
	teamMembers: [String],
	description: String,
	createdAt: { type: Date, default: Date.now }
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
