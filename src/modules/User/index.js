import { Icon, Name, Repos, Wrap, Wrapper } from './style';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

export const User = ({ user }) => {
  const dispatch = useDispatch();
  const loadedRepos = useSelector((state) => state.allData);
  const [userInfo, setUserInfo] = useState([]);
  const { login = '', avatar_url = '' } = user;

  const headers = {
    Authorization: 'token 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',
  };

  const getFullData = () => {
    if (loadedRepos.length == 0) {
      axios
        .get(`https://api.github.com/users/${login}`, {
          headers,
        })
        .then((response) => {
          const repo = response.data;

          setUserInfo(repo);

          const user = [{ login, repo }];

          if (loadedRepos.length < 60) {
            dispatch({ type: 'LOADED_REPO', payload: user });
          }
        });
    } else if (loadedRepos.length > 0) {
        const repo = loadedRepos.find((repo => repo.login === login)?.repo)
        
        setUserInfo(repo)
      }
  };

  const { public_repos = '' } = userInfo;
  useEffect(() => {
    getFullData();
  }, []);

  return (
    <Wrap>
      <Wrapper>
        <Icon src={avatar_url} />
        <Name>{login}</Name>
      </Wrapper>
      <Repos>Repos: {public_repos}</Repos>
    </Wrap>
  );
};
