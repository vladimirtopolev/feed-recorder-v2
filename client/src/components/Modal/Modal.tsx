import {FC} from 'react';
import {Box, CircularProgress, Dialog, DialogProps, DialogTitle, IconButton, Typography} from '@material-ui/core';
import {useStyles} from './Modal.styles';
import CloseIcon from '@material-ui/icons/Close';

type ModalComponentProps = DialogProps & {
    isLoading?: boolean
    title: string,
    onClose: () => void;
}

export const ModalComponent: FC<ModalComponentProps> = ({children, isLoading, title, ...rest}) => {
    const classes = useStyles();
    return (
        <Dialog {...rest} disableBackdropClick={isLoading}>
            <Box className={classes.container}>
                <DialogTitle disableTypography className={classes.titleContainer}>
                    <Typography variant="h5" className={classes.title}>{title}</Typography>
                    <IconButton aria-label="close-button" onClick={rest.onClose} size={'small'}>
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>
                {children}
                {isLoading && (
                    <Box className={classes.loaderContainer}>
                        <CircularProgress/>
                    </Box>
                )}
            </Box>
        </Dialog>
    );
};