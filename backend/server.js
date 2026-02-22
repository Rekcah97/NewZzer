// import { config } from "dotenv";
// config();

import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const port = process.env.PORT || 3001;
app.use(cors());

const fetchData = async (req, res) => {
  const { country, category } = req.query;

  const apiKey = process.env.NEWS_API.split(",");

  for (let i = 0; i < apiKey.length; i++) {
    let key = apiKey[i];
    try {
      const url = `https://gnews.io/api/v4/top-headlines?country=${country}&category=${category}&max=100&apikey=${key}`;
      const data = await fetch(url);
      const json = await data.json();

      if (data.ok && json.articles) {
        console.log(`Using API no: ${i + 1}`);
        return res.json(json);
      }
    } catch (err) {
      console.log("Error in fetching data");
    }
  }

  return res.status(500).json({ error: "All API keys failed" });
};

app.get("/news", fetchData);

app.listen(port, () => {
  console.log(`server startedd at port: ${port}`);
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});
