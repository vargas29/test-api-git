import React, { useState } from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import moment from 'moment';

const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  padding: 1rem;
  border: 1px solid #eeeeee;
  margin-top: 1rem;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`

const Field = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  input {
    width: 100%;
  }

  label {
    font-size: 0.82rem;
    margin-bottom: 5px;
  }
`;

const Button = styled.button`
  background: blue;
  color: white ;
  font-size: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  grid-column: 1 / -1;
`;


const Form = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [id, setId] = useState('');
  const [birthday, setBirthday] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);

  function resetFields() {
    setName("");
    setLastname("")
    setId("")
    setBirthday(null)
    setEmail("")
    setUsername("")
    setError(false)
    setErrorEmail(false)
    onRegister(1);
  }

  function saveCookie() {
  let err=(error || errorEmail)?true:false;

    if(err) return;
    const person = { name, lastname, id, birthday, email, username };
    document.cookie = `person=${JSON.stringify(person)}`;
    onRegister(person);
  }

  return (
    <StyledForm
      onSubmit={(e) => {
        e.preventDefault();
        saveCookie();
      }}>
        <Field>
      <label htmlFor="name">Nombre</label>
      <input
        type="text"
        name="name"
        value={name}
        required  onChange={(e) => setName(e.target.value)}
      />
      </Field>
      <Field>
      <label htmlFor="lastname">Apellidos</label>
      <input
        type="text"
        name="lastname"
        value={lastname}
        required  onChange={(e) => setLastname(e.target.value)}
      />
      </Field>
      <Field>
      <label htmlFor="id">Cédula</label>
      <input
        type="number"
        inputMode="numeric"
        name="id"
        value={id}
        required onChange={(e) => setId(e.target.value)}
      />
      </Field>
      <Field>
      <label htmlFor="birthday">Fecha de nacimiento</label>
      <input
      
        type="date"
        name="birthday"
        required  
        onChange={(e) => { 
          let dateAct = moment();
          let dBirthday = moment(e.target.value);
          setError(dBirthday.isAfter(dateAct));
          setBirthday(e.target.value)
        }}
      />

       {error? <span>La fecha es mayor a la actual</span>:""}
      </Field>
    
      <Field>
      <label htmlFor="email">Correo electrónico</label>
      <input
        type="email"
        name="email"
        value={email}
        required  
        onChange={(e) => {
          const re = /\S+@\S+\.\S+/;
          setErrorEmail(!re.test(e.target.value));
          setEmail(e.target.value)
        }}
      />
      {errorEmail? <span>El correo es invalido</span>:""}
      </Field>
      <Field>
      <label htmlFor="username">Usuario de Github</label>
      <input
        type="text"
        name="username"
        value={username}
        required onChange={(e) => setUsername(e.target.value)}
      />
      </Field>
      <Button  type="submit">Save</Button>
      <Button type="button"  
      onClick={(e) => {
        e.preventDefault();
        resetFields();
      }}>Reset</Button>
    </StyledForm>
       
  );
};

export default Form;
