import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
    createStyles({
        container:{
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[1],
        },
        content: {
            display: 'flex'
        },
        title: {},
        actionButtons: {
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center'
        }
    })
);

