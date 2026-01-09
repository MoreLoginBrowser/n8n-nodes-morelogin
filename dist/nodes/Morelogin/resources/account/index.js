"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountDescription = void 0;
const getToken_1 = require("./getToken");
const getInfo_1 = require("./getInfo");
const showOnlyForAccount = {
    resource: ['account'],
};
exports.accountDescription = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: showOnlyForAccount,
        },
        options: [
            {
                name: 'Get Token',
                value: 'getToken',
                action: 'Get an access token',
                description: 'Exchange client ID and secret for an access token',
                routing: {
                    request: {
                        method: 'POST',
                        url: '=/oauth2/token',
                    },
                },
            },
            {
                name: 'Get User Info',
                value: 'getInfo',
                action: 'Get user information',
                description: 'Return user info using a bearer token',
                routing: {
                    request: {
                        method: 'GET',
                        url: '=/oauth2/userinfo',
                    },
                },
            },
        ],
        default: 'getToken',
    },
    ...getToken_1.accountGetTokenDescription,
    ...getInfo_1.accountGetInfoDescription,
];
//# sourceMappingURL=index.js.map