import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            background: '#ffffff',
            minHeight: 'calc(100vh - 80px)'
        }
    })
);

export default useStyles;
