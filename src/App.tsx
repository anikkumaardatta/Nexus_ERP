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
import GeneralSettings from './pages/settings/GeneralSettings';
import WebsiteSettings from './pages/settings/WebsiteSettings';
import MaintenancePage from './pages/settings/MaintenancePage';
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
          <Route path="/orders/new" element={<Orders />} />
          <Route path="/orders/bulk" element={<Orders />} />
          <Route path="/inventory" element={<Navigate to="/inventory/products" replace />} />
          <Route path="/inventory/products" element={<Products />} />
          <Route path="/inventory/suppliers" element={<Products />} />
          <Route path="/inventory/adjustment" element={<Products />} />
          <Route path="/pos" element={<POS />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/reports" element={<Navigate to="/reports/summary" replace />} />
          <Route path="/reports/summary" element={<Reports />} />
          <Route path="/reports/sales" element={<Reports />} />
          <Route path="/reports/returns" element={<Reports />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/settings" element={<Settings />}>
            <Route index element={<Navigate to="general" replace />} />
            <Route path="general" element={<GeneralSettings />} />
            <Route path="website" element={<WebsiteSettings />} />
            <Route path="courier" element={<Courier />} />
            <Route path="sms" element={<MaintenancePage title="SMS Gateway" />} />
            <Route path="email" element={<MaintenancePage title="Email Configuration" />} />
            <Route path="import" element={<MaintenancePage title="Data Import" />} />
            <Route path="categories" element={<MaintenancePage title="Categories" />} />
            <Route path="attributes" element={<MaintenancePage title="Attributes" />} />
          </Route>
          <Route path="/team" element={<Team />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/support" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

