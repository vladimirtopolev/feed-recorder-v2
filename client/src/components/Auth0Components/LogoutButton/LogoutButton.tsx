import {FC} from 'react';
import {useAuth0} from '@auth0/auth0-react';
import {Button, ButtonProps, SvgIcon} from '@material-ui/core';

export const LogoutButton: FC<ButtonProps> = ({children, ...buttonProps}) => {
    const {logout} = useAuth0();
    return (
        <Button
            {...buttonProps}
            onClick={() => logout}
        >
            {children || (
                <SvgIcon>
                    <path
                        d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                </SvgIcon>
            )}
        </Button>);
};