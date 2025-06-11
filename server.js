const express = require("express");
const axios = require("axios");
const app = express();


app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { weather: null, error: null });
});

app.get("/weather", async (req, res) => {
  const city = req.query.city;
  const apiKey = "32880b224572c22d51585bc8822a0f12";

  const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
   let weather;
   let error = null;
   try {
    const response = await axios.get(APIUrl);
    weather = response.data
   } catch (error) {
     weather = null;
     error = "Error, Please try again";
   }
  res.render("index", { weather, error });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
