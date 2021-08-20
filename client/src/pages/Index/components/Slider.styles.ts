import {createStyles, makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
          padding: theme.spacing(3)
        },
        textContainer: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(2, 0)
        },
        imageContainer: {

        },
        text: {
            textAlign: 'center',
            [theme.breakpoints.up('md')]: {
                textAlign: 'left'
            }
        },
        title: {
            fontWeight: 'bold',
            display: 'block',
            fontSize: '2.5rem',
            [theme.breakpoints.up('md')]: {
                fontSize: '4rem'
            }

        },
        description: {
            marginTop: theme.spacing(2),
            ':after': {
                content: '',
            }
        },
        image: {
            width: '100%'
        },
        button: {
            fontWeight: 'bold',
            fontSize: '1rem',
            padding: theme.spacing(1, 2),
            margin: theme.spacing(4, 0)
        }
    })
);
