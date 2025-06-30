const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());



app.post("/submit-form", (req, res) => {
  const { schema, data } = req.body;
  const errors = validate(schema, data);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }
  submissions.push({ schema, data });
  res.status(200).json({ message: "Form submitted successfully" });
});

app.get("/submissions", (req, res) => {
  res.json(submissions);
});

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT || 5000}`)
);
