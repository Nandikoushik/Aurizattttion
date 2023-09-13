import axios from 'axios';
import crypto from 'crypto';

const secretKey = 'your_secret_key';
const apiEndpoint = 'http://localhost:3000/api/resource'; // Replace with your server's endpoint

// Create a function to make a signed request
const makeSignedRequest = async (data) => {
  // Calculate the HMAC
  const hmac = crypto
    .createHmac('sha256', secretKey)
    .update(JSON.stringify(data))
    .digest('base64');

  // Include the HMAC in the request headers
  const headers = {
    Authorization: `HMAC-SHA256 ${hmac}`,
  };

  try {
    // Make the HTTP request with Axios
    const response = await axios.post(apiEndpoint, data, { headers });
    console.log(response.data);
  } catch (error) {
    console.error(error.response.data);
  }
};

// Example data to send
const requestData = { key: 'value' };

// Call the function to make the signed request
makeSignedRequest(requestData);
