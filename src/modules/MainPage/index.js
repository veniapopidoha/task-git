import axios from 'axios';
import { useState, useEffect, setState } from 'react';
import { User } from '../User';

// Styles
import { Wrap } from './style';

export const MainPage = () => {

  const [ users , setUsers ] = useState({
    user: [],
  });
  

  const getallData = () => {
    axios.get('https://api.github.com/users')
    .then((response) => {
      users.user = response.data;
      setUsers({ user: users.user})
      console.log(users.user)})
    .catch(error => console.error("Error: " + error))
  }
  
  useEffect(() => {
    getallData();
  }, []);

  console.log("Data - " + users.user);

  
  return(
    <Wrap>
      {users.user.map((data = {}) => {
        return <User data={data}/>
      })};
    </Wrap>
  );
};