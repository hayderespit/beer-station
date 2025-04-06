'use client';
import { TabsContext } from '@/context/tabs-context';
import React, { FC, useContext } from 'react';

type Props = {
  label: string;
  id: string;
};

const Tab: FC<Props> = (props) => {
  const { label, id, ...rest } = props;
  const { onTabChange, activeTab } = useContext(TabsContext);
  const isActive = activeTab === id;

  const handleOnTabChange = () => {
    if (onTabChange) {
      onTabChange(id);
    }
  };

  return (
    <li className="me-2" role="presentation">
      <button
        onClick={handleOnTabChange}
        className={`relative inline-block cursor-pointer rounded-t-lg p-4 transition-colors ${
          !isActive ? 'text-manatee font-normal' : ''
        }`}
        id={`tab-${id}`}
        type="button"
        role="tab"
        aria-selected={isActive}
        {...rest}>
        {label}
        {isActive && (
          <span
            className="absolute left-1/2 -translate-x-1/2 transform rounded-lg bg-black"
            style={{ height: '3px', width: '50%', bottom: '-1px' }}
          />
        )}
      </button>
    </li>
  );
};

export default Tab;
