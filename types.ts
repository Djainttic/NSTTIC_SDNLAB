export type Language = 'en' | 'fr';

// Fix: Add SectionId and NavItem types to be used in constants and components.
export type SectionId = 'home' | 'topology' | 'mininet' | 'ryu' | 'access' | 'credits' | 'labs';

export interface NavItem {
  id: SectionId;
  label: string;
}

export interface LocalizedString {
    en: string;
    fr: string;
}

export interface Overview {
    objective: LocalizedString;
    requirements?: LocalizedString;
    // Fix: Made properties optional to support simpler overview objects.
    keyConcepts?: LocalizedString;
    howItWorks?: LocalizedString;
    learningOutcomes?: LocalizedString;
    realWorld?: LocalizedString;
}

export interface Step {
    en: string;
    fr: string;
}

export interface ImplementationOrTestingItem {
    en: string;
    fr: string;
    code?: string;
    lang?: string;
}

export interface Lab {
    id: string;
    title: LocalizedString;
    overview: Overview;
    diagram: string;
    steps: Step[];
    implementation: ImplementationOrTestingItem[];
    testing: ImplementationOrTestingItem[];
    // Fix: Changed type to allow code blocks in troubleshooting sections.
    troubleshooting: ImplementationOrTestingItem[];
}

export interface Section {
    section: LocalizedString;
    labs: Lab[];
}

export interface LabsData {
    [sectionId: string]: Section;
}

export type LabStatus = 'not_started' | 'in_progress' | 'complete';
export type LabStatuses = { [labId: string]: LabStatus };

export interface Content {
    [lang: string]: {
        backToMenu: string;
        explain: string;
        modalTitle: string;
        copied: string;
        copy: string;
        tabs: {
            [key: string]: string;
        };
        statuses: {
            [key: string]: string;
        };
        callouts: {
            [key: string]: string;
        }
    }
}