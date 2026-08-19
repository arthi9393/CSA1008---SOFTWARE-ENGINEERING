const requisitionRepository = require("../repositories/requisitionRepository");

async function getRequisitions() {
    return await requisitionRepository.getAllRequisitions();
}

module.exports = {
    getRequisitions
};