const fs = require('fs');
const {google} = require('googleapis');

async function getAuth () {
 const credentials = JSON.parse(await fs.readFileSync('credentials.json')); 
 const {client_secret, client_id, redirect_uris} = credentials.installed;

 const oAuth2Client = new google.auth.OAuth2(
  client_id, client_secret, redirect_uris[0]);

 const token = JSON.parse(await fs.readFileSync('token.json'));
  
 oAuth2Client.setCredentials(token);

 return oAuth2Client;
}

module.exports = getAuth;
