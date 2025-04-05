'use client';
import { BottomTabsContext } from '@/context/bottom-tabs-context';
import Link from 'next/link';
import { FC, ReactNode, useContext, useState } from 'react';

type ItemProps = {
  id: string;
  label?: string;
  children?: ReactNode;
  icon?: (isHovered: boolean, isActive: boolean) => ReactNode;
  href: string;
  isActive?: boolean;
};

const Item: FC<ItemProps> = (props) => {
  const { id, label, children, icon, href, isActive, ...rest } = props;
  const { onTabChange } = useContext(BottomTabsContext);
  const [isHovered, setIsHovered] = useState(false);

  const handleOnTabChange = () => {
    if (onTabChange) {
      onTabChange(id);
    }
  };

  return (
    <Link
      href={href}
      type="button"
      className={`group inline-flex cursor-pointer flex-col items-center justify-center px-5 dark:hover:bg-gray-800 ${isActive ? 'text-primary dark:text-primary' : ''}`}
      onClick={handleOnTabChange}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...rest}>
      {icon ? (
        <span
          className={`${
            isActive || isHovered
              ? 'test text-primary dark:text-primary'
              : 'text-gray-500 dark:text-gray-400'
          }`}>
          {icon(isHovered, !!isActive)}
        </span>
      ) : (
        children
      )}

      <span
        className={`text-sm ${
          isActive || isHovered
            ? 'text-primary dark:text-primary'
            : 'text-gray-500 dark:text-gray-400'
        }`}>
        {!!label && label}
      </span>
    </Link>
  );
};

export default Item;
