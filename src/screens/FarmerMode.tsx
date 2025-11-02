import { useState } from 'react';
import { Sprout, Camera, TrendingUp, Cloud, Leaf, DollarSign } from 'lucide-react';

export default function FarmerMode() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState('rice');

  const crops = ['rice', 'wheat', 'corn', 'cotton', 'sugarcane', 'tomato', 'potato'];

  const mspData = [
    { crop: 'Rice', price: '₹2,183/quintal', change: '+5.2%' },
    { crop: 'Wheat', price: '₹2,125/quintal', change: '+3.8%' },
    { crop: 'Cotton', price: '₹6,620/quintal', change: '+7.1%' },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const detectDisease = () => {
    setLoading(true);
    setTimeout(() => {
      const result = {
        disease: 'Leaf Blight',
        severity: 'Moderate',
        confidence: 87,
        description:
          'A fungal disease that affects leaves, causing brown spots and wilting.',
        treatment: [
          'Remove and destroy infected leaves',
          'Apply fungicide spray (Mancozeb or Copper-based)',
          'Improve air circulation around plants',
          'Avoid overhead watering',
        ],
        prevention: [
          'Use disease-resistant varieties',
          'Practice crop rotation',
          'Maintain proper plant spacing',
          'Keep the field clean and free from debris',
        ],
      };
      setAnalysis(result);
      setLoading(false);
    }, 2000);
  };

  return (
    <div
      className="min-h-screen py-10"
      style={{
        background: 'linear-gradient(90deg, #1a472a, #4caf50, #f9d71c, #4fc3f7)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 12s ease infinite',
      }}
    >
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-green-100 p-3 rounded-lg">
              <Sprout className="text-green-600" size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Farmer Mode</h2>
              <p className="text-gray-600">
                Crop disease detection and agricultural support
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Camera className="text-green-600" size={20} />
                <span className="font-semibold text-gray-700">Disease Detection</span>
              </div>
              <p className="text-sm text-gray-600">AI-powered crop analysis</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="text-blue-600" size={20} />
                <span className="font-semibold text-gray-700">MSP Updates</span>
              </div>
              <p className="text-sm text-gray-600">Real-time pricing information</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Cloud className="text-yellow-600" size={20} />
                <span className="font-semibold text-gray-700">Weather Forecast</span>
              </div>
              <p className="text-sm text-gray-600">Agricultural weather data</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Crop Type
              </label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {crops.map((crop) => (
                  <option key={crop} value={crop}>
                    {crop.charAt(0).toUpperCase() + crop.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Crop Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="Selected crop"
                      className="max-h-64 mx-auto rounded-lg"
                    />
                  ) : (
                    <div className="space-y-2">
                      <Camera className="mx-auto text-gray-400" size={48} />
                      <p className="text-gray-600">Click to upload crop image</p>
                      <p className="text-sm text-gray-400">PNG, JPG up to 10MB</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <button
              onClick={detectDisease}
              disabled={!selectedImage || loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Analyzing Image...' : 'Detect Disease'}
            </button>
          </div>
        </div>

        {analysis && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Disease Analysis
            </h3>

            <div className="mb-4 p-4 bg-orange-50 border-l-4 border-orange-500 rounded">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-800">{analysis.disease}</p>
                  <p className="text-sm text-gray-600">
                    Severity: {analysis.severity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">
                    {analysis.confidence}%
                  </p>
                  <p className="text-xs text-gray-600">Confidence</p>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-700 mb-4">{analysis.description}</p>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center space-x-2">
                  <Leaf className="text-green-600" size={18} />
                  <span>Treatment Recommendations:</span>
                </h4>
                <ul className="space-y-2">
                  {analysis.treatment.map((step: string, idx: number) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span className="text-gray-700">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Prevention Tips:</h4>
                <ul className="space-y-1">
                  {analysis.prevention.map((tip: string, idx: number) => (
                    <li key={idx} className="text-sm text-gray-700">
                      {idx + 1}. {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <DollarSign className="text-green-600" size={24} />
            <span>Minimum Support Price (MSP) Updates</span>
          </h3>
          <div className="space-y-3">
            {mspData.map((item, idx) => (
              <div
                key={idx}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-gray-800">{item.crop}</h4>
                    <p className="text-lg text-green-600 font-bold">{item.price}</p>
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded font-semibold">
                    {item.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <Cloud className="text-blue-600" size={24} />
            <span>Weather Forecast</span>
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {['Today', 'Tomorrow', 'Day After'].map((day, idx) => (
              <div key={idx} className="p-4 bg-blue-50 rounded-lg text-center">
                <p className="font-semibold text-gray-800">{day}</p>
                <p className="text-2xl my-2">☀️</p>
                <p className="text-sm text-gray-600">28°C / 18°C</p>
                <p className="text-xs text-gray-500 mt-1">Clear sky</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
