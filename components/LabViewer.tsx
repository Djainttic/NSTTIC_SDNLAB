import React, { useState, useEffect, useRef } from 'react';
import type { Lab, Section, Language, Content } from '../types';
import { CodeBlock } from './CodeBlock';
import { Modal } from './Modal';

// Declare mermaid on window
declare global {
    interface Window { mermaid: any; }
}

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


const TabContent: React.FC<{ lab: Lab; tabKey: string; language: Language; getTranslation: (key: string) => string; onZoom: (code: string) => void }> = ({ lab, tabKey, language, getTranslation, onZoom }) => {
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current && window.mermaid) {
            const mermaidDivs = contentRef.current.querySelectorAll('.mermaid:not([data-processed="true"])');
            if (mermaidDivs.length > 0) {
                 try {
                     window.mermaid.run({ nodes: mermaidDivs });
                 } catch(e) {
                     console.error("Mermaid run error:", e);
                 }
            }
        }
    }, [lab, tabKey, language]);
    
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            const container = (e.target as HTMLElement).closest('.diagram-container');
            if(container && lab.diagram) {
                onZoom(lab.diagram);
            }
        };
        const currentRef = contentRef.current;
        currentRef?.addEventListener('click', handler);
        return () => currentRef?.removeEventListener('click', handler);
    }, [lab.diagram, onZoom]);


    const data = lab[tabKey as keyof Lab];
    if (!data) return null;

    let content;
    switch (tabKey) {
        case 'overview':
            const overviewData = lab.overview;
            const titleMap = {
                en: { objective: "Objective", requirements: "Requirements", keyConcepts: "Key Concepts", howItWorks: "How It Works", learningOutcomes: "Learning Outcomes", advancedTip: "Advanced Tip", realWorld: "Real-World Applications" },
                fr: { objective: "Objectif", requirements: "Prérequis", keyConcepts: "Concepts Clés", howItWorks: "Comment Ça Marche", learningOutcomes: "Résultats d'Apprentissage", advancedTip: "Astuce Avancée", realWorld: "Applications Réelles" }
            };
            content = (
                <>
                    {Object.entries(titleMap[language]).map(([key, title]) => {
                        const overviewContent = overviewData[key as keyof typeof overviewData];
                        return overviewContent && overviewContent[language] ? (
                            <div key={key}>
                                <h4 className="font-poppins mt-6 mb-2 text-lg accent-color">{title}</h4>
                                <div dangerouslySetInnerHTML={{ __html: overviewContent[language] }} />
                            </div>
                        ) : null;
                    })}
                    {lab.diagram && (
                        <div className="my-6 p-4 border border-custom rounded-lg overflow-x-auto flex justify-center diagram-container">
                            <div className="mermaid">{lab.diagram}</div>
                        </div>
                    )}
                </>
            );
            break;
        case 'steps':
             content = (
                <div className="space-y-6">
                    {(data as Lab['steps']).map((step, index) => (
                         <div key={index} className="flex items-start">
                             <div className="flex-shrink-0 w-8 h-8 rounded-full step-icon flex items-center justify-center font-bold mr-4">{index + 1}</div>
                             <div className="pt-1" dangerouslySetInnerHTML={{ __html: step[language] }} />
                         </div>
                    ))}
                </div>
             );
             break;
        case 'implementation':
        case 'testing':
            content = (
                <>
                    {(data as Lab['implementation']).map((item, index) => (
                        <div key={index} className="my-4">
                            {item[language] && <div dangerouslySetInnerHTML={{ __html: item[language] }} />}
                            {item.code && <CodeBlock code={item.code} language={item.lang || 'bash'} getTranslation={getTranslation} />}
                        </div>
                    ))}
                </>
            );
            break;
        case 'troubleshooting':
             content = (
                <>
                    {(data as Lab['troubleshooting']).map((item, index) => (
                        <div key={index} className="my-4">
                            <div className="callout callout-warning p-4 rounded-r-lg">
                                <strong>{getTranslation('callouts.warning')}:</strong>
                                <span dangerouslySetInnerHTML={{ __html: ` ${item[language]}` }} />
                            </div>
                             {item.code && <CodeBlock code={item.code} language={item.lang || 'bash'} getTranslation={getTranslation} />}
                        </div>
                    ))}
                </>
             );
            break;
        default:
            content = null;
    }

    return <div ref={contentRef}>{content}</div>;
};


interface LabViewerProps {
    section: Section;
    lab: Lab;
    language: Language;
    onBack: () => void;
    onNavigate: (direction: 1 | -1) => void;
    onToggleTheme: () => void;
    theme: 'light' | 'dark';
    labIndex: number;
    totalLabs: number;
    onUpdateStatus: (labId: string, status: 'in_progress' | 'complete') => void;
    content: Content;
}

