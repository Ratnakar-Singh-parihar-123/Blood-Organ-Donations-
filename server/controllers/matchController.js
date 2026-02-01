const Patient = require("../models/Patient");
const BloodDonor = require("../models/BloodDonor");
const OrganDonor = require("../models/OrganDonor");

exports.matchDonors = async (req, res) => {
  try {
    const { patientId } = req.params;

    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Blood Donor match
    const bloodDonors = await BloodDonor.find({
      bloodGroup: patient.bloodGroup,
      isAvailable: true
    });

    // Organ Donor match
    let organDonors = [];
    if (patient.organRequired) {
      organDonors = await OrganDonor.find({
        organsToDonate: { $in: [patient.organRequired] },
        isAvailable: true
      });
    }

    res.status(200).json({
      success: true,
      patient,
      matches: {
        bloodDonors,
        organDonors
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
