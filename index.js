const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const { createClient } = require("redis")
const cors = require('cors')
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_HOST, REDIS_PORT, SESSION_SECRET } = require("./config/config");


const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

let RedisStore = require("connect-redis")(session)
let redisClient = createClient({
	url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
	legacyMode: true,
})

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

redisClient
	.connect()
	.then(async (res) => {
		console.log('connected');
		// Write your own code here
	})
	.catch((err) => {
		console.log('err happened' + err);
	});

app.use(cors())
app.enable('trust proxy');
app.use(session({
	store: new RedisStore({ client: redisClient }),
	secret: SESSION_SECRET,
	cookie: {
		secure: false,
		resave: false,
		saveUninitialized: false,
		httpOnly: true,
		maxAge: 60000,
	}
}))

app.use(express.json());

app.get("/api", (req, res) => {
	res.send("<h2>Hello there</h2>");
	console.log("WOW!!!")
});

app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`listining to port ${port}`);
});

