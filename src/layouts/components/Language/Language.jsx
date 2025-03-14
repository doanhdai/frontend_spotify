import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

const Language = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [language, setLanguage] = useState('Tiếng Việt');

    const languages = [
        { code: 'vi', name: 'Tiếng Việt' },
        { code: 'en', name: 'English' },
    ];

    const handleSelectLanguage = (lang) => {
        setLanguage(lang.name);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center text-[14px] px-3 py-1 mx-6 mb-8 border-[1px] border-[#7c7c7c] rounded-full font-bold hover:scale-105 hover:border-white"
            >
                <FontAwesomeIcon icon={faGlobe} className="mr-2" />
                {language}
            </button>

            {isOpen && (
                <div className="absolute left-6 bottom-12 bg-black shadow-md rounded-lg w-48 p-2 border ">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => handleSelectLanguage(lang)}
                            className="w-full text-left px-4 py-2 hover:bg-yellow-950"
                        >
                            {lang.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Language;
