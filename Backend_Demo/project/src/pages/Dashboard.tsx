import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  LogOut,
  Plus,
  LineChart,
  Droplets,
  Thermometer,
  Wind,
  Sun,
  Sprout
} from 'lucide-react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const mockYieldData = [
  { month: 'Jan', yield: 120 },
  { month: 'Feb', yield: 150 },
  { month: 'Mar', yield: 180 },
  { month: 'Apr', yield: 220 },
  { month: 'May', yield: 250 },
  { month: 'Jun', yield: 280 }
];

const cropDistribution = [
  { name: 'Wheat', value: 35 },
  { name: 'Rice', value: 25 },
  { name: 'Corn', value: 20 },
  { name: 'Soybeans', value: 20 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [showPredictionForm, setShowPredictionForm] = useState(false);
  const [formData, setFormData] = useState({
    cropType: '',
    temperature: '',
    humidity: '',
    rainfall: '',
    soilType: '',
    nitrogen: '',
    phosphorus: '',
    potassium: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your prediction model
    console.log('Prediction data:', formData);
    setShowPredictionForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Sprout className="h-8 w-8 text-green-600 mr-2" />
              <h1 className="text-xl font-semibold text-gray-900">Crop Yield Prediction</h1>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700 mr-4">{user?.email}</span>
              <button
                onClick={() => signOut()}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: LineChart, label: 'Average Yield', value: '245 tons' },
            { icon: Droplets, label: 'Rainfall', value: '85 mm' },
            { icon: Thermometer, label: 'Temperature', value: '24°C' },
            { icon: Wind, label: 'Humidity', value: '65%' }
          ].map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <stat.icon className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Yield Trends */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Yield Trends</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={mockYieldData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="yield" stroke="#059669" strokeWidth={2} />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Crop Distribution */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Crop Distribution</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={cropDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {cropDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* New Prediction Button */}
        <div className="mt-8">
          <button
            onClick={() => setShowPredictionForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Prediction
          </button>
        </div>

        {/* Prediction Form Modal */}
        {showPredictionForm && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h2 className="text-xl font-semibold mb-4">New Yield Prediction</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Crop Type</label>
                  <select
                    name="cropType"
                    value={formData.cropType}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  >
                    <option value="">Select crop type</option>
                    <option value="wheat">Wheat</option>
                    <option value="rice">Rice</option>
                    <option value="corn">Corn</option>
                    <option value="soybeans">Soybeans</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Temperature (°C)</label>
                    <input
                      type="number"
                      name="temperature"
                      value={formData.temperature}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Humidity (%)</label>
                    <input
                      type="number"
                      name="humidity"
                      value={formData.humidity}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Rainfall (mm)</label>
                    <input
                      type="number"
                      name="rainfall"
                      value={formData.rainfall}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Soil Type</label>
                    <select
                      name="soilType"
                      value={formData.soilType}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    >
                      <option value="">Select soil type</option>
                      <option value="loamy">Loamy</option>
                      <option value="sandy">Sandy</option>
                      <option value="clay">Clay</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nitrogen</label>
                    <input
                      type="number"
                      name="nitrogen"
                      value={formData.nitrogen}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phosphorus</label>
                    <input
                      type="number"
                      name="phosphorus"
                      value={formData.phosphorus}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Potassium</label>
                    <input
                      type="number"
                      name="potassium"
                      value={formData.potassium}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowPredictionForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Predict Yield
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;