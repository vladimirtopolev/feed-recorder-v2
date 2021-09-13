import {createStyles, makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            position: 'relative',
        },
        titleContainer: {
            display: 'flex',
        },
        title: {
            flexGrow: 1
        },
        loaderContainer: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255,255, 255, 0.5)'
        }
    })
);

export default useStyles;
