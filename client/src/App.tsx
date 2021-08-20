import React from 'react';
import './App.css';
import {DefaultLayout} from './layouts/DefaultLayout/DefaultLayout';
import {PageSwitcher} from './pages/PageSwitcher';

function App() {
    return (
        <DefaultLayout>
            <PageSwitcher/>
        </DefaultLayout>
    );
}

export default App;
