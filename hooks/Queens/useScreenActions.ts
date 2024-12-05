import { useState } from 'react';
import { Queen } from '@/DataModels/QueenModel';

interface Props {
    queens: Queen[];
}

export const useScreenActions = ({ queens } : Props) => {
  const [expandedQueen, setExpandedQueen] = useState(queens.length > 0 ? queens[0].id : null);
  const [addQueenModalVisible, setAddQueenModalVisible] = useState(false);
  const [editQueenModalVisible, setEditQueenModalVisible] = useState(false);
  const [selectedQueen, setSelectedQueen] = useState<Queen | null>(null);

  const openAddQueenModal = () => {
    setAddQueenModalVisible(true)
  };

  const closeAddQueenModal = () => {
    setAddQueenModalVisible(false);
  };

  const openEditQueenModal = (queen: Queen) => {
    setSelectedQueen(queen);
    setEditQueenModalVisible(true);
  };

  const closeEditQueenModal = () => {
    setSelectedQueen(null);
    setEditQueenModalVisible(false);
  };
  return { 
    expandedQueen, 
    selectedQueen, 
    addQueenModalVisible, 
    editQueenModalVisible, 
    setExpandedQueen, 
    openAddQueenModal, 
    closeAddQueenModal, 
    openEditQueenModal, 
    closeEditQueenModal 
  };
};
