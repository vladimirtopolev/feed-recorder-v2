import {FC} from 'react';
import {useStyles} from './ProjectPageHeader.styles';
import {Box, Button, Container} from '@material-ui/core';

type ProjectPageHeaderProps = {
    openCreateProjectModal: () => void;
};
export const ProjectPageHeader: FC<ProjectPageHeaderProps> = ({openCreateProjectModal}) => {
    const classes = useStyles();
    return (
        <Box className={classes.container}>
            <Container className={classes.content}>
                <h1 className={classes.title}>Projects Dashboard</h1>
                <div className={classes.actionButtons}>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => openCreateProjectModal()}>Create project</Button>
                </div>
            </Container>
        </Box>
    );

};