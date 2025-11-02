import { useState } from 'react';
import { BookOpen, Brain, Globe, TrendingUp, CheckCircle } from 'lucide-react';

export default function StudentMode() {
  const [topic, setTopic] = useState('');
  const [language, setLanguage] = useState('English');
  const [quiz, setQuiz] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [performance, setPerformance] = useState({ total: 0, correct: 0 });

  const languages = ['English', 'Hindi', 'Spanish', 'French', 'German', 'Telugu', 'Tamil'];

  const generateQuiz = () => {
    setLoading(true);
    setTimeout(() => {
      const sampleQuiz = `Quiz on ${topic} (${language}):

1. What is the fundamental concept of ${topic}?
   A) Option A
   B) Option B
   C) Option C
   D) Option D

2. Which of the following best describes ${topic}?
   A) Description A
   B) Description B
   C) Description C
   D) Description D

3. Advanced question about ${topic}:
   A) Advanced option A
   B) Advanced option B
   C) Advanced option C
   D) Advanced option D

4. Practical application of ${topic}:
   A) Application A
   B) Application B
   C) Application C
   D) Application D

5. Critical thinking question on ${topic}:
   A) Critical option A
   B) Critical option B
   C) Critical option C
   D) Critical option D`;

      setQuiz(sampleQuiz);
      setLoading(false);
      setPerformance({ total: performance.total + 5, correct: performance.correct + 3 });
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-blue-100 p-3 rounded-lg">
            <BookOpen className="text-blue-600" size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Student Mode</h2>
            <p className="text-gray-600">AI-powered quiz generation and learning support</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Brain className="text-blue-600" size={20} />
              <span className="font-semibold text-gray-700">AI Quizzes</span>
            </div>
            <p className="text-sm text-gray-600">Generate custom quizzes on any topic</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Globe className="text-green-600" size={20} />
              <span className="font-semibold text-gray-700">Multi-Language</span>
            </div>
            <p className="text-sm text-gray-600">Support for regional languages</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="text-yellow-600" size={20} />
              <span className="font-semibold text-gray-700">Track Progress</span>
            </div>
            <p className="text-sm text-gray-600">Monitor your learning journey</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Topic
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Mathematics, Science, History..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={generateQuiz}
            disabled={!topic || loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Generating Quiz...' : 'Generate Quiz'}
          </button>
        </div>
      </div>

      {performance.total > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-green-600" size={24} />
              <h3 className="text-lg font-semibold text-gray-800">Performance Analytics</h3>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">
                {Math.round((performance.correct / performance.total) * 100)}%
              </p>
              <p className="text-sm text-gray-600">
                {performance.correct}/{performance.total} correct
              </p>
            </div>
          </div>
        </div>
      )}

      {quiz && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Generated Quiz</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">{quiz}</pre>
          </div>
          <div className="mt-4 bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> In online mode, this would use GPT-4 to generate personalized quizzes
              with detailed explanations. Offline mode uses cached quiz patterns.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
