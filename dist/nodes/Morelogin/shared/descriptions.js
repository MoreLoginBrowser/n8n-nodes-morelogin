"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageSize = exports.pageNo = exports.cloudphoneId = void 0;
exports.cloudphoneId = {
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
exports.pageNo = {
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
exports.pageSize = {
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
//# sourceMappingURL=descriptions.js.map