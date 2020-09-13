import React, { useState } from 'react';
import styled from 'styled-components';
import _ from 'lodash';

const SearcherInput = styled.input`
  width: 100%;
  font-size: 1.25rem;
  margin: 1rem 0;
  padding: 0.5rem;
`;

const Searcher = ({ onSearchChange }) => {
  const [search, setSearch] = useState('');
  const debouncedSearchChange = _.debounce(onSearchChange, 300);

  function onInputChange(e) {
    const query = e.target.value;
    setSearch(e.target.value);
    
    if (!query || (query && query.length >= 3)) {
      debouncedSearchChange(query);
    }
  }

  return <SearcherInput type="text" value={search} placeholder="Filtrar por nombre de repositorio" onChange={onInputChange} />;
};

export default Searcher;
