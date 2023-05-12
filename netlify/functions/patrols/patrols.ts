import { Handler } from '@netlify/functions'
import fetch from 'node-fetch'

export const handler: Handler = async (event, context) => {
  const url = `https://www.onlinescoutmanager.co.uk/ext/members/patrols/?action=getPatrolsWithPeople&sectionid=35289&termid=626418&include_no_patrol=y`;
  const response = await fetch(url, {
    headers :{
      'authorization': event.headers['authorization'] || '',
    }
  });
  const data = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  }
}
