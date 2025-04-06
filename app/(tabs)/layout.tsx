'use client';
import BottomTabs from '@/components/bottom-tabs/bottom-tabs';
import { InternalLinks } from '@/utils/constants';
import { Basket, House } from '@phosphor-icons/react';
import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <>
      {children}
      <BottomTabs>
        <BottomTabs.Item
          id="home"
          href={InternalLinks.home}
          aria-label="Home"
          isActive={pathname.includes('/stations')}
          icon={(isHovered, isActive) => (
            <House
              style={{ transition: 'font-size 0.2s ease' }}
              fontSize={isHovered || isActive ? 39 : 30}
              weight={isHovered || isActive ? 'fill' : 'regular'}
            />
          )}
        />
        <BottomTabs.Item
          id="orders"
          href="/orders"
          aria-label="Orders"
          isActive={pathname.includes('/ordes')}
          icon={(isHovered, isActive) => (
            <Basket
              style={{ transition: 'font-size 0.2s ease' }}
              fontSize={isHovered || isActive ? 39 : 30}
              weight={isHovered || isActive ? 'fill' : 'regular'}
            />
          )}
        />
        {/* <BottomTabs.Item
          id="profile"
          aria-label="Profile"
          icon={(isHovered, isActive) => (
            <User
              style={{ transition: 'font-size 0.2s ease' }}
              fontSize={isHovered || isActive ? 39 : 30}
              weight={isHovered || isActive ? 'fill' : 'regular'}
            />
          )}
        /> */}
      </BottomTabs>
    </>
  );
}
