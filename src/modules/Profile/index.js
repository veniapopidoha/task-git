import { Repo } from '../Repo';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Back, Bio, Block, RepoBlock, Row, Search, Wrap } from './style';
import { useLocation, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

export const Profile = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [filteredRepo, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRepo, setLoadingRepo] = useState(true);
  const locationPage = useLocation();
  const loadedRepos = useSelector((state) => state.allData);

  const navigate = useNavigate();

  const userLogin = new URLSearchParams(locationPage.search).get('login');

  const headers = {
    Authorization: 'token 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',
  };

  const loadUser = async () => {
    setLoading(false);
    await axios
      .get(`https://api.github.com/users/${userLogin}`, {
        headers,
      })
      .then((res) => setCurrentUser(res.data));
    setLoading(true);
  };


  const {
    avatar_url = '',
    login = '',
    email = '',
    location = '',
    created_at = '',
    followers = '',
    following = '',
    bio = '',
  } = currentUser;

  const onFilter = async (input = '') => {
    const inputValue = input.target.value.toLowerCase();
    if (inputValue.length) {
      setFilteredUsers(
        repo.filter((u) => u.name.toLowerCase().includes(inputValue))
      );
    }
    setLoadingRepo(true);
  };

  useEffect(() => {
    loadUser();
  }, []);

  var repo;
  for (var i = 0; i < loadedRepos.length; i++) {
    if (loadedRepos[i].login == userLogin) {
      repo = loadedRepos[i].repo;
      break;
    }
  }

  return (
    <Wrap>
      <Back onClick={() => navigate(-1)}>Go Back</Back>
      {loading == false && <h2>Loading...</h2>}
      {loading && (
        <Row>
          <div>
            <img src={avatar_url} width='200px' />
          </div>
          <Block>
            <p>{login}</p>
            <p>{email}</p>
            <p>{location}</p>
            <p>{created_at.split('T')[0]}</p>
            <p>{followers} Followers</p>
            <p>Followings: {following}</p>
          </Block>
        </Row>
      )}
      <Bio>{bio}</Bio>
      <RepoBlock>
        <div>
          <Search
            minLength={1}
            debounceTimeout={500}
            placeholder='Search for Repositories'
            onChange={onFilter}
            type='text'
          />
        </div>
        {loadingRepo == false && <h2>Loading...</h2>}
        {filteredRepo && filteredRepo.length
          ? filteredRepo.map((repo = {}, index) => {
              return <Repo key={index} repo={repo}></Repo>;
            })
          : repo.map((repo = {}, index) => {
              return <Repo key={index} repo={repo}></Repo>;
            })}
        {repo.length == 0 && <h2>There are no such repositories(</h2>}
      </RepoBlock>
    </Wrap>
  );
};
