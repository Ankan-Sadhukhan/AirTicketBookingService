const express = require('express');

const router = express.Router();
const {BookingController} = require('../../controllers/index');

router.post('/bookings', BookingController.create);
router.delete('/bookings/:bookingId', BookingController.destroy);

module.exports=router