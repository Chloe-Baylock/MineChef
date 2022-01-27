import { useParams } from 'react-router-dom';
import Profile from './Profile/Profile';

function User() {
  const { userId } = useParams();
  return (
    <Profile profileForId={userId}/>
  );
}
export default User;
