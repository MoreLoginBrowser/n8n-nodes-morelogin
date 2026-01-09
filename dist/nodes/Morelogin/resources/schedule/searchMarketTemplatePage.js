"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchMarketTemplateForPageResponse = exports.searchMarketTemplateForPageDescription = void 0;
const descriptions_1 = require("../../shared/descriptions");
const showOnlyForMarketTemplatePagePage = {
    operation: ['searchMarketTemplateForPage'],
    resource: ['schedule'],
};
exports.searchMarketTemplateForPageDescription = [
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
        ...descriptions_1.pageNo,
        displayOptions: { show: showOnlyForMarketTemplatePagePage },
    },
    {
        ...descriptions_1.pageSize,
        displayOptions: { show: showOnlyForMarketTemplatePagePage },
    },
];
exports.searchMarketTemplateForPageResponse = {
    description: 'Response includes pagination fields and dataList',
};
//# sourceMappingURL=searchMarketTemplatePage.js.map