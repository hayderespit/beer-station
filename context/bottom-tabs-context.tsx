'use client';
import { createContext, ReactNode, useState } from 'react';

type BottomTabsContextType = {
  onTabChange?: (value: string) => void;
  activeTab?: string;
};

export const BottomTabsContext = createContext<BottomTabsContextType>({});

type BottomTabsProviderProps = BottomTabsContextType & {
  children: ReactNode;
};

export const BottomTabsProvider = ({ children, ...rest }: BottomTabsProviderProps) => {
  const [activeTab, onTabChange] = useState<string>(rest.activeTab || '');

  const handleOnTabChange = (id: string) => {
    if (rest.onTabChange) {
      rest.onTabChange(id);
    }
    onTabChange(id);
  };

  return (
    <BottomTabsContext.Provider value={{ activeTab, onTabChange: handleOnTabChange }}>
      {children}
    </BottomTabsContext.Provider>
  );
};
