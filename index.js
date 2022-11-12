const express = require("express");
const mongoose = require("mongoose");
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require("./config/config");

const postRouter = require("./routes/postRoutes");

const app = express();


const connectWithRetry = () => {

	mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`)
		.then(() => {
			console.log(" Success ");
		})
		.catch(() => {
			console.log(" Error ");
			setTimeout(connectWithRetry, 5000);
		});
}

connectWithRetry();

app.use(express.json());

app.get("/", (req, res) => {
	res.send("<h2>Hello there</h2>");
});

app.use("/api/posts", postRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`listining to port ${port}`);
});

