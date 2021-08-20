import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
    createStyles({
        button:{
            color: '#ffffff',
            fontWeight: 'bold',
            borderColor: '#ffffff',
            marginLeft: theme.spacing(2)
        }
    })
);

