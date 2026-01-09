import type { INodeProperties } from 'n8n-workflow';

const showOnlyForGetToken = {
    operation: ['getToken'],
    resource: ['account'],
};

export const accountGetTokenDescription: INodeProperties[] = [
    {
        displayName: 'Client ID',
        name: 'client_id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: showOnlyForGetToken,
        },
        routing: {
            send: {
                type: 'body',
                property: 'client_id',
            },
        },
    },
    {
        displayName: 'Client Secret',
        name: 'client_secret',
        type: 'string',
        default: '',
        typeOptions: { password: true },
        required: true,
        displayOptions: {
            show: showOnlyForGetToken,
        },
        routing: {
            send: {
                type: 'body',
                property: 'client_secret',
            },
        },
    },
    {
        displayName: 'Grant Type',
        name: 'grant_type',
        type: 'string',
        default: 'client_credentials',
        required: true,
        displayOptions: {
            show: showOnlyForGetToken,
        },
        routing: {
            send: {
                type: 'body',
                property: 'grant_type',
            },
        },
    },
];
