import { Profile } from '../Profile';
import { Icon, Name, Repos, StyledLink, Wrap, Wrapper } from './style';


export const User = ({ data }) => {
  const { login = '', avatar_url = '', repos_url = '' } = data; 
  return(
    <StyledLink to="/profile">
      {/* <Profile data={data}/> */}
      <Wrap>
        <Wrapper>
          <Icon src={avatar_url}/>
          <Name>{login}</Name>
        </Wrapper>
        <Repos>Repos: </Repos>
      </Wrap>
    </StyledLink>
  );
};