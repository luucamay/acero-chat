import fsPromises from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'json/userData.json');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Read the existing data from the JSON file
    const jsonData = await fsPromises.readFile(dataFilePath);
    const objectData = JSON.parse(jsonData);

    res.status(200).json(objectData);
  }
  else if (req.method === 'POST') {
    try {
      // Read the existing data from the JSON file
      const jsonData = await fsPromises.readFile(dataFilePath);
      const objectData = JSON.parse(jsonData);

      // Get data submitted in request's body.
      const body = req.body

      // Optional logging to see the responses
      // in the command line where next.js app is running.
      console.log('body: ', body)

      // Guard clause checks for first and last name,
      // and returns early if they are not found
      if (!body.role || !body.message || !body.action) {
        // Sends a HTTP bad request error code
        return res.status(400).json({ data: 'Role, message or action not found' })
      }

      // Get the data from the request body
      const { action, role, message } = req.body;
      // Add the new data to the object
      const newData = {
        action,
        role,
        message
      };
      objectData.push(newData);

      // Convert the object back to a JSON string
      const updatedData = JSON.stringify(objectData);
      // Write the updated data to the JSON file
      await fsPromises.writeFile(dataFilePath, updatedData);

      // Send a success response
      res.status(200).json({ message: 'Data stored successfully', objectData });

    } catch (error) {
      console.error(error);
      // Send an error response
      res.status(500).json({ message: 'Error storing data' });
    }


  }
}

