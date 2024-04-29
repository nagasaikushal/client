import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import SignIn from './pages/Signin';
import ResponsiveAppBar1 from './pages/Navbar';
import Error from './pages/Error';
import Contact from './pages/Contact';
import Logout from './pages/Logout';
import Places from './pages/Places';
import AdminLayout from './components/layouts/Admin-Layout';
import AdminUsers from './pages/Admin-Users';
import AdminContacts from './pages/Admin-Contacts';
import AdminUpdate from './pages/AdminUpdate';
import TermsAndConditions from './pages/TermsAndConditions';
import Loading from './pages/Loading';
import AdminPlaces from './pages/Admin-Places';
import OtpMail from './components/OtpMail';
import VerifyOtp from './components/VerifyOtp';
import ChangePassword from './components/ChangePassword';

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar1 />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path="/Signin" element={<SignIn />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/Logout' element={<Logout />} />
        <Route path="/Places" element={<Places />} />
        <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
        <Route path="/Loading" element={<Loading />} />
        <Route path='/OtpMail' element={<OtpMail />} />
        <Route path='/VerifyOtp' element={<VerifyOtp />} />
        <Route path='/ChangePassword' element={<ChangePassword />} />
        <Route path="/*" element={<Error />} />
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="AdminUsers" element={<AdminUsers />} />
          <Route path="AdminContacts" element={<AdminContacts />} />
          <Route path="users/:id/edit" element={<AdminUpdate />} />
          <Route path="AdminPlaces/add" element={<AdminPlaces />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
