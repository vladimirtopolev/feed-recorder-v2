import {FC} from 'react';
import {useStyles} from './Slider.styles';
import {Container, Grid, Typography} from '@material-ui/core';
import {SignupButton} from '../../../components/Auth0Components/SignupButton/SignupButton';
import slideImage from './image-site.jpg';

export const Slider: FC = () => {
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={5} className={classes.textContainer}>
                    <div className={classes.text}>
                        <Typography
                            variant="h2"
                            component="h2"
                            className={classes.title}
                        >
                            FeedRecorder
                        </Typography>
                        <Typography
                            variant="h2"
                            component="h2"
                            className={classes.title}
                        >
                            Developer Tool
                        </Typography>

                        <Typography
                            component="p"
                            className={classes.description}
                        >
                            It helps you to record URL contents during live events
                            and reproduce it during upcoming development or
                            bug fixing in any time
                        </Typography>
                        <SignupButton
                            className={classes.button}
                            variant="contained"
                            color="primary"
                        >
                            Sign Up For Free
                        </SignupButton>
                    </div>
                </Grid>
                <Grid item xs={12} sm={7} className={classes.imageContainer}>
                    <img src={slideImage} className={classes.image}/>
                </Grid>
            </Grid>
        </Container>
    );
};