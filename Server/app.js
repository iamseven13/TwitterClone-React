const express = require('express'); // Express web server framework
const cors = require('cors');
const app = express();
const port = 2000;
const router = require('./router');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

// Connect to MongoDB
connectDB();

app.use(cors());

app.use('/', router);

app.listen(port, () => console.log(`listening on port ${port}!`)); // Start the server
