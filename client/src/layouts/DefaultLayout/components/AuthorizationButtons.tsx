import {FC} from 'react';
import {LoginButton} from '../../../components/Auth0Components/LoginButton/LoginButton';
import {LogoutButton} from '../../../components/Auth0Components/LogoutButton/LogoutButton';
import {SignupButton} from '../../../components/Auth0Components/SignupButton/SignupButton';


import {useStyles} from './AuthorizationButtons.styles';
import {useAuth0} from '@auth0/auth0-react';

export const AuthorizationButtons: FC = () => {
    const classes = useStyles();

    const {isAuthenticated} = useAuth0();

    if (!isAuthenticated) {
        return (
            <>
                <LoginButton className={classes.button}>Login</LoginButton>
                <SignupButton
                    className={classes.button}
                    variant="outlined"
                >
                    SignUp for Free
                </SignupButton>
            </>
        );
    }

    return (
        <LogoutButton/>
    );
};