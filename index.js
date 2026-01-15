module.exports = {
	nodes: [require('./dist/nodes/MoreLogin/MoreLogin.node.js').MoreLogin],
	credentials: [require('./dist/credentials/MoreLoginOAuth2Api.credentials.js').MoreLoginOAuth2Api],
};
