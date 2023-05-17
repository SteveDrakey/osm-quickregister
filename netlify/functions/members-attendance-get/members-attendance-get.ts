import { Handler } from '@netlify/functions'
import fetch from 'node-fetch'

export const handler: Handler = async (event, context) => {
  const url = `https://www.onlinescoutmanager.co.uk/ext/members/attendance/?action=get&sectionid=35289&termid=626418&section=scouts&nototal=true`;
  const response = await fetch(url, {
    headers :{
      'Authorization': event.headers['authorization'] || '',
    }
  });
  const data = await response.json();
  console.log(data);
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  }
}
