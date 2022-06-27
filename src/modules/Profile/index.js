import { Repo } from '../Repo';
import { useState } from 'react';
import { Bio, Block, RepoBlock, Row, Search, Wrap } from './style';

export const Profile = ({ profileData }) => {
  console.log('profileData - ', profileData);

  const { avatar_url = '', 
          login = '', 
          email = '', 
          location = '', 
          created_at = '',
          followers = '',
          following = '',
          bio = ''
        } = profileData.info;
        
  const repositories  = profileData.dataWithKeys.repos;

  const [ filteredRepo , setFilteredUsers ] = useState([]);

  const onFilter = (input = '') => {
    const inputValue = input.target.value.toLowerCase();
    if (inputValue.length) {
      setFilteredUsers(repositories.filter(
        u => u.name.toLowerCase().includes(inputValue))
      );
    }
  }
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
          { filteredRepo && filteredRepo.length ? filteredRepo.map((repo = {}, index) => {
            return <Repo key={index} repo={repo}></Repo>
          }) :
          repositories.map((repo = {}, index) => {
            return <Repo key={index} repo={repo}></Repo>
          }) };
      </RepoBlock>
    </Wrap>
  );
}