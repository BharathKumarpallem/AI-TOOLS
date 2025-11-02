import { useState } from 'react';
import axios from 'axios';
import { Heart, Activity, MapPin, AlertCircle, Clock, Stethoscope, Pill } from 'lucide-react';

export default function HealthMode() {
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [prescription, setPrescription] = useState<string | null>(null);
  const [medicalHistory, setMedicalHistory] = useState<string[]>([]);
  const [prescribing, setPrescribing] = useState(false);

  const checkSymptoms = () => {
    setLoading(true);
    setPrescription(null);
    setTimeout(() => {
      const diagnosis = {
        condition: 'Common Cold',
        severity: 'Mild',
        recommendations: [
          'Get plenty of rest',
          'Stay hydrated - drink lots of water',
          'Use over-the-counter pain relievers if needed',
          'Monitor your temperature',
        ],
        hospitals: [
          { name: 'City General Hospital', distance: '2.3 km', rating: 4.5 },
          { name: 'Community Health Center', distance: '3.7 km', rating: 4.2 },
          { name: 'Medical Plaza', distance: '5.1 km', rating: 4.7 },
        ],
        firstAid:
          'For immediate relief: Rest in a comfortable position, keep yourself warm, and drink warm fluids.',
      };
      setResult(diagnosis);
      setMedicalHistory([...medicalHistory, `${new Date().toLocaleDateString()}: ${symptoms}`]);
      setLoading(false);
    }, 2000);
  };

  const generatePrescription = async () => {
    if (!symptoms.trim()) return alert('Please describe your symptoms first!');
    setPrescribing(true);
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content:
                'You are a licensed medical assistant that provides general prescriptions based on mild, non-emergency symptoms. Keep responses concise, list medicines, dosage, and care instructions.',
            },
            {
              role: 'user',
              content: `Patient symptoms: ${symptoms}. Provide a simple, non-emergency prescription.`,
            },
          ],
          max_tokens: 250,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
        }
      );

      const aiText = response.data.choices?.[0]?.message?.content || 'No prescription generated.';
      setPrescription(aiText);
    } catch (error) {
      console.error('Error generating prescription:', error);
      alert('Failed to generate prescription. Check console.');
    } finally {
      setPrescribing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-red-100 p-3 rounded-lg">
            <Heart className="text-red-600" size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Health Mode</h2>
            <p className="text-gray-600">AI-powered symptom checker and health guidance</p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Stethoscope className="text-red-600" size={20} />
              <span className="font-semibold text-gray-700">Symptom Checker</span>
            </div>
            <p className="text-sm text-gray-600">AI-powered health analysis</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="text-blue-600" size={20} />
              <span className="font-semibold text-gray-700">Find Hospitals</span>
            </div>
            <p className="text-sm text-gray-600">Nearby medical facilities</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="text-green-600" size={20} />
              <span className="font-semibold text-gray-700">First Aid</span>
            </div>
            <p className="text-sm text-gray-600">Immediate care guidance</p>
          </div>
        </div>

        {/* Input */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Describe Your Symptoms
            </label>
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="e.g., I have a headache, fever, and cough..."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={checkSymptoms}
            disabled={!symptoms || loading}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Analyzing Symptoms...' : 'Check Symptoms'}
          </button>
        </div>
      </div>

      {/* Diagnosis Result */}
      {result && (
        <>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Analysis Result</h3>

            <div className="mb-4 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
              <div className="flex items-center space-x-2">
                <AlertCircle className="text-yellow-600" size={20} />
                <p className="text-sm text-gray-700">
                  <strong>Possible Condition:</strong> {result.condition} ({result.severity})
                </p>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">Recommendations:</h4>
              <ul className="space-y-2">
                {result.recommendations.map((rec: string, idx: number) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center space-x-2">
                <Activity size={18} className="text-blue-600" />
                <span>First Aid Guidance</span>
              </h4>
              <p className="text-sm text-gray-700">{result.firstAid}</p>
            </div>

            {/* AI Prescription Section */}
            <button
              onClick={generatePrescription}
              disabled={prescribing}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 transition-colors flex justify-center items-center space-x-2"
            >
              <Pill size={20} />
              <span>{prescribing ? 'Generating Prescription...' : 'Generate AI Prescription'}</span>
            </button>

            {prescription && (
              <div className="mt-6 bg-green-50 p-4 rounded-lg border border-green-300">
                <h4 className="text-lg font-semibold text-green-800 mb-2">AI Prescription</h4>
                <p className="text-sm text-gray-700 whitespace-pre-line">{prescription}</p>
              </div>
            )}
          </div>

          {/* Hospitals */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <MapPin className="text-blue-600" size={24} />
              <span>Nearby Hospitals & Clinics</span>
            </h3>
            <div className="space-y-3">
              {result.hospitals.map((hospital: any, idx: number) => (
                <div
                  key={idx}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-800">{hospital.name}</h4>
                      <p className="text-sm text-gray-600 flex items-center space-x-1 mt-1">
                        <MapPin size={14} />
                        <span>{hospital.distance}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold">
                        ★ {hospital.rating}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Medical History */}
          {medicalHistory.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                <Clock className="text-gray-600" size={24} />
                <span>Medical History</span>
              </h3>
              <div className="space-y-2">
                {medicalHistory.map((entry, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded text-sm text-gray-700">
                    {entry}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Disclaimer */}
      <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-sm text-red-800">
          <strong>Disclaimer:</strong> This tool provides general health information and is not a substitute
          for professional medical advice. Always consult with a healthcare provider for proper diagnosis and treatment.
        </p>
      </div>
    </div>
  );
}
