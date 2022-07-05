import { Icon, Name, Repos, Wrap, Wrapper } from './style';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

export const User = ({ user, onUserClicked }) => {
  const dispatch = useDispatch();
  const loadedRepos = useSelector((state) => state.allData);
  const [userInfo, setUserInfo] = useState([]);
  const { login = '', avatar_url = '' } = user;
  const headers = {
    Authorization: 'token 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',
  };

  const getFullData = () => {
    axios
      .get(`https://api.github.com/users/${login}/repos`, {
        headers,
      })
      .then((response) => {
        const repo = response.data;
        const user = [{ login: login, repo: repo }];
        setUserInfo(repo);
        if (loadedRepos.length < 60) {
          dispatch({ type: 'LOADED_REPO', payload: user });
        }
      });
  };

  useEffect(() => {
    getFullData();
  }, []);

  return (
    <Wrap onClick={onUserClicked}>
      <Wrapper>
        <Icon src={avatar_url} />
        <Name>{login}</Name>
      </Wrapper>
      <Repos>Repos: {userInfo.length}</Repos>
    </Wrap>
  );
};
