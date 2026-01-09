import type { INodeProperties } from 'n8n-workflow';
import { pageNo, pageSize } from '../../shared/descriptions';

const showOnlyForRpaTemplatePersonalPage = {
    operation: ['searchPersonalTemplateForPage'],
    resource: ['schedule'],
};

export const searchPersonalTemplateForPageDescription: INodeProperties[] = [
    {
        displayName: 'Search Key',
        name: 'searchKey',
        type: 'string',
        default: '',
        description: 'Template name (fuzzy search)',
        displayOptions: { show: showOnlyForRpaTemplatePersonalPage },
        routing: { send: { type: 'body', property: 'searchKey' } },
    },
    {
        displayName: 'Description',
        name: 'desc',
        type: 'string',
        default: '',
        description: 'Template description',
        displayOptions: { show: showOnlyForRpaTemplatePersonalPage },
        routing: { send: { type: 'body', property: 'desc' } },
    },
    {
        ...pageNo,
        displayOptions: { show: showOnlyForRpaTemplatePersonalPage },
    },
    {
        ...pageSize,
        displayOptions: { show: showOnlyForRpaTemplatePersonalPage },
    },
];

export const searchPersonalTemplateForPageResponse = {
    description: 'Response includes pagination fields and dataList',
};
