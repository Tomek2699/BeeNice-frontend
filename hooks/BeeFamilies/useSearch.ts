import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import SearchHelper from '@/helpers/searchHelper';
import { BeeFamily } from '@/DataModels/BeeFamilyMode';

interface Props {
    beeFamilies: BeeFamily[];
    setFilteredBeeFamilies: Dispatch<SetStateAction<BeeFamily[]>>;
}

export const useSearch = ({ beeFamilies, setFilteredBeeFamilies } : Props) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const filteredData = SearchHelper.search(searchQuery, beeFamilies, ['familyNumber']);
    setFilteredBeeFamilies(filteredData);
  }, [beeFamilies, searchQuery]);

  return { handleSearch };
};
