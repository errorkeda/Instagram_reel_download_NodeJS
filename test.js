const express = require("express");
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const instagramDl = require("./index");

app.use(cors());
dotenv.config();
app.use(express.json());  // This middleware is used to parse JSON request bodies

const port = process.env.PORT || 4000;

// Define a POST route to handle Instagram download requests
app.post('/instagram-download-url', async (req, res) => {
  const url = req.body.url;
  if (!url) {
    return sendResponse(res, 404, 'Url required');
  }

  try {
    const dataList = await instagramDl(url);
    return sendResponse(res, 200, 'Url fetch successful', dataList);

  } catch (error) {
    return sendResponse(res, 404, 'failed');

  }
});


function sendResponse(res, status, message, data = false) {
  return res.status(status).json({
    'Content- Type': 'application/json',
    'message': message,
    'data': data
  })
}


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});






