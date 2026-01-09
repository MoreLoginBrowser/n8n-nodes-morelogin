"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moreloginApiRequest = moreloginApiRequest;
async function moreloginApiRequest(method, resource, qs = {}, body = undefined) {
    const options = {
        method: method,
        qs,
        body,
        url: `https://api.morelogin.com${resource}`,
        json: true,
    };
    return this.helpers.httpRequestWithAuthentication.call(this, 'moreLoginOAuth2Api', options);
}
//# sourceMappingURL=transport.js.map