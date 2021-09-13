import * as React from 'react';
import { FC, useContext, useState } from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
const  GLOBAL_MESSAGE_HIDE_DURATION =6000;

interface IGlobalContext {
    pushMessage: (message: GlobalMessage) => void;
}

export const GlobalMessageContext = React.createContext<IGlobalContext>({} as IGlobalContext);

export enum GlobalMessageType {
    ERROR = 'error',
    SUCCESS = 'success',
    WARNING = 'warning',
    INFO = 'info',
}

export type GlobalMessage = {
    type: GlobalMessageType;
    title: string;
};

type GlobalMessageState = {
    open: boolean;
    message: GlobalMessage | null;
};

const GlobalMessageProvider: FC = ({ children }) => {
    const [{ open, message }, setState] = useState<GlobalMessageState>({ open: false, message: null });

    const pushMessage = (message: GlobalMessage): void => setState(() => ({ open: true, message }));

    const handleClose = (): void => {
        setState({ open: false, message: null });
    };
    return (
        <GlobalMessageContext.Provider value={{ pushMessage }}>
            {children}
            {message && (
                <Snackbar open={open} onClose={handleClose} autoHideDuration={GLOBAL_MESSAGE_HIDE_DURATION}>
                    <Alert onClose={handleClose} severity={message.type} variant="filled">
                        {message.title}
                    </Alert>
                </Snackbar>
            )}
        </GlobalMessageContext.Provider>
    );
};

const useGlobalMessage = (): IGlobalContext => useContext(GlobalMessageContext);

export { GlobalMessageProvider, useGlobalMessage };
