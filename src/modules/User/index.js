import { Icon, Name, Repos, Wrap, Wrapper } from './style';
import { useState, useEffect } from 'react';
import axios from 'axios';



export const User = ({ user, onUserClicked }) => {
  const [ userInfo , setUserInfo ] = useState([]);
  const { login = '', avatar_url = '' } = user;

  const getFullData = () => {
    axios
      .get(`https://api.github.com/users/${user.login}`)
      .then((response) => setUserInfo(response.data))
  }

  useEffect(() => {
    getFullData();
  }, []);

  return(
      <Wrap onClick={onUserClicked}>
        <Wrapper>
          <Icon src={avatar_url}/>
          <Name>{login}</Name>
        </Wrapper>
        <Repos>Repos: {userInfo.public_repos}</Repos>
      </Wrap>
  );
};