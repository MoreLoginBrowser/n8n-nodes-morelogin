import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class MoreLoginOAuth2Api implements ICredentialType {
	name = 'moreLoginOAuth2Api';
	displayName = 'MoreLogin OAuth2 API';
	// 继承 n8n 的内置 OAuth2 逻辑，它会自动处理 expires_in 逻辑
	extends = ['oAuth2Api'];
	documentationUrl = 'https://guide.morelogin.com/api-reference/open-api/open-api/authorization';

	properties: INodeProperties[] = [
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