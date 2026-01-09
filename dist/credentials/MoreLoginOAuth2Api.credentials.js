"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moreLoginOAuth2Api = void 0;
class moreLoginOAuth2Api {
    constructor() {
        this.name = 'moreLoginOAuth2Api';
        this.displayName = 'MoreLogin OAuth2 API';
        this.extends = ['oAuth2Api'];
        this.icon = { light: 'file:../icons/morelogin.svg', dark: 'file:../icons/morelogin.dark.svg' };
        this.documentationUrl = 'https://guide.morelogin.com/api-reference/open-api/open-api/authorization';
        this.properties = [
            {
                displayName: 'Grant Type',
                name: 'grantType',
                type: 'hidden',
                default: 'clientCredentials',
            },
            {
                displayName: 'API ID',
                name: 'clientId',
                type: 'string',
                default: '',
                required: true,
            },
            {
                displayName: 'API Key',
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
exports.moreLoginOAuth2Api = moreLoginOAuth2Api;
//# sourceMappingURL=moreLoginOAuth2Api.credentials.js.map