import { useContext } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';
import { FaCar, FaUserCircle, FaPalette, FaRoad, FaUsers } from 'react-icons/fa';

const CaptainDetails = () => {
  const { Captain } = useContext(CaptainDataContext);
  const NameOfCaptain = `${Captain.FullName.FirstName} ${Captain.FullName.LastName}`;
  console.log(Captain);

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            className="h-20 w-20 rounded-full object-cover"
            src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww"
            alt="Captain"
          />
          <div>
            <h4 className="text-2xl font-semibold text-gray-800">{NameOfCaptain}</h4>
            <p className="text-sm text-gray-500">Captain Profile</p>
          </div>
        </div>

        <div className="text-center">
          <h4
            className={`text-xl font-semibold ${
              Captain.Status === 'inactive' ? 'text-red-600' : 'text-green-500'
            }`}
          >
            {Captain.Status === 'inactive' ? 'Inactive' : 'Active'}
          </h4>
          <p className="text-sm font-medium text-gray-500">Current Status</p>
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 mt-6 p-4 rounded-lg">
        <div className="text-center">
          <FaCar className="text-3xl text-gray-700 mx-auto" />
          <h5 className="text-lg font-medium text-gray-800 mt-2">{Captain.Vehicle.VehicleType}</h5>
          <p className="text-sm text-gray-500">Vehicle</p>
        </div>

        <div className="text-center">
          <FaPalette className="text-3xl text-gray-700 mx-auto" />
          <h5 className="text-lg font-medium text-gray-800 mt-2">{Captain.Vehicle.Color}</h5>
          <p className="text-sm text-gray-500">Color</p>
        </div>

        <div className="text-center">
          <FaRoad className="text-3xl text-gray-700 mx-auto" />
          <h5 className="text-lg font-medium text-gray-800 mt-2">{Captain.Vehicle.Plate}</h5>
          <p className="text-sm text-gray-500">Plate</p>
        </div>

        <div className="text-center">
          <FaUsers className="text-3xl text-gray-700 mx-auto" />
          <h5 className="text-lg font-medium text-gray-800 mt-2">{Captain.Vehicle.Capacity}</h5>
          <p className="text-sm text-gray-500">Capacity</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
