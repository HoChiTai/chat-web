'use client';

import MessagePage from '@/components/MessagePage';
import Login from '@Components/Login';
import { getUserDataStore } from '@Utils/store';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [isLogin, setIsLogin] = useState<number>(0);

  useEffect(() => {
    if (getUserDataStore()) setIsLogin(1);
    else setIsLogin(2);
  }, []);

  return !!isLogin && (isLogin == 1 ? <MessagePage /> : <Login />);
}
