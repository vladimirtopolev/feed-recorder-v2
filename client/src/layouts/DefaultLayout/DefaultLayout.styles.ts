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
            background: '#f5f5f5',
            position: 'relative'
        },
        loaderContainer: {
            width: '100%',
            height: '100%',
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
        }
    })
);

export default useStyles;
