import { Handler } from '@netlify/functions'
import fetch from 'node-fetch'

export const handler: Handler = async (event, context) => {

  const url = `https://www.onlinescoutmanager.co.uk/ext/members/attendance/?action=update&sectionid=35289&termid=626418`;

  if (event.body == null) {
    return {
      statusCode: 400,
      body: "No body supplied",
    }
  }

  const json = JSON.parse(event.body);

  const completedBadges = "[]";
  const customData = "[]";

  const params = new URLSearchParams();
  params.append('scouts', `[${json.scoutid}]`); // Array of scout ids
  params.append('selectedDate', json.meetingDate);
  params.append('present', 'Yes');
  params.append('section', 'scouts');
  params.append('sectionid', '35289');
  params.append('completedBadges', completedBadges);
  params.append('customData', customData);


  const response = await fetch("https://www.onlinescoutmanager.co.uk/ext/members/attendance/?action=update&sectionid=35289&termid=626418", {
    method: "POST",
    headers: {
      'Authorization': event.headers['authorization'] || '',
    },
    body: params,
  });

  console.log('params', params);
  const data = await response.json();
  console.log('result', data);
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  }
}
