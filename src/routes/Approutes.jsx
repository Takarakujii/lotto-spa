import { Routes, Route } from 'react-router'; // Correct import
import SignIn from '../components/login'; // Updated to use login.jsx
import SignUp from '../components/createAccount'; // Ensure this path is correct
import NotFound from '../pages/NotFound';
import Landing from '../components/LandingPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Landing />} />
    </Routes>
  );
};

export default AppRoutes;
