import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Plane as Plant, User, Settings, LogOut, BarChart2, Cloud, Droplet, Sun } from 'lucide-react';

export default function Dashboard() {
  const { signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Plant className="h-8 w-8 text-green-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">AgriPredict</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/profile" className="text-gray-600 hover:text-gray-900">
                <User className="h-6 w-6" />
              </Link>
              <button
                onClick={() => signOut()}
                className="text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Weather Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Cloud className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Weather</dt>
                      <dd className="text-lg font-medium text-gray-900">Sunny, 25°C</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Soil Moisture Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Droplet className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Soil Moisture</dt>
                      <dd className="text-lg font-medium text-gray-900">65%</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Yield Prediction Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <BarChart2 className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Predicted Yield</dt>
                      <dd className="text-lg font-medium text-gray-900">4.5 tons/ha</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Sunlight Hours Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Sun className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Sunlight Hours</dt>
                      <dd className="text-lg font-medium text-gray-900">12.5 hrs</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="mt-8 bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Crop Prediction Analysis
              </h3>
              <div className="mt-4">
                <p className="text-gray-500">
                  Based on current conditions and historical data, the system predicts optimal growing conditions for:
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center text-sm text-gray-600">
                    <Plant className="h-5 w-5 mr-2 text-green-500" />
                    Wheat (95% success rate)
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <Plant className="h-5 w-5 mr-2 text-green-500" />
                    Corn (87% success rate)
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <Plant className="h-5 w-5 mr-2 text-green-500" />
                    Soybeans (82% success rate)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}