import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from '@/components/ui/toaster';
import { useAuth } from '@/hooks/useAuth';
import Home from '@/pages/Home';
import Templates from '@/pages/Templates';
import Workflows from '@/pages/Workflows';
import AIEngine from '@/pages/AIEngine';
import Pricing from '@/pages/Pricing';
import Account from '@/pages/Account';
import Login from '@/pages/Login';
import SignUp from '@/pages/SignUp';
import WorkflowVisualBuilder from '@/pages/WorkflowVisualBuilder';

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/templates" element={<ProtectedRoute><Templates /></ProtectedRoute>} />
          <Route path="/workflows" element={<ProtectedRoute><Workflows /></ProtectedRoute>} />
          <Route path="/ai-engine" element={<ProtectedRoute><AIEngine /></ProtectedRoute>} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/workflow-builder" element={<ProtectedRoute><WorkflowVisualBuilder /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
