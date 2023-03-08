const express = require('express');
const app = express();
const port = 8000;
app.use(express.json());
var cors = require('cors');
var corsOptions = {
  origin: 'http://localhost:3000',
};
app.use(cors(corsOptions));
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});