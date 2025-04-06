import React, { ReactNode } from 'react';
import Tab from './tab';
import { TabsProvider } from '@/context/tabs-context';

type Tab = {
  label: string;
};

type TabsProps = {
  onChange?: (value: string) => void;
  activeTab?: string;
  children: ReactNode;
};

const Tabs = ({ children, onChange, activeTab }: TabsProps) => {
  return (
    <TabsProvider onTabChange={onChange} activeTab={activeTab}>
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul className="-mb-px flex flex-wrap text-center text-sm font-medium" role="tablist">
          {children}
        </ul>
      </div>
    </TabsProvider>
  );
};

Tabs.Tab = Tab;

export default Tabs;
