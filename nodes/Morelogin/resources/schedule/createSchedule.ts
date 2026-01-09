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
        description: 'Task name',
        displayOptions: { show: showOnlyForScheduleSave },
        routing: { send: { type: 'body', property: 'taskName' } },
    },
    {
        displayName: 'Template ID',
        name: 'templateId',
        type: 'number',
        default: 0,
        description: 'Template ID',
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
        displayName: 'Notes',
        name: 'notes',
        type: 'string',
        default: '',
        description: 'Plan notes',
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
                    { displayName: 'Trigger Time', name: 'triggerTime', type: 'string', default: '' },
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
                    { displayName: 'End Time', name: 'endTime', type: 'string', default: '' },
                    { displayName: 'Schedule Type', name: 'scheduleType', type: 'string', default: '' },
                ],
            },
        ],
        routing: {
            send: {
                type: 'body',
                property: 'scheduleConfig',
                value: '={{ $value.schedule }}',
            },
        },
    },
];

export const createScheduleResponse = {
    description: 'Response: { code, msg, requestId }',
};
