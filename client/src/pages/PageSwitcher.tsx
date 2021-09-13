import {FC} from 'react';
import {Route, Switch} from 'react-router-dom';

import {IndexPage} from './Index/IndexPage';
import {ProjectsPage} from './Projects/ProjectsPage';

export const PageSwitcher: FC = () => {
    return (
        <Switch>
            <Route path={'/'} exact={true}><IndexPage/></Route>
            <Route path={'/projects'}><ProjectsPage/></Route>
        </Switch>
    );

};