import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "../components/login"; // Updated to use login.jsx
import SignUp from "../components/createAccount"; // Ensure this path is correct
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;