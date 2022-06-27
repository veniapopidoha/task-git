import { Link, Name, Text, Wrap } from './style';


export const Repo = (repo) => {
  const { name = '', stargazers_count = '', forks = '', full_name = '' } = repo.repo; 
  console.log(repo)
  return(
    <Link href={'https://github.com/' + full_name} target="_blank">
      <Wrap>
        <Name>{name}</Name>
        <div>
          <Text>Stars: {stargazers_count}</Text>
          <Text>Forks: {forks}</Text>
        </div>
      </Wrap>
    </Link>
  );
};