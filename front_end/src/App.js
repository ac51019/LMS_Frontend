import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/login';
import Register from './pages/auth/register'
import Course from './pages/course/course';
import Courses from './pages/course/Courses';
import Profile from './pages/profile/profile';
import Learnings from './pages/learning/learnings';
import Home from './pages/landing/Home';
import DUsers from './pages/dashBoard/DUsers';
import DCourses from './pages/dashBoard/DCourses';
import Assessment from './pages/assessment/Assessment';
import ErrorPage from './pages/error/ErrorPage';
import AddQuestions from './pages/dashBoard/AddQuestions';
import Performance from './pages/profile/Performance';
import Certificate from './pages/assessment/certificate';
import Forum from './pages/course/forum';
import AdminDashboard from './pages/dashBoard/AdminDashboard';
import InstructorDashboard from './pages/dashBoard/InstructorDashboard';
import VendorDashboard from './pages/dashBoard/VendorDashboard';
import StudentDashboard from './pages/dashBoard/StudentDashboard';
import React, { useEffect } from 'react';
import ProtectedRoute from './Components/ProtectedRoute';
import Cart from './pages/cart/Cart';
import { useDispatch } from 'react-redux';
import { initTheme } from './redux/slices/themeSlice';
import ChatSupport from './Components/common/ChatSupport';
import HelpCenter from './pages/legal/HelpCenter';
import TermsOfService from './pages/legal/TermsOfService';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import RefundPolicy from './pages/legal/RefundPolicy';
import SiteMap from './pages/legal/SiteMap';
import BlogHome from './pages/blog/BlogHome';
import BlogCategory from './pages/blog/BlogCategory';
import BlogPost from './pages/blog/BlogPost';
import AuthorProfile from './pages/blog/AuthorProfile';
import CreateBlog from './pages/blog/CreateBlog';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initTheme());
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/addquestions/:id" element={<AddQuestions />} />
          <Route path='/admin' element={<ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']}><AdminDashboard /></ProtectedRoute>} />
          <Route path='/instructor' element={<ProtectedRoute allowedRoles={['ROLE_INSTRUCTOR', 'ROLE_ADMIN', 'ROLE_SUPER_ADMIN']}><InstructorDashboard /></ProtectedRoute>} />
          <Route path='/vendor' element={<ProtectedRoute allowedRoles={['ROLE_VENDOR', 'ROLE_ADMIN', 'ROLE_SUPER_ADMIN']}><VendorDashboard /></ProtectedRoute>} />
          <Route path='/student' element={<ProtectedRoute allowedRoles={['ROLE_STUDENT']}><StudentDashboard /></ProtectedRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Home />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/course/:id' element={<Course />} />
          <Route path='/discussion/:id' element={<ProtectedRoute allowedRoles={['ROLE_STUDENT', 'ROLE_INSTRUCTOR', 'ROLE_ADMIN', 'ROLE_SUPER_ADMIN']}><Forum /></ProtectedRoute>} />
          <Route path='/certificate/:courseId' element={<ProtectedRoute allowedRoles={['ROLE_STUDENT', 'ROLE_INSTRUCTOR']}><Certificate /></ProtectedRoute>} />
          <Route path='/assessment/:id' element={<ProtectedRoute allowedRoles={['ROLE_STUDENT']}><Assessment /></ProtectedRoute>} />
          <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path='/Learnings' element={<ProtectedRoute allowedRoles={['ROLE_STUDENT']}><Learnings /></ProtectedRoute>} />
          <Route path='/Dcourses' element={<ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_SUPER_ADMIN', 'ROLE_INSTRUCTOR']}><DCourses /></ProtectedRoute>} />
          <Route path='/Dusers' element={<ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']}><DUsers /></ProtectedRoute>} />
          <Route path='/Performance' Component={Performance} />
          <Route path='*' Component={ErrorPage}></Route>
          <Route path='/help-center' element={<HelpCenter />} />
          <Route path='/terms' element={<TermsOfService />} />
          <Route path='/privacy' element={<PrivacyPolicy />} />
          <Route path='/refund' element={<RefundPolicy />} />
          <Route path='/sitemap' element={<SiteMap />} />
          <Route path='/blog' element={<BlogHome />} />
          <Route path='/blog/category/:categorySlug' element={<BlogCategory />} />
          <Route path='/blog/:slug' element={<BlogPost />} />
          <Route path='/blog/create' element={<ProtectedRoute allowedRoles={['ROLE_STUDENT', 'ROLE_INSTRUCTOR', 'ROLE_VENDOR', 'ROLE_ADMIN', 'ROLE_SUPER_ADMIN']}><CreateBlog /></ProtectedRoute>} />
          <Route path='/author/:authorId' element={<AuthorProfile />} />
        </Routes>
        <ChatSupport />
      </BrowserRouter>
    </div>
  );
}

export default App;
