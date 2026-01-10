import type { INodeProperties } from 'n8n-workflow';

const showOnlyForScheduleSave = {
    operation: ['createSchedule'],
    resource: ['schedule'],
};

export const createScheduleDescription: INodeProperties[] = [
    {
        displayName: 'Task Name',
        name: 'taskName',
        type: 'string',
        default: '',
        displayOptions: { show: showOnlyForScheduleSave },
        routing: { send: { type: 'body', property: 'taskName' } },
    },
    {
        displayName: 'Template ID',
        name: 'templateId',
        type: 'number',
        default: 0,
        displayOptions: { show: showOnlyForScheduleSave },
        routing: { send: { type: 'body', property: 'templateId' } },
    },
    {
        displayName: 'Template Type',
        name: 'templateType',
        type: 'options',
        options: [
            { name: 'PERSONAL', value: 'PERSONAL' },
            { name: 'MARKET', value: 'MARKET' },
        ],
        default: 'PERSONAL',
        displayOptions: { show: showOnlyForScheduleSave },
        routing: { send: { type: 'body', property: 'templateType' } },
    },
    {
        displayName: 'Task Type',
        name: 'taskType',
        type: 'options',
        options: [
            { name: 'TEMPORARY', value: 'TEMPORARY' },
            { name: 'SCHEDULED', value: 'SCHEDULED' },
        ],
        default: 'TEMPORARY',
        displayOptions: { show: showOnlyForScheduleSave },
        routing: { send: { type: 'body', property: 'taskType' } },
    },
    {
        displayName: 'Description',
        name: 'notes',
        type: 'string',
        default: '',
        description: 'Schedule description',
        displayOptions: { show: showOnlyForScheduleSave },
        routing: { send: { type: 'body', property: 'notes' } },
    },
    {
        displayName: 'Cloud Phone Configs',
        name: 'cloudPhoneConfigs',
        type: 'fixedCollection',
        typeOptions: { multipleValues: true },
        placeholder: 'Add Cloud Phone',
        default: {},
        displayOptions: { show: showOnlyForScheduleSave },
        options: [
            {
            displayName: 'Config Item',
            name: 'configItem',
            values: [
                { displayName: 'CloudPhoneId', name: 'cloudPhoneId', type: 'number', default: 0 },
                { displayName: 'Template Parameter', name: 'templateParameter', type: 'string', default: '' },
                { displayName: 'Trigger Time', name: 'triggerTime', type: 'dateTime', default: '', description: 'The time to trigger something' },
            ],
            },
        ],
        routing: {
            send: {
            type: 'body',
            property: 'cloudPhoneConfigs',
            value: '={{ $value.configItem.map(i => ({ cloudPhoneId: i.cloudPhoneId, templateParameter: i.templateParameter, triggerTime: i.triggerTime })) }}',
            },
        },
        },
    {
        displayName: 'Schedule Config',
        name: 'scheduleConfig',
        type: 'fixedCollection',
        typeOptions: { multipleValues: false },
        placeholder: 'Add Schedule Config',
        default: {},
        displayOptions: { show: showOnlyForScheduleSave },
        options: [
            {
                displayName: 'Schedule',
                name: 'schedule',
                values: [
                    { displayName: 'End Time', name: 'endTime', type: 'dateTime', default: '', description: 'End time of the schedule' },
                    {
                        displayName: 'Schedule Type',
                        name: 'ScheduleType',
                        type: 'options',
                        options: [
                            { name: 'ONCE', value: 'ONCE' },
                            { name: 'DAILY', value: 'DAILY' },
                        ],
                        default: 'ONCE',
                    },
                ],
            },
        ],
        routing: {
            send: {
                type: 'body',
                property: 'scheduleConfig',
                value: '={{ { endTime: $value.schedule.endTime, ScheduleType: $value.schedule.ScheduleType } }}',
            },
        },
    },
];

export const createScheduleResponse = {
    description: 'Response: { code, msg, requestId }',
};
