"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Morelogin = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const index_1 = require("./resources/schedule/index");
const allScheduleParams = [
    ...index_1.scheduleDescription,
];
class Morelogin {
    constructor() {
        this.description = {
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
            inputs: [n8n_workflow_1.NodeConnectionTypes.Main],
            outputs: [n8n_workflow_1.NodeConnectionTypes.Main],
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
                ...index_1.scheduleDescription,
            ],
        };
    }
    async execute() {
        var _a;
        const credentials = await this.getCredentials('moreLoginOAuth2Api');
        const clientId = credentials.clientId;
        const clientSecret = credentials.clientSecret;
        const nodeStaticData = this.getWorkflowStaticData('node');
        let accessToken;
        let tokenExpiry;
        if (nodeStaticData.accessToken && nodeStaticData.expiresAt) {
            accessToken = nodeStaticData.accessToken;
            tokenExpiry = nodeStaticData.expiresAt;
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
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), tokenResponse, {
                        message: tokenResponse.msg || 'Failed to get access token',
                    });
                }
                accessToken = tokenResponse.data.access_token;
                nodeStaticData.accessToken = accessToken;
                nodeStaticData.expiresAt = now + (tokenResponse.data.expires_in - 300) * 1000;
            }
            catch (error) {
                throw new n8n_workflow_1.NodeApiError(this.getNode(), error, {
                    message: 'Error fetching access token from MoreLogin',
                });
            }
        }
        const items = this.getInputData();
        const returnData = [];
        console.log('request items:', items);
        for (let i = 0; i < items.length; i++) {
            const body = {};
            let endpoint = '';
            try {
                let method = 'POST';
                const resource = this.getNodeParameter('resource', i);
                const operation = this.getNodeParameter('operation', i);
                const allParams = this.getNodeParameter('', i, {});
                console.log('request allParams:', allParams);
                const relevantParams = allScheduleParams.filter(param => {
                    var _a;
                    const show = (_a = param.displayOptions) === null || _a === void 0 ? void 0 : _a.show;
                    if (!show)
                        return false;
                    const matchesResource = !show.resource || (Array.isArray(show.resource) ? show.resource.includes(resource) : show.resource === resource);
                    const matchesOperation = !show.operation || (Array.isArray(show.operation) ? show.operation.includes(operation) : show.operation === operation);
                    return matchesResource && matchesOperation;
                });
                const body = {};
                for (const param of relevantParams) {
                    if (!((_a = param.routing) === null || _a === void 0 ? void 0 : _a.send) || param.routing.send.type !== 'body')
                        continue;
                    let value = this.getNodeParameter(param.name, i);
                    if (value == null)
                        continue;
                    if (param.name === 'sort') {
                        const sort = value;
                        if (sort.sortItem) {
                            value = sort.sortItem
                                .map(item => ({
                                sortDirection: item.sortDirection,
                                sortField: item.sortField,
                            }));
                        }
                        else {
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
                    }
                    else {
                        throw new Error(`Unsupported account operation: ${operation}`);
                    }
                }
                else if (resource === 'schedule') {
                    const opMap = {
                        searchMarketTemplateForPage: '/cloudphone/rpa/template/market/page',
                        searchPersonalTemplateForPage: '/cloudphone/rpa/template/personal/page',
                        createSchedule: '/cloudphone/rpa/task/save',
                        createOnceSchedule: '/cloudphone/rpa/onceTask/save',
                    };
                    endpoint = opMap[operation];
                    if (!endpoint) {
                        throw new Error(`Unsupported cloudphone operation: ${operation}`);
                    }
                }
                else {
                    throw new Error(`Unsupported resource: ${resource}`);
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
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), response, {
                        message: response.msg || 'API request failed',
                    });
                }
                returnData.push({ json: response.data || response });
            }
            catch (error) {
                console.log('Parameter collection warning:', error.message);
                throw new n8n_workflow_1.NodeApiError(this.getNode(), {}, {
                    message: `Info: ${endpoint} ${body}`,
                    description: JSON.stringify(body)
                });
            }
        }
        return [returnData];
    }
}
exports.Morelogin = Morelogin;
//# sourceMappingURL=Morelogin.node.js.map