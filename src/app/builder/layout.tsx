'use client';

import { LearningObjectsProvider } from '@/components/builder/LearningObjectsContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LearningObjectsProvider>
      {children}
    </LearningObjectsProvider>
  );
}
