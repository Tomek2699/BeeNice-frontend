import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import SearchHelper from '@/helpers/searchHelper';
import { HoneyCollection } from '@/DataModels/HoneyCollectionModel';

interface Props {
    honeyCollections: HoneyCollection[];
    setFilteredHoneyCollections: Dispatch<SetStateAction<HoneyCollection[]>>;
}

export const useSearch = ({ honeyCollections, setFilteredHoneyCollections } : Props) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const filteredData = SearchHelper.search(searchQuery, honeyCollections, ['collectionDate']);
    setFilteredHoneyCollections(filteredData);
  }, [honeyCollections, searchQuery]);

  return { handleSearch };
};
