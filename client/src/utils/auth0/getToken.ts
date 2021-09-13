import createAuth0Client from '@auth0/auth0-spa-js';

import {Auth0Client, GetTokenSilentlyOptions} from '@auth0/auth0-spa-js';

let auth0Client: Auth0Client | null = null;

export const createClient = (): Promise<Auth0Client> => {
    return createAuth0Client({
        domain: process.env.REACT_APP_AUTH0_DOMAIN_NAME!,
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID!,
        audience: process.env.REACT_APP_AUTH0_AUDIENCE
    });
};

createClient().then(client => auth0Client = client);

export const getToken = async (opts?: GetTokenSilentlyOptions): Promise<any> => {
    if (auth0Client === null) {
        auth0Client = await createClient();
    }
    return auth0Client.getTokenSilently(opts);
};