"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoreLoginOAuth2Api = void 0;
class MoreLoginOAuth2Api {
    constructor() {
        this.name = 'moreLoginOAuth2Api';
        this.displayName = 'MoreLogin OAuth2 API';
        this.extends = ['oAuth2Api'];
        this.documentationUrl = 'https://guide.morelogin.com/api-reference/open-api/open-api/authorization';
        this.properties = [
            {
                displayName: 'Grant Type',
                name: 'grantType',
                type: 'hidden',
                default: 'clientCredentials',
            },
            {
                displayName: 'Client ID',
                name: 'clientId',
                type: 'string',
                default: '',
                required: true,
            },
            {
                displayName: 'Client Secret',
                name: 'clientSecret',
                type: 'string',
                typeOptions: { password: true },
                default: '',
                required: true,
            },
            {
                displayName: 'Base URL',
                name: 'baseUrl',
                type: 'string',
                default: 'https://api.morelogin.com',
            },
        ];
    }
}
exports.MoreLoginOAuth2Api = MoreLoginOAuth2Api;
//# sourceMappingURL=MoreLoginOAuth2Api.credentials.js.map