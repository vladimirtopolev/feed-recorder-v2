import {FC} from 'react';
import API from '../../api';
import {useQuery} from 'react-query';
import {withAuthenticationRequired} from '@auth0/auth0-react';
import { Grid, Container} from '@material-ui/core';
import {useDeleteProjectModal, useEditorProjectModal, useEditProjectModal} from './hooks/useEditorProjectModal';
import {ProjectItem} from './components/ProjectItem';
import {DashBoardLayout} from '../../layouts/DashboardLayout/DashboardLayout';
import {ProjectPageHeader} from './components/ProjectPageHeader';
import {useStyles} from './ProjectsPage.styles';

const ProjectsPageRaw: FC = () => {
    const classes = useStyles();
    const {data, isLoading} = useQuery('projects', () => API.projects.getProjects());

    const {openCreateProjectModal, CreateProjectModal, createProjectModalProps} = useEditorProjectModal();
    const {openEditProjectModal, EditProjectModal, editProjectModalProps} = useEditProjectModal();
    const {openDeleteProjectModal, DeleteProjectModal, deleteProjectModalProps} = useDeleteProjectModal();

    return (
        <DashBoardLayout
            Header={() => <ProjectPageHeader openCreateProjectModal={openCreateProjectModal}/>}
            isLoading={isLoading}
        >
            <Container className={classes.container}>
                <Grid container spacing={3}>
                    {data && data.items && data.items.map(item => (
                        <Grid item xs={12} sm={6} md={4}>
                            <ProjectItem
                                key={item._id}
                                item={item}
                                editItem={openEditProjectModal}
                                deleteItem={openDeleteProjectModal}
                            />
                        </Grid>
                    ))}
                </Grid>
                <CreateProjectModal {...createProjectModalProps}/>
                <EditProjectModal {...editProjectModalProps}/>
                <DeleteProjectModal {...deleteProjectModalProps}/>
            </Container>
        </DashBoardLayout>
    );
};

export const ProjectsPage = withAuthenticationRequired(ProjectsPageRaw);