import type { INodeProperties } from 'n8n-workflow';
import { pageNo, pageSize } from '../../shared/descriptions';

const showOnlyForMarketTemplatePagePage = {
    operation: ['searchMarketTemplateForPage'],
    resource: ['schedule'],
};

export const searchMarketTemplateForPageDescription: INodeProperties[] = [
    {
        displayName: 'Search Key',
        name: 'searchKey',
        type: 'string',
        default: '',
        description: 'Template name (fuzzy search)',
        displayOptions: { show: showOnlyForMarketTemplatePagePage },
        routing: { send: { type: 'body', property: 'searchKey' } },
    },
    {
        ...pageNo,
        displayOptions: { show: showOnlyForMarketTemplatePagePage },
    },
    {
        ...pageSize,
        displayOptions: { show: showOnlyForMarketTemplatePagePage },
    },
];

export const searchMarketTemplateForPageResponse = {
    description: 'Response includes pagination fields and dataList',
};
