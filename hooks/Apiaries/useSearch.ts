import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import SearchHelper from '@/helpers/searchHelper';
import { Apiary } from '@/DataModels/ApiaryModel';

export interface Props {
    apiaries: Apiary[];
    setFilteredApiaries: Dispatch<SetStateAction<Apiary[]>>;
}

export const useSearch = ({ apiaries, setFilteredApiaries } : Props) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const filteredData = SearchHelper.search(searchQuery, apiaries, ['name']);
    setFilteredApiaries(filteredData);
  }, [apiaries, searchQuery]);

  return { handleSearch };
};
