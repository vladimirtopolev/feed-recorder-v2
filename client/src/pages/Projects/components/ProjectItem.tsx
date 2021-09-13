import {FC, useState, MouseEvent} from 'react';
import {Project} from '../../../api/projectApi';
import {Card, CardHeader, CardActions, Avatar, IconButton, Button, Menu, MenuItem, ListItemIcon} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {useStyles} from './ProjectItem.styles';

type ProjectItemProps = {
    item: Project;
    editItem: (item: Project) => void;
    deleteItem: (item: Project) => void;
}

export const ProjectItem: FC<ProjectItemProps> = ({item, editItem, deleteItem}) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <Card>
            <CardHeader
                avatar={<Avatar>R</Avatar>}
                action={
                    <IconButton aria-label="settings" onClick={handleClick}>
                        <MoreVertIcon/>
                    </IconButton>
                }
                title={item.name}
            />
            <CardActions>
                <Button>Go to project</Button>
            </CardActions>
            <Menu
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
            >
                <MenuItem onClick={() => {
                    handleClose();
                    editItem(item);
                }}>
                    <ListItemIcon className={classes.listIconItem}>
                        <EditIcon/>
                    </ListItemIcon>
                    Edit
                </MenuItem>
                <MenuItem onClick={() => {
                    handleClose();
                    deleteItem(item);
                }}>
                    <ListItemIcon className={classes.listIconItem}>
                        <DeleteIcon/>
                    </ListItemIcon>
                    Delete
                </MenuItem>
            </Menu>
        </Card>
    );
};