const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const CLIENT_ID = "Ov23liQgnmN4K7rt77PX";
const CLIENT_SECRET = "22df70933159162063fe2f6d87fa327aa682ded8";

app.post("/auth/github", async (req, res) => {
	const { code } = req.body;
	console.log("code recibido:", code);

	try {
		const tokenResponse = await axios.post(
			"https://github.com/login/oauth/access_token",
			{
				client_id: CLIENT_ID,
				client_secret: CLIENT_SECRET,
				code,
			},
			{
				headers: { Accept: "application/json" },
			}
		);

		const { access_token } = tokenResponse.data;

		res.json({
			access_token,
		});
	} catch (error) {
		console.error("Error getting token:", error);
		res.status(500).json({ error: "Error authenticating with GitHub" });
	}
});

app.listen(5000, () => {
	console.log("Server running on http://localhost:5000");
});
