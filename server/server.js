const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});


