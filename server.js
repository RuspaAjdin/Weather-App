
const express = require("express");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/weather", async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.json({ error: "City was not found" });
    }

    const apiKey = process.env.API_KEY;

    try {

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            const errorData = await response.json();

            return res.status(response.status).json({ error: errorData.message });
        }

        const data = await response.json();

        return res.json(data);

    }
    catch (error) {
        console.error("Could not get resources");
        return res.status(500).json({ error: "Could not get resources" });

    }
})

app.listen(PORT, () => {
    console.log(`Running server on port ${PORT}`);
})
