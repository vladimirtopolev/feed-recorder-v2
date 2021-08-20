import {IndexPage} from './Index/IndexPage';
import {FC} from 'react';
import {Route, Switch } from 'react-router-dom';

export const PageSwitcher: FC = () =>{
    return (
        <Switch>
            <Route path={'/'} exact={true}><IndexPage/></Route>
        </Switch>
    );

}