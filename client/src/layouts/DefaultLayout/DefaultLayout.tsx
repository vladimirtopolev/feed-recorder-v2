import {FC} from 'react';
import {Box} from '@material-ui/core';
import {useStyles} from './DefaultLayout.styles';
import {Header} from './components/Header';

export const DefaultLayout: FC = ({children}) => {
    const classes = useStyles();
    return (
        <Box className={classes.container}>
            <Header/>
            <Box component="main" className={classes.content}>
                {children}
            </Box>
        </Box>
    );
};