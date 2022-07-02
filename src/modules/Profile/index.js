import { Repo } from '../Repo';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Back, Bio, Block, RepoBlock, Row, Search, Wrap } from './style';
import { useLocation, useNavigate } from 'react-router';


export const Profile = () => {

  
  const [ currentUser , setCurrentUser ] = useState({});
  const [ repository, setRepository ] = useState({});
  const [ loading, setLoading ] = useState(true);
  const [ loadingRepo, setLoadingRepo ] = useState(true);
  const locationPage = useLocation();
  const navigate = useNavigate();
  
  const userLogin = new URLSearchParams(locationPage.search).get("login");

  const headers = {
    Authorization: 'token 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',
  };
  
  const loadUser = async () => {
    setLoading(false)
    await axios
    .get(
      `https://api.github.com/users/${userLogin}`,
       {
         headers,
       }
      )
    .then((res) => setCurrentUser(res.data))
    axios
    .get(
      `https://api.github.com/users/${userLogin}/repos`,
      {
        headers,
      }
      )
    .then((res) => setRepository(res.data))
    setLoading(true)
  }

  const currentUserInfo = {
    repository: Array.from(repository),
    currentUser: currentUser,
  }
  
  const { avatar_url = '', 
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
    if(inputValue.length) {
      setLoadingRepo(false)
      await axios.get(
        `https://api.github.com/search/repositories?q=user:${userLogin}+${inputValue}+in:name`,
        {
          headers,
        },
      )
      .then((response) => setRepository(response.data.items))
      .catch(error => console.error("Error: " + error))
    }
    if(inputValue.length == 0) {
      setLoadingRepo(false)
      await axios.get(
        `https://api.github.com/search/repositories?q=user:${userLogin}`,
        {
          headers,
        },
        )
        .then((response) => setRepository(response.data.items))
        .catch(error => console.error("Error: " + error))
      }
      setLoadingRepo(true)
  }

  
  useEffect(() => {
    loadUser();
  }, []);

  return(
    <Wrap>
      <Back onClick={() => navigate(-1)} >Go Back</Back>
      {loading == false && <h2>Loading...</h2>}
      {loading && <Row>
          <div>
            <img src={avatar_url} width='200px'/>
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
      }
      <Bio>{bio}</Bio>
      <RepoBlock>
        <div><Search placeholder='Search for Repositories' onChange={onFilter} type="text"/></div>
          { loadingRepo == false && <h2>Loading...</h2>}
          { loadingRepo && currentUserInfo.repository.map((repo = {}, index) => {
            return <Repo key={index} repo={repo}></Repo>
          }) };
          { repository.length == 0 && <h2>There are no such repositories(</h2>}
      </RepoBlock>
    </Wrap>
  );
}