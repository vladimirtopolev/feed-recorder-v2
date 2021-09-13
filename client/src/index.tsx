import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import {Auth0Provider} from "@auth0/auth0-react";
import {QueryClient, QueryClientProvider} from 'react-query';
import {GlobalMessageProvider} from './context/GlobalMessageContext';

const queryClient = new QueryClient();

ReactDOM.render(
    <React.StrictMode>
        <Auth0Provider
            domain={process.env.REACT_APP_AUTH0_DOMAIN_NAME!}
            clientId={process.env.REACT_APP_AUTH0_CLIENT_ID!}
            audience={process.env.REACT_APP_AUTH0_AUDIENCE}
            redirectUri={window.location.origin}
            cacheLocation="localstorage"
        >
            <GlobalMessageProvider>
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter>
                        <App/>
                    </BrowserRouter>
                </QueryClientProvider>
            </GlobalMessageProvider>
        </Auth0Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

