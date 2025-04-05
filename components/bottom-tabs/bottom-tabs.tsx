'use client';
import React, { ReactNode } from 'react';
import Item from './item';
import { BottomTabsProvider } from '@/context/bottom-tabs-context';

type BottomTabsProps = {
  onChange?: (value: string) => void;
  activeTab?: string;
  children: ReactNode;
};

const BottomTabs = ({ onChange, activeTab, children }: BottomTabsProps) => {
  return (
    <BottomTabsProvider onTabChange={onChange} activeTab={activeTab}>
      <div className="fixed bottom-0 left-0 z-50 h-16 w-full bg-white dark:bg-gray-700">
        <div className="mx-auto grid h-full max-w-lg auto-cols-fr grid-flow-col font-medium">
          {children}
        </div>
      </div>
    </BottomTabsProvider>
  );
};

BottomTabs.Item = Item;

export default BottomTabs;
