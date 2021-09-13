import {useMutation, useQuery, useQueryClient} from 'react-query';
import API from '../../api';
import {CreateProject, Project} from '../../api/projectApi';

const PROJECTS_DOMAIN = 'projects';

export const useProjects = () => {
    return useQuery(PROJECTS_DOMAIN, () => API.projects.getProjects());
};

export const useCreateProject = () => {
    const queryClient = useQueryClient();
    return useMutation<Project, unknown, CreateProject>(
        (project) => API.projects.createProject(project),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(PROJECTS_DOMAIN);
            }
        }
    );
};

export const useEditProject = () => {
    const queryClient = useQueryClient();
    return useMutation<Project, unknown, Project>(
        (project) => API.projects.editProject(project),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(PROJECTS_DOMAIN);
            }
        }
    );
}

export const useDeleteProject = () => {
    const queryClient = useQueryClient();
    return useMutation<Project, unknown, Project>(
        (project) => API.projects.deleteProject(project),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(PROJECTS_DOMAIN);
            }
        }
    );
}