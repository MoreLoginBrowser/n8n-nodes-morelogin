import type {
    IHookFunctions,
    IExecuteFunctions,
    IExecuteSingleFunctions,
    ILoadOptionsFunctions,
    IHttpRequestMethods,
    IDataObject,
    IHttpRequestOptions,
} from 'n8n-workflow';

export async function moreloginApiRequest(
    this: IHookFunctions | IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions,
    method: IHttpRequestMethods,
    resource: string,
    qs: IDataObject = {},
    body: IDataObject | undefined = undefined,
) {
    const options: IHttpRequestOptions = {
        method: method,
        qs,
        body,
        url: `https://api.morelogin.com${resource}`,
        json: true,
    };

    return this.helpers.httpRequestWithAuthentication.call(this, 'moreLoginOAuth2Api', options);
}
