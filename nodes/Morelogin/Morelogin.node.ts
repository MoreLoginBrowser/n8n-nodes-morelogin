import {
	NodeConnectionTypes,
	type IExecuteFunctions,
	type INodeType,
	type INodeTypeDescription,
	type INodeExecutionData,
	NodeApiError,
    JsonObject,
    INodeProperties,
} from 'n8n-workflow';
// import { accountDescription } from './resources/account/index';
import { scheduleDescription } from './resources/schedule/index';

const allScheduleParams: INodeProperties[] = [
    // ...accountDescription,
    ...scheduleDescription,
];

export class Morelogin implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Morelogin',
        name: 'morelogin',
        icon: { light: 'file:../../icons/morelogin.svg', dark: 'file:../../icons/morelogin.dark.svg' },
        group: ['input'],
        version: 1,
        subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
        description: 'Interact with the Morelogin API',
        defaults: {
            name: 'Morelogin',
        },
        usableAsTool: true,
        inputs: [NodeConnectionTypes.Main],
        outputs: [NodeConnectionTypes.Main],
        /* Credentials are optional — token can be fetched via the token operation */
        credentials: [
            {
                name: 'moreLoginOAuth2Api',
            },
        ],
        requestDefaults: {
            baseURL: 'https://api.morelogin.com',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        },
        properties: [
            {
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                noDataExpression: true,
                options: [
                    {
                        name: 'Account',
                        value: 'account',
                    },
                    {
                        name: 'Schedule',
                        value: 'schedule',
                    },
                ],
                default: 'account',
            },
            // ...accountDescription,
            ...scheduleDescription,
        ],
    };

    
    
    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        
        const credentials = await this.getCredentials('moreLoginOAuth2Api');
        const clientId = credentials.clientId as string;
        const clientSecret = credentials.clientSecret as string;


        const nodeStaticData = this.getWorkflowStaticData('node');

        let accessToken: string | undefined;
        let tokenExpiry: number | undefined;
        if (nodeStaticData.accessToken && nodeStaticData.expiresAt) {
            accessToken = nodeStaticData.accessToken as string | undefined;
            tokenExpiry = nodeStaticData.expiresAt as number | undefined;
        }

        const now = Date.now();

        if (!accessToken || !tokenExpiry || now >= tokenExpiry) {
            try {
                const tokenResponse = await this.helpers.httpRequest({
                    method: 'POST',
                    url: 'https://api.morelogin.com/oauth2/token',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        client_id: clientId,
                        client_secret: clientSecret,
                        grant_type: 'client_credentials',
                    }),
                });

                if (tokenResponse.code !== 0) {
                    throw new NodeApiError(this.getNode(), tokenResponse, {
                        message: tokenResponse.msg || 'Failed to get access token',
                    });
                }
                accessToken = tokenResponse.data.access_token;

                nodeStaticData.accessToken = accessToken;
                nodeStaticData.expiresAt = now + (tokenResponse.data.expires_in - 300) * 1000;
            } catch (error) {
                throw new NodeApiError(this.getNode(), error as JsonObject, {
                    message: 'Error fetching access token from MoreLogin',
                });
            }
        }
        
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];

        for (let i = 0; i < items.length; i++) {

            const body: Record<string, unknown> = {}; 
            let endpoint = '';
            try {
                
                let method: 'GET' | 'POST' = 'POST';
                
                const resource = this.getNodeParameter('resource', i) as string;
                const operation = this.getNodeParameter('operation', i) as string;

                const relevantParams = allScheduleParams.filter(param => {
                    const show = param.displayOptions?.show;
                    if (!show) return false;

                    const matchesResource = !show.resource || (Array.isArray(show.resource) ? show.resource.includes(resource) : show.resource === resource);
                    const matchesOperation = !show.operation || (Array.isArray(show.operation) ? show.operation.includes(operation) : show.operation === operation);

                    return matchesResource && matchesOperation;
                });

                const body: Record<string, unknown> = {};

                for (const param of relevantParams) {
                    if (!param.routing?.send || param.routing.send.type !== 'body') continue;

                    let value = this.getNodeParameter(param.name, i);
                    if (value == null) continue;

                    if (param.name === 'sort') {
                        const sort = value as { sortItem?: Array<{ sortDirection: string; sortField: string }> };
                        if (sort.sortItem) {
                            value = (sort.sortItem as Array<{ sortDirection: string; sortField: string }>)
                                .map(item => ({
                                    sortDirection: item.sortDirection,
                                    sortField: item.sortField,
                                }));
                        } else {
                            continue;
                        }
                    }

                    const key = param.routing.send.property || param.name;
                    body[key] = value;
                }

                if (resource === 'account') {
                    if (operation === 'getInfo') {
                        method = 'GET';
                        endpoint = '/oauth2/userinfo';
                    } else {
                        throw new NodeApiError(this.getNode(), {}, {
                            message: `Unsupported account operation: ${operation}`,
                        });
                    }
                } else if (resource === 'schedule') {
                    // mapping endpoint
                    const opMap: Record<string, string> = {

                        searchMarketTemplateForPage: '/cloudphone/rpa/template/market/page',

                        searchPersonalTemplateForPage: '/cloudphone/rpa/template/personal/page',

                        createSchedule: '/cloudphone/rpa/task/save',

                        createOnceSchedule: '/cloudphone/rpa/onceTask/save',

                    };

                    endpoint = opMap[operation];
                    if (!endpoint) {
                        throw new NodeApiError(this.getNode(), {}, {
                            message: `Unsupported schedule operation: ${operation}`,
                        });
                    }
                } else {
                    throw new NodeApiError(this.getNode(), {}, {
                            message: `Unsupported resource: ${resource}`,
                        });
                }
                
                const response = await this.helpers.httpRequest({
                    method,
                    url: `https://api.morelogin.com${endpoint}`,
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: method === 'POST' && Object.keys(body).length > 0 ? body : undefined,
                    json: true,
                });

                if (response.code !== 0) {
                    throw new NodeApiError(this.getNode(), response, {
                        message: response.msg || 'API request failed',
                    });
                }

                returnData.push({ json: response.data || response });

            } catch (error) {
                throw new NodeApiError(this.getNode(), {}, { 
                    message: `Info: ${endpoint} ${error.message}`, 
                    description: JSON.stringify(body) 
                });
            }
        }

        return [returnData];

    }
}
