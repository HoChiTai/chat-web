import MessagePage from '@/components/MessagePage';
import Login from '@Components/Login';

export default function Home() {
  const isLogin: boolean = true;

  return isLogin ? <MessagePage /> : <Login />;
}
