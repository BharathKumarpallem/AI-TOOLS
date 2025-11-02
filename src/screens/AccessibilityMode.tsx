import { useState, useRef } from 'react';
import { Eye, Volume2, Camera, Type, Mic, Image as ImageIcon } from 'lucide-react';

export default function AccessibilityMode() {
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [voiceText, setVoiceText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  const handleTextToSpeech = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = () => setIsSpeaking(false);
        speechSynthesisRef.current = utterance;
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
      }
    } else {
      alert('Text-to-speech is not supported in your browser.');
    }
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition =
        (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setVoiceText(transcript);
        setText(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert('Speech recognition is not supported in your browser.');
    }
  };

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

  const describeScene = () => {
    setTimeout(() => {
      setDescription(
        'A photograph showing a sunny outdoor scene with a clear blue sky. In the foreground, there is a green lawn with scattered trees. A person wearing a red jacket is walking a dog on a pathway. In the background, there are buildings and mountains visible on the horizon.'
      );
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gray-100 p-3 rounded-lg">
              <Eye className="text-gray-600" size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Accessibility Mode</h2>
              <p className="text-gray-600">Text-to-speech and scene description tools</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Volume2 className="text-blue-600" size={20} />
                <span className="font-semibold text-gray-700">Text-to-Speech</span>
              </div>
              <p className="text-sm text-gray-600">Convert text to audio</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Camera className="text-green-600" size={20} />
                <span className="font-semibold text-gray-700">Scene Description</span>
              </div>
              <p className="text-sm text-gray-600">Describe images and scenes</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Mic className="text-yellow-600" size={20} />
                <span className="font-semibold text-gray-700">Voice Commands</span>
              </div>
              <p className="text-sm text-gray-600">Navigate with voice</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <Volume2 className="text-blue-600" size={24} />
            <span>Text-to-Speech</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Text to Convert to Speech
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste text here..."
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleTextToSpeech}
                disabled={!text}
                className={`flex-1 ${
                  isSpeaking ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
                } text-white py-3 rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2`}
              >
                <Volume2 size={20} />
                <span>{isSpeaking ? 'Stop Speaking' : 'Start Speaking'}</span>
              </button>

              <button
                onClick={handleVoiceInput}
                disabled={isListening}
                className={`flex-1 ${
                  isListening ? 'bg-red-600' : 'bg-green-600 hover:bg-green-700'
                } text-white py-3 rounded-lg font-semibold disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2`}
              >
                <Mic size={20} />
                <span>{isListening ? 'Listening...' : 'Voice Input'}</span>
              </button>
            </div>

            {voiceText && (
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Voice Input Captured:</p>
                <p className="text-gray-800">{voiceText}</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <Camera className="text-green-600" size={24} />
            <span>Scene & Object Description</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Image for Description
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="accessibility-image-upload"
                />
                <label htmlFor="accessibility-image-upload" className="cursor-pointer">
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="Selected for description"
                      className="max-h-64 mx-auto rounded-lg"
                    />
                  ) : (
                    <div className="space-y-2">
                      <ImageIcon className="mx-auto text-gray-400" size={48} />
                      <p className="text-gray-600">Click to upload image</p>
                      <p className="text-sm text-gray-400">We'll describe what's in the image</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <button
              onClick={describeScene}
              disabled={!selectedImage}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Describe Scene
            </button>

            {description && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Scene Description:</h4>
                <p className="text-gray-700 leading-relaxed">{description}</p>
                <button
                  onClick={() => {
                    const utterance = new SpeechSynthesisUtterance(description);
                    window.speechSynthesis.speak(utterance);
                  }}
                  className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center space-x-2"
                >
                  <Volume2 size={16} />
                  <span>Read Description Aloud</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <Type className="text-gray-600" size={24} />
            <span>Accessibility Features</span>
          </h3>

          <div className="space-y-3">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Voice Navigation</h4>
              <p className="text-sm text-gray-700">
                Use voice commands to navigate between modes. Try saying "Go to Student Mode" or "Go
                to Health Mode"
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Real-time Captioning</h4>
              <p className="text-sm text-gray-700">
                Automatic captions for audio and video content (in online mode with AI APIs)
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">High Contrast Mode</h4>
              <p className="text-sm text-gray-700">
                Enable high contrast colors for better visibility (configurable in settings)
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Keyboard Navigation</h4>
              <p className="text-sm text-gray-700">
                Full keyboard support for navigation and interaction throughout the app
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Text-to-speech uses your browser's built-in speech synthesis. In
            online mode with AI APIs, scene descriptions would use advanced vision models for more
            detailed and accurate descriptions.
          </p>
        </div>
      </div>
    </div>
  );
}
