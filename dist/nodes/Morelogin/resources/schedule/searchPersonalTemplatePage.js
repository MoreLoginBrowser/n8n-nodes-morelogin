"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchPersonalTemplateForPageResponse = exports.searchPersonalTemplateForPageDescription = void 0;
const descriptions_1 = require("../../shared/descriptions");
const showOnlyForRpaTemplatePersonalPage = {
    operation: ['searchPersonalTemplateForPage'],
    resource: ['schedule'],
};
exports.searchPersonalTemplateForPageDescription = [
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
        ...descriptions_1.pageNo,
        displayOptions: { show: showOnlyForRpaTemplatePersonalPage },
    },
    {
        ...descriptions_1.pageSize,
        displayOptions: { show: showOnlyForRpaTemplatePersonalPage },
    },
];
exports.searchPersonalTemplateForPageResponse = {
    description: 'Response includes pagination fields and dataList',
};
//# sourceMappingURL=searchPersonalTemplatePage.js.map