import './App.css';
import Router from './router'
import { setUserInfo, setToken } from './pages/system/lib/system'
import { ReactNode } from 'react';
const App = () => {
  let userInfo = localStorage.getItem("userInfo");
  let token = localStorage.getItem("token")
  if (userInfo)
    setUserInfo(JSON.parse(userInfo));
  if (token)
    setToken({ token: token });
  return <Router />
}

export default App;

