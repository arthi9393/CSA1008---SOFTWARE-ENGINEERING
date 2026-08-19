const express = require("express");
const requisitionController = require("./src/controllers/requisitionController");

const app = express();
const PORT = 4000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("SCPMS backend is running!");
});

app.get("/requisitions", requisitionController.listRequisitions);

app.listen(PORT, () => {
    console.log(`SCPMS backend running on port ${PORT}`);
});