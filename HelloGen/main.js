const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");

// for the data transfer
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(bodyParser.json());

const PORT = process.env.PORT || 9080

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


// const prompt = "What is meaning of Sarvjyoti.";

const genrate = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
  } catch (err) {
    console.log(err);
  }
};

app.get("/api/content", async (req, res) => {
    try{
        const data = req.body.question;
        const result = await genrate(data);
        res.send({"result" : result});
    }catch(err) {
        console.log(err);
    }
})

app.listen(PORT, () => {
    console.log(`Server is runnig at : http://localhost:${PORT}`);
})

