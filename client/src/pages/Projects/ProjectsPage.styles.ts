import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
    createStyles({
        container:{
            paddingTop: theme.spacing(2)
        },
    })
);

