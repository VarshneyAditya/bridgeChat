import { lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const ChatPage = lazy(() => import('src/pages/chat'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const isAuthenticated = JSON.parse(localStorage.getItem('userData'))?.name;

  return (
    <Routes>
      {/* Protected routes */}
      <Route
        index
        path="/"
        element={
          isAuthenticated ? (
            <DashboardLayout>
              <IndexPage />
            </DashboardLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="user"
        element={
          isAuthenticated ? (
            <DashboardLayout>
              <UserPage />
            </DashboardLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="chat"
        element={
          isAuthenticated ? (
            <DashboardLayout>
              <ChatPage />
            </DashboardLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* Public routes */}
      <Route path="login" element={<LoginPage />} />
      <Route path="404" element={<Page404 />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
