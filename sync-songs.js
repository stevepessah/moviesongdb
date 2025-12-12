const fs = require('fs');
const { google } = require('googleapis');

// Load client secrets
const credentials = require('./credentials.json');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const spreadsheetId = '1pbnpkJvlFydQZKty2zGj2D_qogT6zOVdUKC7ZBHRI-w'; // Your sheet ID
const sheetName = 'Rock Anthems'; // Adjust if the sheet/tab name changes

async function authorizeAndFetch() {
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const range = `${sheetName}!A2:E`; // Adjust based on structure (skip headers)

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const rows = response.data.values;

  if (!rows || rows.length === 0) {
    console.log('No data found.');
    return;
  }

  // Convert rows to JSON
const grouped = {};

for (const [title, artist, movie, scene, timestamp] of rows) {
  if (!title || !artist) continue;

  const key = `${title}|||${artist}`;

  if (!grouped[key]) {
    grouped[key] = {
      title,
      artist,
      movies: [],
    };
  }

  grouped[key].movies.push({
    name: movie || '',
    scene: scene || '',
    timestamp: timestamp || '',
  });
}

const songs = Object.values(grouped);


  // Write to songs.json
  fs.writeFileSync('./data/songs.json', JSON.stringify(songs, null, 2));
  console.log(`✅ Wrote ${songs.length} songs to data/songs.json`);
}

authorizeAndFetch().catch(console.error);
