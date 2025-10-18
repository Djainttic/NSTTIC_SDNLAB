import React from 'react';
import type { LabsData, Language, LabStatuses, Content } from '../types';

interface LabCardProps {
    sectionId: string;
    section: LabsData[string];
    language: Language;
    statuses: LabStatuses;
    onClick: () => void;
    getTranslation: (key: string) => string;
}

const LabCard: React.FC<LabCardProps> = ({ section, sectionId, language, statuses, onClick, getTranslation }) => {
    const labsInSection = section.labs;
    let completedCount = 0;
    let inProgress = false;

    labsInSection.forEach(lab => {
        const status = statuses[lab.id];
        if (status === 'complete') completedCount++;
        if (status === 'in_progress') inProgress = true;
    });

    let statusKey = 'not_started';
    let statusColor = 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    if (completedCount === labsInSection.length && labsInSection.length > 0) {
        statusKey = 'complete';
        statusColor = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    } else if (completedCount > 0 || inProgress) {
        statusKey = 'in_progress';
        statusColor = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    }

    return (
        <div
            className="lab-card bg-secondary p-6 rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer border border-custom"
            onClick={onClick}
        >
            <div className="flex justify-between items-start">
                <h2 className="font-poppins text-xl font-bold mb-2 accent-color">{section.section[language]}</h2>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusColor}`}>
                    {getTranslation(`statuses.${statusKey}`)}
                </span>
            </div>
            <ul className="text-sm text-secondary space-y-1 mt-4">
                {labsInSection.map(lab => <li key={lab.id}>{lab.title[language]}</li>)}
            </ul>
        </div>
    );
};

interface ThemeToggleProps {
    theme: 'light' | 'dark';
    onClick: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onClick }) => {
    const sunIcon = <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>;
    const moonIcon = <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>;
    return (
         <button onClick={onClick} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">{theme === 'dark' ? sunIcon : moonIcon}</svg>
        </button>
    );
};


interface DashboardProps {
    labsData: LabsData;
    language: Language;
    labStatuses: LabStatuses;
    onSelectLab: (sectionId: string, labIndex: number) => void;
    onToggleTheme: () => void;
    onToggleLanguage: () => void;
    theme: 'light' | 'dark';
    content: Content;
}

export const Dashboard: React.FC<DashboardProps> = (props) => {
    const { labsData, language, labStatuses, onSelectLab, onToggleTheme, onToggleLanguage, theme, content } = props;
    
    // Fix: Correctly type the getTranslation function to ensure it always returns a string.
    const getTranslation = (key: string): string => {
        const keys = key.split('.');
        let result: any = content[language];
        for (const k of keys) {
            if (result && typeof result === 'object' && k in result) {
                result = result[k];
            } else {
                return key;
            }
        }
        return typeof result === 'string' ? result : key;
    };

    return (
        <div id="main-menu" className="min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold font-poppins"><span className="accent-color">SDN</span> Lab Manual</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button onClick={onToggleLanguage} className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            {language === 'en' ? '🇬🇧 EN / 🇫🇷 FR' : '🇫🇷 FR / 🇬🇧 EN'}
                        </button>
                        <ThemeToggle theme={theme} onClick={onToggleTheme} />
                    </div>
                </header>
                <div id="main-menu-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(labsData).map(([sectionId, section]) => (
                        <LabCard
                            key={sectionId}
                            sectionId={sectionId}
                            section={section}
                            language={language}
                            statuses={labStatuses}
                            onClick={() => onSelectLab(sectionId, 0)}
                            getTranslation={getTranslation}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};