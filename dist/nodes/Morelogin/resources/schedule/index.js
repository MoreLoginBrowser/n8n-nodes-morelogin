"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleDescription = void 0;
const searchMarketTemplatePage_1 = require("./searchMarketTemplatePage");
const searchPersonalTemplatePage_1 = require("./searchPersonalTemplatePage");
const createSchedule_1 = require("./createSchedule");
const createOnceSchedule_1 = require("./createOnceSchedule");
const showOnlyForCloudphone = {
    resource: ['schedule'],
};
exports.scheduleDescription = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: showOnlyForCloudphone,
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
                name: 'Create a Schedule',
                value: 'createSchedule',
                action: 'Create a Schedule',
                routing: {
                    request: {
                        method: 'POST',
                        url: '=/cloudphone/rpa/task/save',
                    },
                },
            },
            {
                name: 'Create a Once Schedule',
                value: 'createOnceSchedule',
                action: 'Create a Once Schedule',
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
    ...searchMarketTemplatePage_1.searchMarketTemplateForPageDescription,
    ...searchPersonalTemplatePage_1.searchPersonalTemplateForPageDescription,
    ...createSchedule_1.createScheduleDescription,
    ...createOnceSchedule_1.createOnceScheduleDescription,
];
//# sourceMappingURL=index.js.map