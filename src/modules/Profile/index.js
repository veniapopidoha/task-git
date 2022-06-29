import { Repo } from '../Repo';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Bio, Block, RepoBlock, Row, Search, Wrap } from './style';
import { useLocation } from 'react-router';


export const Profile = () => {

  
  const [ currentUser , setCurrentUser ] = useState({});
  const [ repository, setRepository ] = useState({});
  const locationPage = useLocation();
  
  const userLogin = new URLSearchParams(locationPage.search).get("login");
  
  const loadUser = () => {
    axios
    .get(`https://api.github.com/users/${userLogin}`)
    .then((res) => setCurrentUser(res.data))
    axios
    .get(`https://api.github.com/users/${userLogin}/repos`)
    .then((res) => setRepository(res.data))
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
  
  const onFilter = (input = '') => {
    const inputValue = input.target.value.toLowerCase();
    if(inputValue.length) {
      axios.get(`https://api.github.com/search/repositories?q=user:${userLogin}+${inputValue}+in:name`)
      .then((response) => setRepository(response.data.items))
      .catch(error => console.error("Error: " + error))
    }
  }

  
  useEffect(() => {
    loadUser();
  }, []);

  return(
    <Wrap>
      <Row>
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
      <Bio>{bio}</Bio>
      <RepoBlock>
        <div><Search placeholder='Search for Repositories' onChange={onFilter} type="text"/></div>
          {currentUserInfo.repository.map((repo = {}, index) => {
            return <Repo key={index} repo={repo}></Repo>
          }) };
          { repository.length == 0 && <h2>Такий репозиторій не існує</h2>}
      </RepoBlock>
    </Wrap>
  );
}