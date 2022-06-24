import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid black;
  padding: 15px;
  cursor: pointer;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const Icon = styled.img`
  width: 50px;
  height: 50px;
`;

export const Name = styled.h1`
  padding: 10px 20px;
`; 

export const Repos = styled.h1`
  font-size: 17px;
  
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  width: 80%;
  color: #000;
`;