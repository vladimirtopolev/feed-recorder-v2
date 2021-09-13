import jwt, { SecretCallbackLong } from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import config from 'config';
import {Request} from 'express';

export type AuthToken =  {
    iss: string,
    sub: string,
    aud: string[],
    iat: number,
    exp: number,
    scope: string
}

export type RequestWithAuth = Request & {auth: AuthToken};

export const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        jwksUri: `https://${config.get<string>('AUTHORIZATION.AUTH0.DOMAIN')}/.well-known/jwks.json`
    }),
    algorithms: ['RS256'],
    audience: config.get<string>('AUTHORIZATION.AUTH0.AUDIENCE'),
    requestProperty: 'auth'
});