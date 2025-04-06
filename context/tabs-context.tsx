'use client';
import { createContext, ReactNode, useState } from 'react';

type TabsContextType = {
  onTabChange?: (value: string) => void;
  activeTab?: string;
};

export const TabsContext = createContext<TabsContextType>({});

type BottomTabsProviderProps = TabsContextType & {
  children: ReactNode;
};

export const TabsProvider = ({ children, ...rest }: BottomTabsProviderProps) => {
  const [activeTab, onTabChange] = useState<string>(rest.activeTab || '');

  const handleOnTabChange = (id: string) => {
    if (rest.onTabChange) {
      rest.onTabChange(id);
    }
    onTabChange(id);
  };

  return (
    <TabsContext.Provider value={{ activeTab, onTabChange: handleOnTabChange }}>
      {children}
    </TabsContext.Provider>
  );
};
