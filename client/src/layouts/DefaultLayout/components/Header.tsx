import {FC} from 'react';
import {AppBar, Box, Container, List, ListItem, Toolbar} from '@material-ui/core';
import {AllInclusive} from '@material-ui/icons';
import {NavLink} from 'react-router-dom';
import {useStyles} from './Header.styles';
import {AuthorizationButtons} from './AuthorizationButtons';

export const Header:FC = () => {
    const classes = useStyles();

    return (
        <AppBar className={classes.appBar} position="static">
            <Container className={classes.header}>
                <AllInclusive className={classes.logo}/>
                <Toolbar className={classes.toolbar}>
                    <Box className={classes.links}>
                        <List component="nav" aria-label="header main navigation" disablePadding className={classes.linksContainer}>
                            <ListItem button component={NavLink}  to={'/projects'} className={classes.link}>
                                Projects
                            </ListItem>
                        </List>
                    </Box>
                    <Box>
                        <AuthorizationButtons/>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}