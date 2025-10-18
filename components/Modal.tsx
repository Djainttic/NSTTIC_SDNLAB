import React, { useEffect, useRef } from 'react';

// Declare mermaid on window
declare global {
    interface Window { mermaid: any; }
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    isZoomModal?: boolean;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, isZoomModal = false }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    useEffect(() => {
        if (isOpen && isZoomModal && modalRef.current && window.mermaid) {
             const mermaidDivs = modalRef.current.querySelectorAll('.mermaid:not([data-processed="true"])');
             if (mermaidDivs.length > 0) {
                try {
                    window.mermaid.run({ nodes: mermaidDivs });
                } catch(e) {
                    console.error("Mermaid run error in zoom modal:", e);
                }
             }
        }
    }, [isOpen, isZoomModal, children]);

    if (!isOpen) {
        return null;
    }
    
    const modalOverlayClasses = isZoomModal
        ? "fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900 bg-opacity-80"
        : "fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-70";
        
    const modalContentClasses = isZoomModal
        ? "bg-secondary rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col relative p-4"
        : "bg-secondary rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col";

    return (
        <div className={modalOverlayClasses} onClick={onClose}>
            <div ref={modalRef} className={modalContentClasses} onClick={(e) => e.stopPropagation()}>
                {isZoomModal ? (
                    <button onClick={onClose} className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 z-10">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                ) : (
                    <div className="flex justify-between items-center p-4 border-b border-custom">
                        <h3 className="text-xl font-bold font-poppins">{title}</h3>
                        <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>
                )}
                <div className={isZoomModal ? "w-full h-full" : "p-6 overflow-y-auto"}>
                    {children}
                </div>
            </div>
        </div>
    );
};
