const crypto = require('crypto');
const express = require('express');
const app = express();
const port = 3000;

// Shared secret key (should match the client's secret key)
const secretKey = 'your_secret_key';

app.use(express.json());

app.post('/api/resource', (req, res) => {
  const receivedHMAC = req.headers['authorization'];
  const receivedData = JSON.stringify(req.body); // Assuming the request data is in the request body

  // Calculate the expected HMAC
  const expectedHMAC = crypto
    .createHmac('sha256', secretKey)
    .update(receivedData)
    .digest('base64');

  if (receivedHMAC === `HMAC-SHA256 ${expectedHMAC}`) {
    res.status(200).json({ message: 'Request is valid. Processing...' });
  } else {
    res.status(401).json({ message: 'Request is not valid. Rejecting...' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
