import { Repo } from '../Repo';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Back, Bio, Block, RepoBlock, Row, Search, Wrap } from './style';
import { useLocation, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

export const Profile = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [filteredRepo, setFilteredRepo] = useState([]);
  const [allRepo, setAllRepo] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingRepo, setLoadingRepo] = useState(true);
  const locationPage = useLocation();

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
    await axios
      .get(`https://api.github.com/users/${userLogin}/repos`, {
        headers,
      })
      .then((response) => setAllRepo(response.data));
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
    setInputValue(inputValue);
    setLoadingRepo(false);
    if (inputValue.length) {
      await axios
        .get(
          `https://api.github.com/search/repositories?q=user:${userLogin}+is:public+${inputValue}in:name`,
          {
            headers,
          }
        )
        .then((response) => setFilteredRepo(response.data.items))
        .catch((error) => console.error('Error: ' + error));
      setLoadingRepo(true);
    }
    if (inputValue == '') {
      setFilteredRepo(allRepo);
      setLoadingRepo(true);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

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
            debounceTimeout={800}
            placeholder='Search for Repositories'
            onChange={onFilter}
            type='text'
          />
        </div>
        {loadingRepo == false && <h2>Loading...</h2>}
        {loadingRepo && filteredRepo.length
          ? filteredRepo.map((repo = {}, index) => {
              return <Repo key={index} repo={repo}></Repo>;
            })
          : loadingRepo &&
            inputValue.length == 0 &&
            allRepo.map((repo = {}, index) => {
              return <Repo key={index} repo={repo}></Repo>;
            })}
        {loading && loadingRepo && filteredRepo == 0 && (
          <h2>There are no such repositories(</h2>
        )}
      </RepoBlock>
    </Wrap>
  );
};
