import { DebounceInput } from 'react-debounce-input';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

export const InfoBlock = styled.div`
  flex: 1 0 50%;
  white-space: nowrap;
  text-align: center;
  padding: 10px;
  box-sizing: border-box;
`;

export const Search = styled(DebounceInput)`
  margin: 20px;
  width: 70%;
  height: 30px;
`;

export const StyledLink = styled(Link)`
  color: #000;
  text-decoration: 0;
`;
