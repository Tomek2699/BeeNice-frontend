import { useState } from 'react';
import { HoneyCollection } from '@/DataModels/HoneyCollectionModel';

interface Props {
    honeyCollections: HoneyCollection[];
}

export const useScreenActions = ({ honeyCollections } : Props) => {
  const [expandedHoneyCollection, setExpandedHoneyCollection] = useState(honeyCollections.length > 0 ? honeyCollections[0].id : null);
  const [addHoneyCollectionModalVisible, setAddHoneyCollectionModalVisible] = useState(false);
  const [editHoneyCollectionModalVisible, setEditHoneyCollectionModalVisible] = useState(false);
  const [selectedHoneyCollection, setSelectedHoneyCollection] = useState<HoneyCollection | null>(null);

  const openAddHoneyCollectionModal = () => {
    setAddHoneyCollectionModalVisible(true)
  };

  const closeAddHoneyCollectionModal = () => {
    setAddHoneyCollectionModalVisible(false);
  };

  const openEditHoneyCollectionModal = (honeyCollection: HoneyCollection) => {
    setSelectedHoneyCollection(honeyCollection);
    setEditHoneyCollectionModalVisible(true);
  };

  const closeEditHoneyCollectionModal = () => {
    setSelectedHoneyCollection(null);
    setEditHoneyCollectionModalVisible(false);
  };
  return { 
    expandedHoneyCollection, 
    selectedHoneyCollection, 
    addHoneyCollectionModalVisible, 
    editHoneyCollectionModalVisible, 
    setExpandedHoneyCollection, 
    openAddHoneyCollectionModal, 
    closeAddHoneyCollectionModal, 
    openEditHoneyCollectionModal, 
    closeEditHoneyCollectionModal 
  };
};
