import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { ContentDisplay } from './components/ContentDisplay';
import { Dashboard } from './components/Dashboard';
import { LabViewer } from './components/LabViewer';
import { NAV_ITEMS } from './constants';
import { labsData, content } from './data';
import type { SectionId, Language, LabStatuses, Section, Lab } from './types';

// Declare mermaid on the window object for global access
declare global {
    interface Window { mermaid: any; }
}

const App: React.FC = () => {
    // STATE
    const [activeSection, setActiveSection] = useState<SectionId>('home');
    const [view, setView] = useState<'dashboard' | 'lab'>('dashboard');
    const [currentLab, setCurrentLab] = useState<{ sectionId: string; labIndex: number } | null>(null);
    const [language, setLanguage] = useState<Language>('en');
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [labStatuses, setLabStatuses] = useState<LabStatuses>({});

    const getMermaidThemeConfig = useCallback(() => {
        const isDark = theme === 'dark';
        return {
            theme: 'base',
            themeVariables: {
                primaryColor: isDark ? '#1e293b' : '#eff6ff',
                primaryTextColor: isDark ? '#f1f5f9' : '#0f172a',
                primaryBorderColor: isDark ? '#3b82f6' : '#004494',
                lineColor: isDark ? '#94a3b8' : '#64748b',
                textColor: isDark ? '#cbd5e1' : '#334155',
                nodeBorder: isDark ? '#3b82f6' : '#004494',
            },
            startOnLoad: false
        };
    }, [theme]);

    useEffect(() => {
        const savedState = localStorage.getItem('sdnLabState');
        if (savedState) {
            const { language, labStatuses } = JSON.parse(savedState);
            if (language) setLanguage(language);
            if (labStatuses) setLabStatuses(labStatuses);
        }
        const savedTheme = localStorage.getItem('theme');
        const initialTheme = savedTheme === 'dark' ? 'dark' : 'light';
        setTheme(initialTheme);
        document.documentElement.classList.toggle('dark', initialTheme === 'dark');

        if (window.mermaid) {
            window.mermaid.initialize(getMermaidThemeConfig());
        }
    }, [getMermaidThemeConfig]);

    useEffect(() => {
        localStorage.setItem('sdnLabState', JSON.stringify({ language, labStatuses }));
    }, [language, labStatuses]);
    
    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.classList.remove('dark', 'light');
        document.documentElement.classList.add(theme);
        if (window.mermaid) {
             window.mermaid.initialize(getMermaidThemeConfig());
        }
    }, [theme, getMermaidThemeConfig]);

    const handleSelectLab = (sectionId: string, labIndex: number) => {
        setCurrentLab({ sectionId, labIndex });
        setView('lab');
        const labId = labsData[sectionId].labs[labIndex].id;
        if (labStatuses[labId] !== 'complete') {
            updateLabStatus(labId, 'in_progress');
        }
    };
    
    const updateLabStatus = (labId: string, status: 'in_progress' | 'complete') => {
        setLabStatuses(prev => ({ ...prev, [labId]: status }));
    };

    const handleBackToDashboard = () => {
        setView('dashboard');
        setCurrentLab(null);
    };

    const handleNavigateLab = (direction: 1 | -1) => {
        if (!currentLab) return;
        const { sectionId, labIndex } = currentLab;
        const labs = labsData[sectionId].labs;
        const newIndex = labIndex + direction;
        if (newIndex >= 0 && newIndex < labs.length) {
            handleSelectLab(sectionId, newIndex);
        }
    };
    
    const toggleTheme = () => {
        setTheme(current => current === 'light' ? 'dark' : 'light');
    };
    
    const toggleLanguage = () => {
        setLanguage(current => current === 'en' ? 'fr' : 'en');
    };

    const getLabDetails = () => {
        if (!currentLab) return null;
        const section = labsData[currentLab.sectionId];
        const lab = section.labs[currentLab.labIndex];
        return { section, lab };
    };

    const handleSelectSection = (sectionId: SectionId) => {
        setActiveSection(sectionId);
        if (sectionId !== 'labs') {
            setView('dashboard');
            setCurrentLab(null);
        }
    };

    const renderContent = () => {
        if (activeSection !== 'labs') {
            return <ContentDisplay activeSection={activeSection} />;
        }

        if (view === 'lab' && currentLab) {
            const labDetails = getLabDetails();
            if (labDetails) {
                 return <LabViewer 
                            section={labDetails.section}
                            lab={labDetails.lab}
                            language={language}
                            onBack={handleBackToDashboard}
                            onNavigate={handleNavigateLab}
                            onToggleTheme={toggleTheme}
                            theme={theme}
                            labIndex={currentLab.labIndex}
                            totalLabs={labsData[currentLab.sectionId].labs.length}
                            onUpdateStatus={updateLabStatus}
                            content={content}
                        />;
            }
        }
        
        return <Dashboard 
                    labsData={labsData}
                    language={language}
                    labStatuses={labStatuses}
                    onSelectLab={handleSelectLab}
                    onToggleTheme={toggleTheme}
                    onToggleLanguage={toggleLanguage}
                    theme={theme}
                    content={content}
                />;
    };

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-slate-800 font-sans">
            <Sidebar 
                navItems={NAV_ITEMS} 
                activeSection={activeSection} 
                setActiveSection={handleSelectSection}
            />
            <main className="flex-1 overflow-y-auto">
                {renderContent()}
            </main>
        </div>
    );
};

export default App;
