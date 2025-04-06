const Project = require('../models/projectModel');
const asyncWrapper = require('../middlewares/asyncWrapper');

const getProjectDetail = asyncWrapper(async (req, res) => {
	const project = await Project.findById(req.params.id);
	if (!project) {
		return res.status(404).send("Project not found");
	}
	res.status(200).send(project);

});
const getProjects = asyncWrapper(async (req, res) => {
	const projects = await Project.find({});
	res.status(200).send(projects);
});
const createProject = asyncWrapper(async (req, res) => {
	if (!req.body.Title || !req.body.Members || !req.body.details || !req.body.vedio, !req.body.GitHub) {
		return res.status(400).send("Please fill all fields");
	}
	let found_project = await Project.findOne({ Title: req.body.Title });
	if (found_project) {
		return res.status(400).send("Project already exists");
	}
	const project = new Project({
		Title: req.body.Title,
		Members: req.body.Members,
		details: req.body.details,
		video: req.body.vedio,
		GitHub: req.body.GitHub,
	});
	await project.save();
	res.status(201).send("Project created");

});
const deleteProject = asyncWrapper(async (req, res) => {
	const project = await Project.findByIdAndDelete(req.params.id);
	if (!project) {
		return res.status(404).send("Project not found");
	}
	res.status(200).send("Project deleted");
});

const updateProject = asyncWrapper(async (req, res) => {
	const project = await Project.findById(req.params.id);
	if (!project) {
		return res.status(404).send("Project not found");
	}
	let found_project = await Project.findOne({ name: req.body.name });
	if (found_project) {
		return res.status(400).send("Project already exists");
	}
	project.Title = req.body.Title;
	project.Members = req.body.Members;
	project.details = req.body.details;
	project.vedio = req.body.vedio;
	project.GitHub = req.body.GitHub;
	await project.save();
	res.status(200).send("Project updated");
});


module.exports = {
	getProjectDetail,
	getProjects,
	createProject,
	deleteProject,
	updateProject
};
