import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import SearchHelper from '@/helpers/searchHelper';
import { Hive } from '@/DataModels/HiveModel';

interface Props {
    hives: Hive[];
    setFilteredHives: Dispatch<SetStateAction<Hive[]>>;
}

export const useSearch = ({ hives, setFilteredHives } : Props) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const filteredData = SearchHelper.search(searchQuery, hives, ['hiveNumber']);
    setFilteredHives(filteredData);
  }, [hives, searchQuery]);

  return { handleSearch };
};
