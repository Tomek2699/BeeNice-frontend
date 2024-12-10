import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import SearchHelper from '@/helpers/searchHelper';
import { Review } from '@/DataModels/ReviewModel';

interface Props {
    reviews: Review[];
    setFilteredReviews: Dispatch<SetStateAction<Review[]>>;
}

export const useSearch = ({ reviews, setFilteredReviews } : Props) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const filteredData = SearchHelper.search(searchQuery, reviews, ['reviewDate']);
    setFilteredReviews(filteredData);
  }, [reviews, searchQuery]);

  return { handleSearch };
};
