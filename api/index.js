const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');


const PORT = 8000;

dotenv.config();
app.use(express.json());

const main = async () => {
	try {
		// connect to MongoDB here
		console.log("DB is running ")
	} catch (error) {
		console.log(error)
	}
}

main()

app.listen(PORT, () => {
    console.log(`Backend is running on http://localhost:${PORT}`);
});
