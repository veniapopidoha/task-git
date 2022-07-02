import axios from 'axios';
import React, { useState } from 'react';
import { User } from '../User';
// Styles
import { Wrap, InfoBlock, Search, StyledLink } from './style';
import { useDispatch, useSelector } from 'react-redux';

export const MainPage = () => {

  const dispatch = useDispatch();
  const loadedInput = useSelector(state => state.input);
  const loadedUsers = useSelector(state => state.loadedUsers);
  const [ loading, setloading ] = useState(true);

  const headers = {
    Authorization: 'token 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',
  };

  const onFilter = async (input = '') => {
    
    const inputValueData = (loadedInput) => {
      dispatch({ type:"INPUT_VALUE", payload: loadedInput })
      if(loadedInput.length == 0) {
        dispatch({ type:"LOADED_USERS", payload: []})
      }
    }
    const loadedUsers = (users) => {
      dispatch({ type:"LOADED_USERS", payload: users});
    }

    const inputValue = input.target.value.toLowerCase();   
    inputValueData(inputValue);
    setloading(false)
    if(inputValue.length){
      await axios.get(
        `https://api.github.com/search/users?q=${inputValue}`,
        {
          headers,
        })
        .then((response) => loadedUsers(response.data.items)) 
      }
      setloading(true)
    }
    
  return(
      <Wrap>
        <InfoBlock>
          <div><Search placeholder='Search for User' onChange={onFilter} type="text" value={loadedInput}/></div>
          { loading == false && loadedInput != '' && <h1>loading...</h1>}
          { loading && 
            <div>
              { loadedUsers.map((user = {}, index) => {
                return (
                  <React.Fragment key={index}>
                    <StyledLink to={`/profile?login=${user.login}`}>
                      <User user={user}></User>
                    </StyledLink> 
                  </React.Fragment>
                  
              )})}
            </div>
          }
          { loadedInput == '' && <h1>Write something to search</h1> }
          { loadedInput != '' && loadedUsers.length == 0 && loading && <h1>Ooops, there are no users with that name</h1> }
        </InfoBlock>
      </Wrap>
  );
};