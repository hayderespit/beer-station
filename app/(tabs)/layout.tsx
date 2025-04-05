'use client';
import BottomTabs from '@/components/bottom-tabs/bottom-tabs';
import Container from '@/components/container';
import { Basket, House, User } from '@phosphor-icons/react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container className="flex h-screen flex-col">
      <div className="flex-1 overflow-y-auto">{children}</div>
      <BottomTabs activeTab="orders">
        <BottomTabs.Item
          id="home"
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
          icon={(isHovered, isActive) => (
            <Basket
              style={{ transition: 'font-size 0.2s ease' }}
              fontSize={isHovered || isActive ? 39 : 30}
              weight={isHovered || isActive ? 'fill' : 'regular'}
            />
          )}
        />
        <BottomTabs.Item
          id="profile"
          icon={(isHovered, isActive) => (
            <User
              style={{ transition: 'font-size 0.2s ease' }}
              fontSize={isHovered || isActive ? 39 : 30}
              weight={isHovered || isActive ? 'fill' : 'regular'}
            />
          )}
        />
      </BottomTabs>
    </Container>
  );
}
