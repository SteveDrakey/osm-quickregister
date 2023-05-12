import { Handler } from '@netlify/functions';
import axios from 'axios';
import { AuthorizationCode } from 'simple-oauth2';

const client = new AuthorizationCode({
  client: {
    id: process.env['clientId'],
    secret: process.env['clientSecret'],
  },
  auth: {
    tokenHost: 'https://your-token-host',
    tokenPath: 'your-token-path',
    authorizePath: 'your-authorize-path',
  },
  options: {
    authorizationMethod: 'body',
  },
});

export const handler: Handler = async (event, context) => {
  const { queryStringParameters } = event;

  if (!queryStringParameters) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Bad Request' }),
    };
  }

  const { code } = queryStringParameters;

  if (!code) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Bad Request' }),
    };
  }

  try {
    const tokenParams = {
      code,
      redirect_uri: 'your-redirect-uri',
    };

    const accessToken = await client.getToken(tokenParams);

    const user = await axios({
      method: 'get',
      url: 'https://your-api-url',
      headers: { Authorization: `Bearer ${accessToken.token.access_token}` },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ user: user.data }),
    };
  } catch (error: any) {
    console.error('Access Token Error', error['message']);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};