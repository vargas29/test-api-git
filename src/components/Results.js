import React, { useState } from 'react';
import styled from 'styled-components';
import Searcher from './Searcher';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, auto);
  overflow: auto;
`;

const GridCell = styled.div`
  padding: 0.5rem;
  border: 1px solid #c3c3c3;

  ${({header})=> header && `
  font-size: 1.25rem; 
  font-weight: 700;`}
`

const Paginator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & > *:not(:last-child) {
    margin-right: 5px;
  }
`;

const NoDataBanner = styled.div`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
`

const Row = ({
  language,
  defaultBranch,
  gitURL,
  name,
  description,
}) => (
  <>
    <GridCell>{name}</GridCell>
    <GridCell>{description}</GridCell>
    <GridCell>{language}</GridCell>
    <GridCell>{defaultBranch}</GridCell>
    <GridCell><a href={gitURL} target="_blank">{gitURL}</a></GridCell>
</>
);

const Results = ({ results, onSearchChange, onPageChange, repositoriesPerPages }) => {
  const { items = [], total_count } = results;
  const [currentPage, setCurrentPage] = useState(1);

  const repositories = items.map((item) => ({
    language: item.language || '',
    defaultBranch: item.default_branch || '',
    gitURL: item.git_url || '',
    name: item.name || '',
    description: item.description || '',
  }));

  const totalPages = total_count / repositoriesPerPages;

  function onPreviousPage() {
    const previousPage = currentPage - 1;
    setCurrentPage(previousPage);
    onPageChange(previousPage);
  }

  function onNextPage() {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    onPageChange(nextPage);
  }

  return (
  <>
    <Searcher onSearchChange={(query)=>{
      onSearchChange(query);
      setCurrentPage(1); // reset for every filter change
    }} />
    {repositories.length > 0 ? (
    <>
      <Grid>
          <GridCell header>Nombre</GridCell>
          <GridCell header>Descripción</GridCell>
          <GridCell header>Lenguaje</GridCell>
          <GridCell header>Branch por defecto</GridCell>
          <GridCell header>URL Git</GridCell>
        {repositories.map((repository) => (
          <Row key={repository.gitURL} {...repository} />
        ))}
      </Grid>
      {totalPages > 1 && (
        <Paginator>
          {currentPage > 1 && <button onClick={onPreviousPage}>{`<-`}</button>}
          <p><strong>{currentPage}</strong></p>
          {currentPage < totalPages && (
            <button onClick={onNextPage}>{`->`}</button>
          )}
        </Paginator>
      )}
    </>
    ) : (
      <NoDataBanner>No hay resultados</NoDataBanner>
    )}
  </>);
};

export default Results;
