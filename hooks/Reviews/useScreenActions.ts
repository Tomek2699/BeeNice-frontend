import { useState } from 'react';
import { Review } from '@/DataModels/ReviewModel';

interface Props {
    reviews: Review[];
}

export const useScreenActions = ({ reviews } : Props) => {
  const [expandedReview, setExpandedReview] = useState(reviews.length > 0 ? reviews[0].id : null);
  const [addReviewModalVisible, setAddReviewModalVisible] = useState(false);
  const [editReviewModalVisible, setEditReviewModalVisible] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const openAddReviewModal = () => {
    setAddReviewModalVisible(true)
  };

  const closeAddReviewModal = () => {
    setAddReviewModalVisible(false);
  };

  const openEditReviewModal = (review: Review) => {
    setSelectedReview(review);
    setEditReviewModalVisible(true);
  };

  const closeEditReviewModal = () => {
    setSelectedReview(null);
    setEditReviewModalVisible(false);
  };
  return { 
    expandedReview, 
    selectedReview, 
    addReviewModalVisible, 
    editReviewModalVisible, 
    setExpandedReview, 
    openAddReviewModal, 
    closeAddReviewModal, 
    openEditReviewModal, 
    closeEditReviewModal 
  };
};
