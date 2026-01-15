import type { INodeProperties } from 'n8n-workflow';

import { searchMarketTemplateForPageDescription } from './searchMarketTemplatePage';
import { searchPersonalTemplateForPageDescription } from './searchPersonalTemplatePage';
import { createScheduleDescription } from './createSchedule';
import { createOnceScheduleDescription } from './createOnceSchedule';

const showOnlyForSchedule = {
    resource: ['schedule'],
};

export const scheduleDescription: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: showOnlyForSchedule,
        },
        options: [
            {
                name: 'Schedule: Template Market Page',
                value: 'searchMarketTemplateForPage',
                action: 'List market templates',
                routing: {
                    request: {
                        method: 'POST',
                        url: '=/cloudphone/rpa/template/market/page',
                    },
                },
            },
            {
                name: 'Schedule: Template Personal Page',
                value: 'searchPersonalTemplateForPage',
                action: 'List personal templates',
                routing: {
                    request: {
                        method: 'POST',
                        url: '=/cloudphone/rpa/template/personal/page',
                    },
                },
            },
            {
                name: 'Schedule Recurring Mobile Task',
                value: 'createSchedule',
                action: 'Create a schedule',
                routing: {
                    request: {
                        method: 'POST',
                        url: '=/cloudphone/rpa/task/save',
                    },
                },
            },
            {
                name: 'Start Cloud Phone Task',
                value: 'createOnceSchedule',
                action: 'Create a once schedule',
                routing: {
                    request: {
                        method: 'POST',
                        url: '=/cloudphone/rpa/onceTask/save',
                    },
                },
            },
        ],
        default: 'createOnceSchedule',
    },
    ...searchMarketTemplateForPageDescription,
    ...searchPersonalTemplateForPageDescription,
    ...createScheduleDescription,
    ...createOnceScheduleDescription,
];
