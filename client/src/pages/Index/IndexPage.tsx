import {FC} from 'react';
import { Slider } from './components/Slider';
import {useStyles} from './IndexPage.styles';

export const IndexPage: FC = () => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Slider/>
        </div>
    );
};