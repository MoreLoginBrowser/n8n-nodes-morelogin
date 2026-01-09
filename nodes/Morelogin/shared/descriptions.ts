import type { INodeProperties } from 'n8n-workflow';

export const cloudphoneId: INodeProperties = {
    displayName: 'Cloudphone ID',
    name: 'id',
    type: 'string',
    default: '',
    required: true,
    description: 'Cloud phone ID',
    routing: {
        send: {
            type: 'body',
            property: 'id',
        },
    },
};

export const pageNo: INodeProperties = {
    displayName: 'Page Number',
    name: 'pageNo',
    type: 'number',
    default: 1,
    description: 'Page number for paginated requests',
    routing: {
        send: {
            type: 'body',
            property: 'pageNo',
        },
    },
};

export const pageSize: INodeProperties = {
    displayName: 'Page Size',
    name: 'pageSize',
    type: 'number',
    default: 10,
    description: 'Page size for paginated requests',
    routing: {
        send: {
            type: 'body',
            property: 'pageSize',
        },
    },
};
