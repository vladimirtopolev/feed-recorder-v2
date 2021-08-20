import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import {Auth0Provider} from "@auth0/auth0-react";

ReactDOM.render(
    <React.StrictMode>
        <Auth0Provider
            domain={process.env.REACT_APP_AUTH0_DOMAIN_NAME!}
            clientId={process.env.REACT_APP_AUTH0_CLIENT_ID!}
            redirectUri={window.location.origin}
        >
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Auth0Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

