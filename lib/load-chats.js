import fs from 'fs';
import path from 'path';

const chatsDirectory = path.join(process.cwd(), 'json');

export function getMessagesData() {
  const dataFilePath = path.join(chatsDirectory, 'userData.json');
  console.log(dataFilePath)
  // Read the existing data from the JSON file
  const jsonData = fs.readFileSync(dataFilePath, 'utf-8');
  const objectData = JSON.parse(jsonData);
  return objectData;
}
