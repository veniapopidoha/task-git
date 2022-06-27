import axios from 'axios';
import { useState, useEffect } from 'react';
import { User } from '../User';
import { Profile } from '../Profile';
// Styles
import { Wrap, InfoBlock, Search } from './style';

const additionalUserDataKeys = [
  'followers_url',
  'subscriptions_url',
  'organizations_url',
  'repos_url',
  'received_events_url',
];

export const MainPage = () => {

  const [ users , setUsers ] = useState([]);
  const [ filteredUsers , setFilteredUsers ] = useState([]);
  const [ currentUser , setCurrentUser ] = useState(null);
  

  const getAllData = () => {
    return axios.get('https://api.github.com/users')
    .then((response) => setUsers(response.data))
    .catch(error => console.error("Error: " + error))
  }
  
  useEffect(() => {
    getAllData();
  }, []);

  const loadUser = (user) => async () => {
      const response = await axios
        .get(`https://api.github.com/users/${user.login}`)
        .then((res) => res.data)
      const additinalDataRequests = additionalUserDataKeys.map((k) => {
        return axios
          .get(response[k])
          .then((res) => res.data)
          .catch((_) => null);
      });
      const additionalUserData = await Promise.all(additinalDataRequests);
      const dataWithKeys = additionalUserDataKeys.reduce((acc, key, index) => {
        const keyName = key.replace('_url', '');
        return { ...acc, [keyName]: additionalUserData[index] };
      }, {});
      axios
        .get(`https://api.github.com/users/${user.login}`)
        .then((res) => {
          const info = res.data;
          const currentUserInfo = {
            info,
            dataWithKeys,
          }
          setCurrentUser(currentUserInfo)
        })
  }

  const onFilter = (input = '') => {
    const inputValue = input.target.value.toLowerCase();
    if (inputValue.length) {
      setFilteredUsers(users.filter(
        u => u.login.toLowerCase().includes(inputValue))
      );
    }
  }
  
  return(
    <Wrap>
      <InfoBlock>
        <div><Search placeholder='Search for User' onChange={onFilter} type="text"/></div>
        { filteredUsers && filteredUsers.length ? filteredUsers.map((user = {}, index) => {
          return <User onUserClicked={loadUser(user)} key={index} user={user}></User>
        }) :
        users.map((user = {}, index) => {
          return <User onUserClicked={loadUser(user)} key={index} user={user}></User>
        }) };
      </InfoBlock>
      <InfoBlock>
        {currentUser ?
         <Profile profileData={currentUser} />
         : ''}
      </InfoBlock>
    </Wrap>
  );
};