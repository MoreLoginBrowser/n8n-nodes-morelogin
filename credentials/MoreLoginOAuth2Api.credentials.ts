import { Icon, ICredentialType, INodeProperties } from 'n8n-workflow';

export class moreLoginOAuth2Api implements ICredentialType {
	name = 'moreLoginOAuth2Api';

	displayName = 'MoreLogin OAuth2 API';

	extends = ['oAuth2Api'];

	icon: Icon = { light: 'file:../icons/morelogin.svg', dark: 'file:../icons/morelogin.dark.svg' };
	
	documentationUrl = 'https://guide.morelogin.com/api-reference/open-api/open-api/authorization';

	properties: INodeProperties[] = [
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