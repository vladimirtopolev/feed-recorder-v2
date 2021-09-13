import {FC, createContext, useState, useMemo, useContext} from 'react';
import {Box, CircularProgress} from '@material-ui/core';
import {useStyles} from './DefaultLayout.styles';
import {Header} from './components/Header';

type LayoutState = {
    isLoading: boolean;
    setLoadingState: (newStata: boolean) => void;
};
const LayoutStateContext = createContext({} as LayoutState);

export const DefaultLayout: FC = ({children}) => {
    const classes = useStyles();
    const [isLoading, setLoadingState] = useState(false);

    const contextState = useMemo(() => ({
        isLoading,
        setLoadingState
    }), [isLoading]);

    return (
        <LayoutStateContext.Provider value={contextState}>
            <Box className={classes.container}>
                <Header/>
                <Box component="main" className={classes.content}>
                    {children}
                    {isLoading && (
                        <Box className={classes.loaderContainer}>
                            <CircularProgress />
                        </Box>
                    )}
                </Box>
            </Box>
        </LayoutStateContext.Provider>
    );
};

export const useLayoutState = (): LayoutState => useContext(LayoutStateContext);