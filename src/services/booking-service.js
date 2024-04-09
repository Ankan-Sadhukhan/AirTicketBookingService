const axios = require('axios');
const {BookingRepository} = require('../repository/index');
const {FLIGHT_SERVICE_PATH} = require('../config/serverConfig');

class bookingService{

    constructor(){
        this.bookingRepository = new BookingRepository();
    }

    async createBooking(data){
        try {
            const flightId = data.flightId;
            const getFlightReqUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            const response = await axios.get(getFlightReqUrl);
            const flightData = response.data.data;
            if(flightData.totalSeats <data.noOfSeats){
                throw new ServiceError('Something went wrong in the booking process', 'Insufficient seats in the flight');
            }
            const totalCost = flightData.price * data.noOfSeats;
            const bookingPayload = {...data, totalCost};
            const booking = await this.bookingRepository.create(bookingPayload);
            const updateFlightReqUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            await axios.patch(updateFlightReqUrl, {totalSeats: flightData.totalSeats - data.noOfSeats});
            console.log(updateFlightReqUrl)
            const finalBooking = await this.bookingRepository.update(booking.id, {status: 'Booked'});
            return finalBooking;
            
        } catch (error) {
            console.log(error);
            if(error.name == 'RepositoryError' || error.name == 'ValidationError') {
                throw error;
            }
            throw new ServiceError();
        }
    }

    async deleteBooking(bookingId){
        try {
            const booking = await this.bookingRepository.delete(bookingId);
            return booking;
        } catch (error) {
            if(error.name == 'RepositoryError') {
                throw error;
            }
            throw new ServiceError();
        }
    }
}

module.exports = bookingService;