
import React from 'react';
import { PAGE_CONTENT } from '../constants';
import type { SectionId } from '../types';

interface ContentDisplayProps {
  activeSection: SectionId;
}

export const ContentDisplay: React.FC<ContentDisplayProps> = ({ activeSection }) => {
  return (
    <div className="p-6 md:p-10">
      {PAGE_CONTENT[activeSection]}
    </div>
  );
};
