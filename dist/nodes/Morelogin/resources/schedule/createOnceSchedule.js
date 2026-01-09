"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOnceScheduleResponse = exports.createOnceScheduleDescription = void 0;
const showOnlyForScheduleSave = {
    operation: ['createOnceSchedule'],
    resource: ['schedule'],
};
exports.createOnceScheduleDescription = [
    {
        displayName: 'CloudPhoneId',
        name: 'cloudPhoneId',
        type: 'number',
        description: 'Cloud Phone Id',
        default: 0,
        displayOptions: { show: showOnlyForScheduleSave },
        routing: { send: { type: 'body', property: 'cloudPhoneId' } },
    },
    {
        displayName: 'Schedule Name',
        name: 'scheduleName',
        type: 'string',
        default: '',
        description: 'Schedule name',
        displayOptions: { show: showOnlyForScheduleSave },
        routing: { send: { type: 'body', property: 'scheduleName' } },
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
        displayName: 'Template Parameter',
        name: 'templateParameter',
        type: 'string',
        default: '',
        description: 'Template parameters are defined in personal templates or market templates. The parameters in the template are defined as:{"Test":{"extra":{"type":"string","required":true,"multiline":{"enabled":false},"name":"Test","index":1},"type":"string"}} When requesting parameters, the parameter passed is:{"Test":"xxxx"}',
        displayOptions: { show: showOnlyForScheduleSave },
        routing: { send: { type: 'body', property: 'templateParameter' } },
    },
    {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        default: '',
        description: 'schedule description',
        displayOptions: { show: showOnlyForScheduleSave },
        routing: { send: { type: 'body', property: 'description' } },
    },
];
exports.createOnceScheduleResponse = {
    description: 'Response: { code, msg, requestId }',
};
//# sourceMappingURL=createOnceSchedule.js.map