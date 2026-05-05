/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Customers from './pages/Customers';
import Billing from './pages/Billing';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Courier from './pages/Courier';
import Team from './pages/Team';
import Invoice from './pages/Invoice';
import POS from './pages/POS';
import Reports from './pages/Reports';

export default function App() {
  const isAuthenticated = true; // Placeholder for auth logic

  if (!isAuthenticated) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/status/:status" element={<Orders />} />
          <Route path="/inventory/products" element={<Products />} />
          <Route path="/pos" element={<POS />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/reports/summary" element={<Reports />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/settings/general" element={<Settings />} />
          <Route path="/settings/courier" element={<Courier />} />
          <Route path="/team" element={<Team />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

