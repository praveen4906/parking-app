import React, { useState } from 'react';

function App() {
  const [charges, setCharges] = useState('');
  const [spaces, setSpaces] = useState(0);
  const [availableLots, setAvailableLots] = useState([]);
  const [cars, setCars] = useState([]);
  const [removedCarDetails, setRemovedCarDetails] = useState(null);

  const [carName, setCarName] = useState('');
  const [carNumber, setCarNumber] = useState('');
  const [selectedLot, setSelectedLot] = useState('');

  const handleSpacesChange = (e) => {
    const num = parseInt(e.target.value, 10);
    setSpaces(num);
    const lots = Array.from({ length: num }, (_, i) => i + 1);
    setAvailableLots(lots);
  };

  const handleAddCar = () => {
    if (!carName || !carNumber || !selectedLot) return;

    const newCar = {
      name: carName,
      number: carNumber,
      lot: parseInt(selectedLot),
      startTime: new Date()
    };

    setCars([...cars, newCar]);
    setAvailableLots(availableLots.filter((lot) => lot !== newCar.lot));
    setCarName('');
    setCarNumber('');
    setSelectedLot('');
  };

  const handleRemoveCar = (car) => {
    const endTime = new Date();
    const timeParked = (endTime - new Date(car.startTime)) / (1000 * 60 * 60);
    const cost = Math.ceil(timeParked * parseFloat(charges || 0));

    setCars(cars.filter((c) => c.number !== car.number));
    setAvailableLots([...availableLots, car.lot].sort((a, b) => a - b));
    setRemovedCarDetails({
      name: car.name,
      number: car.number,
      startTime: car.startTime,
      endTime: endTime,
      duration: timeParked.toFixed(2),
      cost
    });
  };

  const formatTime = (date) =>
    new Date(date).toLocaleString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 px-4 pt-6">
      <div className="w-full max-w-4xl mx-auto flex-grow">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-gray-800">
          Parking Management System
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-base font-medium mb-1">Charges per hour</label>
            <input
              type="number"
              value={charges}
              onChange={(e) => setCharges(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-base font-medium mb-1">Number of parking spaces</label>
            <input
              type="number"
              value={spaces}
              onChange={handleSpacesChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
        </div>

        <div className="bg-white shadow rounded p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Add a Car</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Car Owner Name"
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
              className="border rounded px-3 py-2 w-full"
            />
            <input
              type="text"
              placeholder="Car Number"
              value={carNumber}
              onChange={(e) => setCarNumber(e.target.value)}
              className="border rounded px-3 py-2 w-full"
            />
            <select
              value={selectedLot}
              onChange={(e) => setSelectedLot(e.target.value)}
              className="border rounded px-3 py-2 w-full"
            >
              <option value="">Select Lot</option>
              {availableLots.map((lot) => (
                <option key={lot} value={lot}>Lot {lot}</option>
              ))}
            </select>
            <button
              onClick={handleAddCar}
              className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
            >
              ADD
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Current Cars</h2>
          {cars.length === 0 ? (
            <p className="text-gray-500">No cars parked.</p>
          ) : (
            <div className="space-y-4">
              {cars.map((car) => (
                <div
                  key={car.number}
                  className="border p-4 rounded shadow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div>
                    <p><strong>Name:</strong> {car.name}</p>
                    <p><strong>Number:</strong> {car.number}</p>
                    <p><strong>Lot:</strong> {car.lot}</p>
                    <p><strong>Entry Time:</strong> {formatTime(car.startTime)}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveCar(car)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    REMOVE CAR
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-gray-100 p-6 rounded shadow mb-10">
          <h2 className="text-lg font-bold mb-4">Details</h2>
          {removedCarDetails ? (
            <div className="space-y-2">
              <p><strong>Car Owner Name :</strong> {removedCarDetails.name}</p>
              <p><strong>Car Number :</strong> {removedCarDetails.number}</p>
              <p><strong>Entry Time :</strong> {formatTime(removedCarDetails.startTime)}</p>
              <p><strong>Exit Time :</strong> {formatTime(removedCarDetails.endTime)}</p>
              <p><strong>Duration Parked :</strong> {removedCarDetails.duration} hours</p>
              <p><strong>Total Charges :</strong> ₹{removedCarDetails.cost}</p>
            </div>
          ) : (
            <p className="text-gray-500">No car removed yet.</p>
          )}
        </div>
      </div>

      <div className="text-center  text-gray-500 mt-auto mb-4">
        Made by{' '}
        <a
          href="https://github.com/praveen-4906"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700"
        >
          Praveen
        </a>
      </div>

    </div>
  );
}

export default App;
