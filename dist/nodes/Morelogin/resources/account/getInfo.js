"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountGetInfoDescription = void 0;
const showOnlyForGetInfo = {
    operation: ['getInfo'],
    resource: ['account'],
};
exports.accountGetInfoDescription = [
    {
        displayName: 'Use Credential Authorization',
        name: 'useCredential',
        type: 'boolean',
        default: true,
        displayOptions: {
            show: showOnlyForGetInfo,
        },
        description: 'When true, uses node credential Authorization header',
    },
];
//# sourceMappingURL=getInfo.js.map