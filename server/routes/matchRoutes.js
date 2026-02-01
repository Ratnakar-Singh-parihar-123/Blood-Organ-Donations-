const express = require("express");
const router = express.Router();

const { matchDonors } = require("../controllers/matchController");

// MATCH DONORS
router.get("/match-donors/:patientId", matchDonors);

module.exports = router;
