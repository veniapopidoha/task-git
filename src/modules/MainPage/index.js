import axios from 'axios';
import React, { useState } from 'react';
import { User } from '../User';
// Styles
import { Wrap, InfoBlock, Search, StyledLink } from './style';
import { useDispatch, useSelector } from 'react-redux';

export const MainPage = () => {
  const dispatch = useDispatch();
  const loadedInput = useSelector((state) => state.input);
  const loadedUsers = useSelector((state) => state.loadedUsers);
  const [loading, setloading] = useState(true);
  const [isError, setIsError] = useState(false);

  const headers = {
    Authorization: 'token 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',
  };

  const onFilter = async (input = '') => {
    const inputValueData = (loadedInput) => {
      dispatch({ type: 'INPUT_VALUE', payload: loadedInput });
      if (loadedInput.length == 0) {
        dispatch({ type: 'LOADED_USERS', payload: [] });
      }
    };
    const loadedUsers = (users) => {
      dispatch({ type: 'LOADED_USERS', payload: users });
    };
    const checkError = (error) => {
      console.error('Error: ', error);
      if (error) {
        setIsError(true);
        console.log(isError);
      }
    };
    const inputValue = input.target.value.toLowerCase();
    inputValueData(inputValue);
    setloading(false);
    if (inputValue.length) {
      await axios
      .get(`https://api.github.com/search/users?q=${inputValue}`, {
        headers,
      })
      .then((response) => loadedUsers(response.data.items))
      .catch((error) => checkError(error));
    }
    setloading(true);
    dispatch({ type: 'RESET_REPO', payload: [] });
  };


  return (
    <Wrap>
      <InfoBlock>
        <div>
          <Search
            minLength={1}
            debounceTimeout={800}
            placeholder='Search for User'
            onChange={onFilter}
            type='text'
            value={loadedInput}
          />
        </div>
        {loading == false && loadedInput != '' && <h1>loading...</h1>}
        {loading && (
          <div>
            {loadedUsers.map((user = {}, index) => {
              return (
                <React.Fragment key={index}>
                  <StyledLink to={`/profile?login=${user.login}`}>
                    <User user={user}></User>
                  </StyledLink>
                </React.Fragment>
              );
            })}
          </div>
        )}
        {loadedInput == '' && <h1>Write something to search</h1>}
        {loadedInput != '' &&
          isError == false &&
          loadedUsers.length == 0 &&
          loading && <h1>Ooops, there are no users with that name</h1>}
        {isError == true && <h2>Something wrong with server conection</h2>}
      </InfoBlock>
    </Wrap>
  );
};
