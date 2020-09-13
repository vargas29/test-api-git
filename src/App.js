import React, { useState } from 'react';
import styled from 'styled-components';
import Form from './components/Form';
import Results from './components/Results';

const Page = styled.div`
  max-width: 720px;
  margin: 0 auto;
`;

const Header = styled.header`
  background-color: #b7ddf1;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 1rem;

  & > * {
    flex: 1;
    margin: 0;
  } 
`;

function App() {
  const repositoriesPerPages = 5;
  const [repositoriesData, setRepositoriesData] = useState();
  const [person, setPerson] = useState();
  const [query, setQuery] = useState('');

  const getRepositories = async ({ page = 1, username, query = '' }) => {
    if(username){
      try {
        const response = await fetch(
          `https://api.github.com/search/repositories?q=${query}+in:name+user:${username}&order=desc&page=${page}&per_page=${repositoriesPerPages}`,
        );
        const data = await response.json();
        setRepositoriesData(data);
      } catch (error) {
        setRepositoriesData({}); // set empty object to show "No data" message
      }
    }else{
      setRepositoriesData({});
    }
   
  };

  const onRegister = (person) => {
    setPerson(person);
    setRepositoriesData(); // reset for a new user
    getRepositories({ username: person.username });
  };

  const onSearchChange = (query) => {
    setQuery(query);
    getRepositories({ username: person.username, query });
  };

  const onPageChange = (page) => {
    getRepositories({ page, username: person.username, query });
  };

  return (
    <Page>
      {person && (
        <Header>
          <h1> User : {person.username}</h1>
          <h4> Name : {person.name}  {person.lastname} </h4>
          <h4> Email : {person.email}</h4>
        </Header>
      )}
      <main>
        <Form onRegister={onRegister} />
        {repositoriesData && (
          <Results
            results={repositoriesData}
            onSearchChange={onSearchChange}
            onPageChange={onPageChange}
            repositoriesPerPages={repositoriesPerPages}
          />
        )}
      </main>
    </Page>
  );
}

export default App;
