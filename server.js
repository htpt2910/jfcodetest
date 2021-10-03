const express = require('express'); 
const https = require('https');

const app = express();

// create a GET route
app.get('/', (req, res) => {
  console.log(req.headers);
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6