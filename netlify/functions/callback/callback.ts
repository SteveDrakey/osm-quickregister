import { Handler } from '@netlify/functions'
import { AuthorizationCode } from 'simple-oauth2';

const siteUrl = process.env['URL'] || 'http://localhost:3000'

const config = {
  client: {
    id: process.env['CLIENT_ID'] || '',
    secret: process.env['CLIENT_SECRET'] || ''
  },
  auth: {
    tokenHost: 'https://www.onlinescoutmanager.co.uk', // oauth/token'
    authorizePath: '/oauth/authorize',
    tokenPath: '/oauth/token'
  }
};

export const handler: Handler = async (event, context) => {
  // read code and scope from query string and store in variables 
  if (!event.queryStringParameters) return { statusCode: 400, body: 'No query string parameters found' };
  
  const code  = event.queryStringParameters['code'] as string;
  
  const client = new AuthorizationCode(config);

  const tokenParams = {
    code: code,
    redirect_uri: `${siteUrl}`,
  };

  const result = await client.getToken(tokenParams);

  console.log('result', result);

  return  {
    statusCode: 200,
    body: JSON.stringify(result),
  }
}
