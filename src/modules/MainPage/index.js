import axios from 'axios';
import { useState, useEffect } from 'react';
import { User } from '../User';
import { Profile } from '../Profile';
// Styles
import { Wrap, InfoBlock, Search, StyledLink } from './style';

export const MainPage = () => {

  const [ users , setUsers ] = useState([]);

  const headers = {
    Authorization: 'token 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',
  };

  const onFilter = (input = '') => {
    const inputValue = input.target.value.toLowerCase();
    if(inputValue.length) {
      axios.get(
        `https://api.github.com/search/users?q=${inputValue}`,
        {
          headers,
        }
      )
      .then((response) => setUsers(response.data.items))
      .catch(error => console.error("Error: " + error))
    }
  }

  return(
      <Wrap>
        <InfoBlock>
          <div><Search placeholder='Search for User' onChange={onFilter} type="text"/></div>
          { users.map((user = {}, index) => {
            return (
              <StyledLink to={`/profile?login=${user.login}`}>
                <User key={index} user={user}></User>
              </StyledLink> 
              
          )})}
          { users.length == 0 && <h1>Не існує такого користувача</h1> }
        
        </InfoBlock>
      </Wrap>
  );
};