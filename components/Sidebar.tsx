
import React from 'react';
import type { NavItem, SectionId } from '../types';

interface SidebarProps {
  navItems: NavItem[];
  activeSection: SectionId;
  setActiveSection: (sectionId: SectionId) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ navItems, activeSection, setActiveSection }) => {
  return (
    <aside className="w-64 bg-slate-900 text-gray-200 flex flex-col">
      <div className="p-6">
        <h2 className="text-3xl font-extrabold text-white">Navigation</h2>
      </div>
      <nav className="mt-4 flex-1">
        <ul>
          {navItems.map((item) => (
            <li key={item.id} className="m-2">
              <button
                onClick={() => setActiveSection(item.id)}
                className={`w-full text-left px-4 py-3 rounded-md text-lg transition-colors duration-200 ease-in-out
                  ${
                    activeSection === item.id
                      ? 'bg-blue-600 text-white font-semibold shadow-inner'
                      : 'hover:bg-slate-700 hover:text-white'
                  }
                `}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 text-center text-xs text-gray-500">
        <p>&copy; 2024 ENSTTIC. All rights reserved.</p>
      </div>
    </aside>
  );
};
