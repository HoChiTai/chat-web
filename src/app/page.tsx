import MessengerPage from '@/components/MessengerPage';
import Login from '@Components/Login';

export default function Home() {
  const isLogin: boolean = true;

  return isLogin ? <MessengerPage /> : <Login />;
}
