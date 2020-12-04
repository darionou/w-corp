const monthDictionary = {
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  may: 5,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  oct: 10,
  nov: 11,
  dec: 12,
};

const getMonth = (month) => monthDictionary[month];
const getLastHalfHourDate = () => new Date(new Date().setMinutes(new Date().getMinutes() - 30));
const calculateMonthlyAverage = (monthlyData) => {
  monthlyData.reduce((a, b) => a.temperature + b.temperature);
};

module.exports = {
  getMonth,
  getLastHalfHourDate,
  calculateMonthlyAverage,
};
