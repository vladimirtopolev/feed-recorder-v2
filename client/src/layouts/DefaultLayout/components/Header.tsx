import {FC} from 'react';
import {AppBar, Box, Container, List, ListItem, SvgIcon, Toolbar} from '@material-ui/core';
import {AllInclusive} from '@material-ui/icons';
import {NavLink} from 'react-router-dom';
import {useStyles} from './Header.styles';
import {LoginButton} from '../../../components/Auth0Components/LoginButton/LoginButton';
import {LogoutButton} from '../../../components/Auth0Components/LogoutButton/LogoutButton';
import {SignupButton} from '../../../components/Auth0Components/SignupButton/SignupButton';
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
                            <ListItem button component={NavLink}  to={'/patterns'} className={classes.link}>
                                Patterns
                            </ListItem>
                            <ListItem button component={NavLink}  to={'/records'} className={classes.link}>
                                Records
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