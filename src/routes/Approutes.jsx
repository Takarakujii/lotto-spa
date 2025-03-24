import { Routes, Route } from 'react-router';
import SignIn from '../pages/login'; 
import SignUp from '../pages/createAccount'; 
import NotFound from '../pages/NotFound';
import Landing from '../pages/LandingPage';
import DrawPage from '../pages/DrawPage';
import AccountProfilePage from '../pages/AccountProfile';
import History from '../pages/DrawHistoryPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<DrawPage />} />
      <Route path="/profile" element={<AccountProfilePage/>} />
      <Route path="/history" element={<History/>} />
    </Routes>
  );
};

export default AppRoutes;