export const LabViewer: React.FC<LabViewerProps> = (props) => {
    const { section, lab, language, onBack, onNavigate, onToggleTheme, theme, labIndex, totalLabs, onUpdateStatus, content } = props;
    
    const [activeTab, setActiveTab] = useState('overview');
    const [isExplainModalOpen, setExplainModalOpen] = useState(false);
    const [isZoomModalOpen, setZoomModalOpen] = useState(false);
    const [zoomDiagramCode, setZoomDiagramCode] = useState('');
    
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
    
    useEffect(() => {
        const firstValidTab = Object.keys(content.en.tabs).find(tabKey => {
            const data = lab[tabKey as keyof Lab];
            return data && (!Array.isArray(data) || data.length > 0);
        }) || 'overview';
        setActiveTab(firstValidTab);
    }, [lab, content.en.tabs]);
    
    useEffect(() => {
        const mainContentEl = document.querySelector('main');
        if (!mainContentEl) return;

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = mainContentEl;
            if (scrollHeight > clientHeight) {
                const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;
                if (scrollPercent > 98) {
                    onUpdateStatus(lab.id, 'complete');
                }
            } else {
                 onUpdateStatus(lab.id, 'complete');
            }
        };
        mainContentEl.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => mainContentEl.removeEventListener('scroll', handleScroll);
    }, [lab.id, onUpdateStatus]);

    const handleZoom = (code: string) => {
        setZoomDiagramCode(code);
        setZoomModalOpen(true);
    };

    const overviewTitleMap = {
        en: { objective: "Objective", requirements: "Requirements", keyConcepts: "Key Concepts", howItWorks: "How It Works", learningOutcomes: "Learning Outcomes", advancedTip: "Advanced Tip", realWorld: "Real-World Applications" },
        fr: { objective: "Objectif", requirements: "Prérequis", keyConcepts: "Concepts Clés", howItWorks: "Comment Ça Marche", learningOutcomes: "Résultats d'Apprentissage", advancedTip: "Astuce Avancée", realWorld: "Applications Réelles" }
    };

    return (
        <div id="lab-viewer">
            <header className="sticky top-0 bg-secondary/80 backdrop-blur-md border-b border-custom shadow-sm z-40">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <button onClick={onBack} className="flex items-center text-sm font-semibold hover:accent-color transition-colors">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                        <span>{getTranslation('backToMenu')}</span>
                    </button>
                    <h2 className="text-lg font-poppins font-bold text-center accent-color truncate">{section.section[language]}</h2>
                    <div className="flex items-center space-x-2">
                        <button onClick={() => onNavigate(-1)} disabled={labIndex === 0} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        </button>
                         <button onClick={() => onNavigate(1)} disabled={labIndex === totalLabs - 1} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </button>
                        <ThemeToggle theme={theme} onClick={onToggleTheme} />
                    </div>
                </nav>
            </header>
            <div id="main-content">
                <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
                    <div className="flex justify-between items-start mb-6">
                        <h1 className="text-3xl font-bold font-poppins">{lab.title[language]}</h1>
                        <button onClick={() => setExplainModalOpen(true)} className="explain-btn flex-shrink-0 ml-4 flex items-center bg-accent-color-light text-accent-text-light px-3 py-1.5 rounded-full text-sm font-semibold hover:opacity-80 transition-opacity">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M10 3.5a1.5 1.5 0 011.5 1.5.75.75 0 001.5 0A3 3 0 0010 2a3 3 0 00-3 3 .75.75 0 001.5 0A1.5 1.5 0 0110 3.5zM6.5 6.5a1.5 1.5 0 011.5-1.5.75.75 0 000-1.5A3 3 0 005 6.5a3 3 0 003 3 .75.75 0 000-1.5A1.5 1.5 0 016.5 6.5zM10 12a1.5 1.5 0 01-1.5-1.5.75.75 0 00-1.5 0A3 3 0 0010 13.5a3 3 0 003-3 .75.75 0 00-1.5 0A1.5 1.5 0 0110 12zm3.5 1.5a1.5 1.5 0 01-1.5 1.5.75.75 0 000 1.5a3 3 0 003-3 3 3 0 00-3-3 .75.75 0 000 1.5A1.5 1.5 0 0113.5 13.5z"></path></svg>
                            <span>{getTranslation('explain')}</span>
                        </button>
                    </div>
                    <div className="border-b border-custom mb-6">
                        {Object.keys(content.en.tabs).map(tabKey => {
                            const data = lab[tabKey as keyof Lab];
                            if (!data || (Array.isArray(data) && data.length === 0)) return null;
                            return (
                                <button
                                    key={tabKey}
                                    onClick={() => setActiveTab(tabKey)}
                                    className={`tab-btn text-sm font-semibold p-3 border-b-2 border-transparent transition-colors ${activeTab === tabKey ? 'active' : ''}`}
                                >
                                    {getTranslation(`tabs.${tabKey}`)}
                                </button>
                            );
                        })}
                    </div>
                    <div className="prose dark:prose-invert max-w-none">
                       <TabContent lab={lab} tabKey={activeTab} language={language} getTranslation={getTranslation} onZoom={handleZoom} />
                    </div>
                </div>
            </div>
            
            <Modal
                isOpen={isExplainModalOpen}
                onClose={() => setExplainModalOpen(false)}
                title={`${getTranslation('modalTitle')}: ${lab.title[language]}`}
            >
                <div className="prose dark:prose-invert max-w-none">
                    {Object.entries(overviewTitleMap[language]).map(([key, title]) => {
                         const content = lab.overview[key as keyof typeof lab.overview];
                         return content && content[language] ? (
                            <div key={key}>
                                <h4 className="font-poppins mt-4 mb-2 text-md accent-color">{title}</h4>
                                <div dangerouslySetInnerHTML={{ __html: content[language] }} />
                            </div>
                        ) : null;
                    })}
                </div>
            </Modal>
            
             <Modal isOpen={isZoomModalOpen} onClose={() => setZoomModalOpen(false)} title="Diagram" isZoomModal={true}>
                <div className="w-full h-full flex items-center justify-center">
                    <div className="mermaid">{zoomDiagramCode}</div>
                </div>
            </Modal>
        </div>
    );
};