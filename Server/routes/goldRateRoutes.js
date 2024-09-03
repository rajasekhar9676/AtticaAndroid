const express = require('express');
const {
    createGoldRate,
    getAllGoldRates,
    getGoldRateById,
    updateGoldRateById,
    deleteGoldRateById,
} = require('../controllers/goldRateController');

const router = express.Router();

router.post('/', createGoldRate);
router.get('/', getAllGoldRates);
router.get('/:id', getGoldRateById);
router.put('/:id', updateGoldRateById);
router.delete('/:id', deleteGoldRateById);

module.exports = router;
