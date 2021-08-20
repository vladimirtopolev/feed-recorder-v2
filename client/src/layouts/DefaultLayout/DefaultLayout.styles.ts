import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column'
        },
        content: {
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            background: '#f5f5f5'
        }
    })
);

export default useStyles;
