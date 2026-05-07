const express = require('express');

const router = express.Router();

const { getMember, addMember, updateMember, deleteMember} = require('../controllers/ memberController');

router.get("/", getMember);

router.post("/", addMember);

router.put("/:id", updateMember);

router.delete("/:id", deleteMember);

module.exports = router