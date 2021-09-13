import {AxiosInstance, AxiosPromise} from 'axios';
import {PaginatedResponse} from './index';


export type CreateProject = {
    name: string,
    description: string,
}

export type Project = CreateProject & {
    _id: string,
    userOwner: string,
    created: string,
}

export class ProjectApi {
    private request: AxiosInstance;
    projectDomain = '/api/projects';

    constructor(request: AxiosInstance) {
        this.request = request;
    }

    getProjects(): Promise<PaginatedResponse<Project>>{
        return this.request.get(this.projectDomain)
            .then(res => res.data);
    }

    createProject(project: CreateProject):Promise<Project>{
        console.log('post', project)
        return this.request.post(this.projectDomain, project)
            .then(res => res.data);
    }

    editProject(project: Project):Promise<Project>{
        return this.request.put(this.projectDomain + `/${project._id}`, project)
            .then(res => res.data);
    }

    deleteProject(project: Project):Promise<Project> {
        return this.request.delete(this.projectDomain + `/${project._id}`)
            .then(res => res.data);
    }
}