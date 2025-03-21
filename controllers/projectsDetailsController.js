const Project = require('../models/projectModel');

getProjectDetail = async (req, res) => {
	try {
		const project = await Project.findById(req.params.id);
		if (!project) {
			return res.status(404).send("Project not found");
		}
		res.render('projectDetail', { project });
	} catch (error) {
		res.status(500).send("Server Error");
	}
};
getProjects = async (req, res) => {
	try {
		const projects = await Project.find();
		res.render('projects', { projects });
	} catch (error) {
		res.status(500).send("Server Error");
	}
};
createProject = async (req, res) => {
	try {
		const project = new Project({
			name: req.body.name,
			leader: req.body.leader,
			teamMembers: req.body.teamMembers,
			description: req.body.description,
			createdAt: req.body.createdAt
		});
		await project.save();
		res.status(201).send("Project created");
	} catch (error) {
		res.status(500).send("Server Error");
	}
};
deleteProject = async (req, res) => {
	try {
		const project = await Project.findByIdAndDelete(req.params.id);
		if (!project) {
			return res.status(404).send("Project not found");
		}
		res.status(200).send("Project deleted");
	} catch (error) {
		res.status(500).send("Server Error");
	}
}

updateProject = async (req, res) => {
	try {
		const project = await Project.findById(req.params.id);
		if (!project) {
			return res.status(404).send("Project not found");
		}
		project.name = req.body.name;
		project.leader = req.body.leader;
		project.teamMembers = req.body.teamMembers;
		project.description = req.body.description;
		project.createdAt = req.body.createdAt;
		await project.save();
		res.status(200).send("Project updated");
	} catch (error) {
		res.status(500).send("Server Error");
	}
}


module.exports = {
	getProjectDetail,
	getProjects,
	createProject,
	deleteProject,
	updateProject
};
