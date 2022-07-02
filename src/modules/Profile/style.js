import styled from 'styled-components';

export const Wrap = styled.div`
  flex: 1 0 50%;
  white-space: nowrap;
  text-align: center;
  padding: 10px;
  margin-top: 10vh;
  box-sizing: border-box;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;

  p {
    font-weight: 700;
    margin: 3px;
  }
`;

export const Bio = styled.p`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Search = styled.input`
  margin: 20px;
  width: 70%;
  height: 30px;
  top: 20px;
`;

export const RepoBlock = styled.div`
  max-height: 500px;
  overflow: scroll;
`;

export const Back = styled.button`
  position: absolute;
  top: 40px;
  left: 40px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  text-decoration: underline;
`;