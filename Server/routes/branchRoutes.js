const express = require('express');
const router = express.Router();
const { findNearestBranches } = require('../controllers/branchController');

// GET route to find nearest branches
router.get('/find-nearest', findNearestBranches);

module.exports = router;



