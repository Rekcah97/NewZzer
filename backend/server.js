// import { config } from "dotenv";
// config();

import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const port = process.env.PORT || 3001;
app.use(cors());

const fetchData = async (req, res) => {
  try {
    const { country, category } = req.query;
    const url = `https://gnews.io/api/v4/top-headlines?country=${country}&category=${category}&max=100&apikey=${process.env.NEWS_API}`;
    const data = await fetch(url);
    const json = await data.json();
    console.log(json);
    res.json(json);
  } catch (err) {
    return res.status(500).json({ error: "cannot fetch news" });
  }
};

app.get("/news", fetchData);

app.listen(port, () => {
  console.log(`server startedd at port: ${port}`);
});
