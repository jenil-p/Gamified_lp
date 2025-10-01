import express from "express";

const app = express();
app.get("/", (req, res) => res.send("Gamified Platform ... On the Way /./././"));
app.listen(3000, () => console.log("Server running on port 3000"));
