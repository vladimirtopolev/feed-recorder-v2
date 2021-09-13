import express from 'express';
import {ProjectModel, Project, projectSchema} from '../models/project.model';
import {checkJwt, RequestWithAuth} from '../middlewares/checkJwt';
import {checkRequest} from '../middlewares/checkRequest';
import ApiError from '../utils/appError';
import httpStatus from 'http-status';
import {createModifier} from '../utils/mongo';
import {RecordModel} from '../models/record.model';

export const projectRouter = express.Router();

projectRouter.get('/',
    checkJwt,
    async (req: RequestWithAuth, res) => {
        const query: Partial<Project> = {
            userOwner: req.auth.sub
        };

        const [count, items] = await Promise.all([
            ProjectModel.countDocuments(query),
            ProjectModel.find(query)
        ]);
        res.send({
            items: items,
            count: count
        });
    });


projectRouter.post('/',
    checkJwt,
    checkRequest(projectSchema),
    async (req: RequestWithAuth, res) => {
        const newItem: Project = {
            ...req.body,
            userOwner: req.auth.sub,
            created: new Date()
        };
        const createdItem = await ProjectModel.create(newItem);
        res.send(createdItem);
    });

projectRouter.put('/:projectId',
    checkJwt,
    async (req: RequestWithAuth, res) => {
        const {projectId} = req.params as { projectId: string };

        const targetProject = await ProjectModel.findById(projectId);
        if (!targetProject) {
            throw new ApiError(httpStatus.BAD_REQUEST, `Project does not exist with id=${projectId}`);
        }
        if (targetProject.userOwner !== req.auth.sub) {
            throw new ApiError(httpStatus.UNAUTHORIZED, `You do not have permissions to get this info`);
        }

        const editedProject = req.body as Partial<Project>;
        const modifier = createModifier<Project>(['name', 'description'], editedProject);

        const newProject = await ProjectModel.findByIdAndUpdate(projectId, {$set: modifier});
        res.send(newProject);
    });


projectRouter.delete('/:projectId',
    checkJwt,
    async (req: RequestWithAuth, res) => {
        const {projectId} = req.params as { projectId: string };

        const targetProject = await ProjectModel.findById(projectId);
        if (!targetProject) {
            throw new ApiError(httpStatus.BAD_REQUEST, `Project does not exist with id=${projectId}`);
        }
        if (targetProject.userOwner !== req.auth.sub) {
            throw new ApiError(httpStatus.UNAUTHORIZED, `You do not have permissions to get this info`);
        }

        const deletedProject = await ProjectModel.findByIdAndDelete(projectId);
        res.send(deletedProject);
    });
