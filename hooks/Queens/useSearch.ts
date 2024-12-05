import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import SearchHelper from '@/helpers/searchHelper';
import { Queen } from '@/DataModels/QueenModel';

interface Props {
    queens: Queen[];
    setFilteredQueens: Dispatch<SetStateAction<Queen[]>>;
}

export const useSearch = ({ queens, setFilteredQueens } : Props) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const filteredData = SearchHelper.search(searchQuery, queens, ['queenNumber']);
    setFilteredQueens(filteredData);
  }, [queens, searchQuery]);

  return { handleSearch };
};
