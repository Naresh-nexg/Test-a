import React, { useState, useCallback } from 'react';
import { getCareerMatches } from './services/geminiService';
import { JobMatch, Language } from './types';
import { TRANSLATIONS } from './constants';
import Loader from './components/Loader';
import MatchResult from './components/MatchResult';
import { SparklesIcon } from './components/icons/SparklesIcon';
import LanguageSelector from './components/LanguageSelector';
import { GlobeIcon } from './components/icons/GlobeIcon';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>(Language.EN);
  const [profile, setProfile] = useState('');
  const [location, setLocation] = useState('India');
  const [matches, setMatches] = useState<JobMatch[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t = TRANSLATIONS[language];
  const isApiKeyMissing = !process.env.API_KEY;

  const handleMatch = useCallback(async () => {
    if (isApiKeyMissing) {
      // The persistent error message is already shown, no need for another alert.
      return;
    }
    if (!profile.trim() || !location.trim()) {
      setError(t.error_empty);
      return;
    }

    setIsLoading(true);
    setError(null);
    setMatches(null);

    try {
      const result = await getCareerMatches(profile, location);
      setMatches(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : t.error_generic);
    } finally {
      setIsLoading(false);
    }
  }, [profile, location, t, isApiKeyMissing]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative antialiased">
      <div className="absolute top-4 right-4 z-10">
        <LanguageSelector selectedLanguage={language} onSelectLanguage={setLanguage} />
      </div>

      <main className="w-full max-w-2xl mx-auto flex flex-col items-center">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-br from-purple-400 to-blue-500 text-transparent bg-clip-text">
            {t.app_title}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-gray-400">
            {t.app_subtitle}
          </p>
        </div>

        <div className="mt-10 w-full p-6 bg-gray-900/50 rounded-2xl shadow-2xl border border-purple-900/60 backdrop-blur-sm">
          <div className="relative">
             <textarea
                id="profile"
                value={profile}
                onChange={(e) => setProfile(e.target.value)}
                placeholder={t.profile_placeholder}
                className="w-full h-40 bg-gray-900/80 border rounded-lg p-4 text-gray-200 placeholder-gray-500 focus:outline-none transition-all duration-300 resize-none form-glow-border"
              />
          </div>
          <div className="relative mt-4">
            <GlobeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder={t.location_placeholder}
              className="w-full bg-gray-900/80 border rounded-lg p-3 pl-10 text-gray-200 placeholder-gray-500 focus:outline-none transition-all duration-300 form-glow-border"
            />
          </div>

          <div className="mt-6 text-center">
             <button
              onClick={handleMatch}
              disabled={isLoading || isApiKeyMissing}
              className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-400/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
            >
              <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
              <SparklesIcon className="w-6 h-6 mr-3 transition-transform duration-300 group-hover:rotate-12" />
              {isLoading ? t.analyzing : t.analyze_button}
            </button>
          </div>
        </div>
        
        {isApiKeyMissing && (
          <div className="mt-8 bg-red-800/90 text-white text-sm font-semibold px-4 py-2 rounded-md shadow-lg backdrop-blur-sm border border-red-600">
            {t.error_api_key}
          </div>
        )}

        <div className="mt-10 w-full">
          {isLoading && <Loader text={t.loader_text}/>}
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center" role="alert">
              <strong className="font-bold">{t.error_title}</strong>
              <span className="block sm:inline ml-2">{error}</span>
            </div>
          )}
          {matches && !isLoading && <MatchResult data={matches} translations={t} />}
        </div>
      </main>
    </div>
  );
};

export default App;