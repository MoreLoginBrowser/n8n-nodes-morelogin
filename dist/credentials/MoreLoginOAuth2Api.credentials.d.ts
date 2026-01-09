import { Icon, ICredentialType, INodeProperties } from 'n8n-workflow';
export declare class moreLoginOAuth2Api implements ICredentialType {
    name: string;
    displayName: string;
    extends: string[];
    icon: Icon;
    documentationUrl: string;
    properties: INodeProperties[];
}
