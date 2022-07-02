import { Icon, Name, Repos, Wrap, Wrapper } from './style';
import { useState, useEffect } from 'react';
import axios from 'axios';



export const User = ({ user, onUserClicked }) => {
  const [ userInfo , setUserInfo ] = useState([]);
  const { login = '', avatar_url = '',  } = user;
  const headers = {
    Authorization: 'token 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',
  };

  const getFullData = async () => {
    await axios
      .get(
        `https://api.github.com/users/${login}/repos`,
        {
          headers,
        }
        )
      .then((response) => setUserInfo(response.data))
  }

  useEffect(() => {
    getFullData();
  });

  return(
      <Wrap onClick={onUserClicked}>
        <Wrapper>
          <Icon src={avatar_url}/>
          <Name>{login}</Name>
        </Wrapper>
        <Repos>Repos: {userInfo.length}</Repos>
      </Wrap>
  );
};