'use client';
import React, { ReactNode } from 'react';
import Tab from './tab';
import { TabsProvider } from '@/context/tabs-context';

type BottomTabsProps = {
  onChange?: (value: string) => void;
  activeTab?: string;
  children: ReactNode;
};

const BottomTabs = ({ onChange, activeTab, children }: BottomTabsProps) => {
  return (
    <TabsProvider onTabChange={onChange} activeTab={activeTab}>
      <div className="fixed bottom-0 left-0 z-50 h-16 w-full bg-white shadow-2xl dark:bg-gray-700">
        <div className="mx-auto grid h-full max-w-lg auto-cols-fr grid-flow-col font-medium">
          {children}
        </div>
      </div>
    </TabsProvider>
  );
};

BottomTabs.Item = Tab;

export default BottomTabs;
