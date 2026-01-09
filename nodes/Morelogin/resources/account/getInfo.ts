import type { INodeProperties } from 'n8n-workflow';

const showOnlyForGetInfo = {
    operation: ['getInfo'],
    resource: ['account'],
};

export const accountGetInfoDescription: INodeProperties[] = [
    {
        displayName: 'Use Credential Authorization',
        name: 'useCredential',
        type: 'boolean',
        default: true,
        displayOptions: {
            show: showOnlyForGetInfo,
        },
        description: 'Whether to use node credential Authorization header',
    },
];
