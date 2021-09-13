import {Schema, Document, model} from 'mongoose';
import * as yup from 'yup';



export type Project = {
    name: string,
    description: string,
    userOwner: string,
    created: Date,
}

export const projectSchema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string()
})

const ProjectSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, default: ''},
    userOwner: {type: String, required: true},
    created: {type: Date, default: Date.now}
});

export type ProjectDocument = Project & Document;

export const ProjectModel = model<ProjectDocument>('Project', ProjectSchema);
