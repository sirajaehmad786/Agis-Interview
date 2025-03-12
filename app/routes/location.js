const express = require("express")
const router = express.Router();
const locationController = require('../controllers/location')


router.get('/get-countries', locationController.getCountries)
router.post('/get-state', locationController.getState)
router.post('/get-cities', locationController.getCities)




module.exports = router;