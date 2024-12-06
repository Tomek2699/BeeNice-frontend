import { useState } from 'react';
import { BeeFamily } from '@/DataModels/BeeFamilyMode';

interface Props {
    beeFamilies: BeeFamily[];
}

export const useScreenActions = ({ beeFamilies } : Props) => {
  const [expandedBeeFamily, setExpandedBeeFamily] = useState(beeFamilies.length > 0 ? beeFamilies[0].id : null);
  const [addBeeFamilyModalVisible, setAddBeeFamilyModalVisible] = useState(false);
  const [editBeeFamilyModalVisible, setEditBeeFamilyModalVisible] = useState(false);
  const [selectedBeeFamily, setSelectedBeeFamily] = useState<BeeFamily | null>(null);

  const openAddBeeFamilyModal = () => {
    setAddBeeFamilyModalVisible(true)
  };

  const closeAddBeeFamilyModal = () => {
    setAddBeeFamilyModalVisible(false);
  };

  const openEditBeeFamilyModal = (beeFamily: BeeFamily) => {
    setSelectedBeeFamily(beeFamily);
    setEditBeeFamilyModalVisible(true);
  };

  const closeEditBeeFamilyModal = () => {
    setSelectedBeeFamily(null);
    setEditBeeFamilyModalVisible(false);
  };
  return { 
    expandedBeeFamily, 
    selectedBeeFamily, 
    addBeeFamilyModalVisible, 
    editBeeFamilyModalVisible, 
    setExpandedBeeFamily, 
    openAddBeeFamilyModal, 
    closeAddBeeFamilyModal, 
    openEditBeeFamilyModal,
    closeEditBeeFamilyModal,
  };
};
