import { Handler, HandlerContext, HandlerEvent } from '@netlify/functions'
import { Context } from '@netlify/functions/dist/function/context';
import { AuthorizationCode } from 'simple-oauth2';
import { URLSearchParams } from 'url';
import fetch from 'node-fetch';

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

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  try {

    if (event.httpMethod !== 'GET') {

      const code = event.body as string;

      const postData = new URLSearchParams({
        client_id: process.env['CLIENT_ID'] || '',
        client_secret: process.env['CLIENT_SECRET'] || '',
        refresh_token: code,
        grant_type: 'refresh_token'
      }).toString();

      const response = await fetch('https://www.onlinescoutmanager.co.uk/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': postData.length.toString()
        },
        body: postData
      });

      const data = await response.json();
      console.log(data);
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      }

    }

    // read code and scope from query string and store in variables 
    if (!event.queryStringParameters) {
        return { statusCode: 400, body: 'No query string parameters found' };
      }

      const { code } = event.queryStringParameters;

      if (!code) {
        return { statusCode: 400, body: 'No code found in query string parameters' };
      }

      const client = new AuthorizationCode(config);

      const tokenParams = {
        code,
        redirect_uri: siteUrl,
      };

      const result = await client.getToken(tokenParams);

      return {
        statusCode: 200,
        body: JSON.stringify(result),
      }
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        return {
          statusCode: 500,
          body: `Unexpected error: ${error.message}`,
        };
      }
      return {
        statusCode: 500,
        body: 'An unexpected error occurred',
      };
    }
  }