import {FC} from 'react';
import {Box, CircularProgress} from '@material-ui/core';
import {useStyles} from './DashboardLayout.styles';

type DashBoardLayoutProps = {
    Header: FC;
    isLoading?: boolean;
};

export const DashBoardLayout: FC<DashBoardLayoutProps> = ({children, isLoading, Header}) => {
    const classes = useStyles();

    return (
        <Box className={classes.container}>
            <Box className={classes.header}>
                <Header/>
            </Box>
            <Box className={classes.content}>
                {children}
                {isLoading && (
                    <Box className={classes.loaderContainer}>
                        <CircularProgress />
                    </Box>
                )}
            </Box>

        </Box>
    );
};