const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true
	},
	members: {
		type: [String],
		default: []
	},
	details: {
		type: String,
		required: true
	},
	video: {
		type: String,
		required: true
	},
	github: {
		type: String,
		required: true,
		unique: true
	},
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
