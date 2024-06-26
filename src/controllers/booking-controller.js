const {BookingService} = require('../services/index');
const {StatusCodes} = require('http-status-codes');

const bookingService = new BookingService();
const create = async (req, res) => {
    try {
        const response = await bookingService.createBooking(req.body);
        return res.status(400).json({
            message: 'Successfully completed booking',
            success: true,
            err: {},
            data: response
        })
    } catch (error) {
        return res.status(404).json({
            message: error.message,
            success: false,
            err: error.explanation,
            data: {}
        });
    }
}

const destroy = async(req, res) => {
    try {
        const response = await bookingService.deleteBooking(req.params.bookingId);
        return res.status(400).json({
            message: 'Successfully deleted booking',
            success: true,
            err: {},
            data: response
        })
    } catch (error) {
        return res.status(404).json({
            message: error.message,
            success: false,
            err: error.explanation,
            data: {}
        });
    }
}

module.exports = {
    create,
    destroy
}