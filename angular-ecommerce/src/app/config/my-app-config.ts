export default {
/*
    Security by https://developer.okta.com/
    User Information: dev-52538997.okta.com
    Client ID(for Proof Key for Code Exchange PKCE): 0oa8oa3c5edo1hrSl5d7
*/
    oidc: {
        clientId: '0oa8oa3c5edo1hrSl5d7',
        issuer: 'https://dev-52538997.okta.com/oauth2/default',
        redirectUri: 'http://localhost:4200/login/callback',
        scopes: ['openid', 'profile', 'email']
    }

    /*
    * Install Okta SDK dependencies
    * $npm install @okta/okta-signin-widget@6.2.0
    * $npm install @okta/okta-angular@5.2.0
    * $npm install @okta/okta-auth-js@6.4.0
    * */

}
