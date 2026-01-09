import type { INodeProperties } from 'n8n-workflow';
import { accountGetTokenDescription } from './getToken';
import { accountGetInfoDescription } from './getInfo';

const showOnlyForAccount = {
    resource: ['account'],
};

export const accountDescription: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: showOnlyForAccount,
        },
        options: [
            {
                name: 'Get Token',
                value: 'getToken',
                action: 'Get an access token',
                description: 'Exchange client id and secret for an access token',
                routing: {
                    request: {
                        method: 'POST',
                        url: '=/oauth2/token',
                    },
                },
            },
            {
                name: 'Get User Info',
                value: 'getInfo',
                action: 'Get user information',
                description: 'Return user info using a bearer token',
                routing: {
                    request: {
                        method: 'GET',
                        url: '=/oauth2/userinfo',
                    },
                },
            },
        ],
        default: 'getToken',
    },
    ...accountGetTokenDescription,
    ...accountGetInfoDescription,
];
