const requisitionService = require("../services/requisitionService");

async function listRequisitions(req, res) {
    try {
        const requisitions = await requisitionService.getRequisitions();
        res.json(requisitions);
    } catch (err) {
        console.error("Error in listRequisitions:", err);
        res.status(500).json({ error: err.message || "Unknown error" });
    }
}

module.exports = { listRequisitions };