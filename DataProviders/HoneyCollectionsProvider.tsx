import React, { createContext, useState, useContext, ReactNode } from 'react';
import { HoneyCollection } from '@/DataModels/HoneyCollectionModel';

interface HoneyCollectionsContextType {
  honeyCollections: HoneyCollection[];
  setHoneyCollections: React.Dispatch<React.SetStateAction<HoneyCollection[]>>;
}

const HoneyCollectionsContext = createContext<HoneyCollectionsContextType | undefined>(undefined);

interface HoneyCollectionsProviderProps {
  children: ReactNode;
}

export const HoneyCollectionsProvider = ({ children }: HoneyCollectionsProviderProps) => {
  const [honeyCollections, setHoneyCollections] = useState<HoneyCollection[]>([]);

  return (
    <HoneyCollectionsContext.Provider value={{ honeyCollections, setHoneyCollections }}>
      {children}
    </HoneyCollectionsContext.Provider>
  );
};

export const useHoneyCollections = () => {
  const context = useContext(HoneyCollectionsContext);

  if (!context) {
    throw new Error('useHoneyCollections must be used within a HoneyCollectionsProvider');
  }

  return context;
};