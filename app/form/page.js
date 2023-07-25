'use client'

import styles from './page.module.css'
export default function PageWithJSbasedForm() {

  const fetchData = async (event) => {
    event.preventDefault()
    const response = await fetch('/api/form')
    const data = await response.json();
    console.log(data);
  }

  // Handles the submit event on form submit.
  const saveData = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    // Get data from the form.
    const data = {
      action: event.target.action.value,
      role: event.target.role.value,
      message: event.target.message.value,
    }

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data)

    // API endpoint where we send form data.
    const endpoint = '/api/form'

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: 'POST',
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    }

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options)

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json()
    console.log(result)
  }

  return (
    // We pass the event to the handleSubmit() function on submit.

    <form onSubmit={saveData}>
      <label htmlFor="action">Action:</label>
      <select name="action" id="action">
        <option value="write">Write Message</option>
      </select>
      <br />
      <label htmlFor="role">Role:</label>
      <input type="text" id="role" name="role" required />
      <br />
      <label htmlFor="message">Message:</label>
      <textarea id="message" name="message" required />
      <br />
      <button type="submit">Send</button>
    </form>
  )
}

