const mongoose = require('mongoose');

const WeatherLocationsSchema = new mongoose.Schema({
  date: Date,
  location: String,
  temperature: Number,
});
module.exports = mongoose.model('WeatherLocations', WeatherLocationsSchema);

// ricerca per mese
// db.customer.aggregate([
//   {$project: {name: 1, month: {$month: '$bday'}}},
//   {$match: {month: 9}}
// ]);
