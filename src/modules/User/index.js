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
        .get(`https://api.github.com/users/${login}/repos`, {
          headers,
        })
        .then((response) => {
          const repo = response.data;
          setUserInfo(repo);
          const user = [{ login: login, repo: repo }];
          if (loadedRepos.length < 60) {
            dispatch({ type: 'LOADED_REPO', payload: user });
          }
        });
    } else {
      if (loadedRepos.length > 0) {
        var repo;
        for (var i = 0; i < loadedRepos.length; i++) {
          if (loadedRepos[i].login == login) {
            setUserInfo(loadedRepos[i].repo);
            break;
          }
        }
      }
    }
  };

  useEffect(() => {
    getFullData();
  }, []);

  return (
    <Wrap>
      <Wrapper>
        <Icon src={avatar_url} />
        <Name>{login}</Name>
      </Wrapper>
      <Repos>Repos: {userInfo.length}</Repos>
    </Wrap>
  );
};
