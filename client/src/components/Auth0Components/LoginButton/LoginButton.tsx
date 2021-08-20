import {FC} from 'react';
import {useAuth0} from '@auth0/auth0-react';
import {Button, ButtonProps} from '@material-ui/core';

export const LoginButton: FC<ButtonProps> = ({children, ...buttonProps}) => {
    const {loginWithRedirect} = useAuth0();
    return (
        <Button
            {...buttonProps}
            onClick={() => loginWithRedirect()}
        >
            {children}
        </Button>);
};