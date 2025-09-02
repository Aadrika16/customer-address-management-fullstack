import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerList from './components/CustomerListPage';
import CustomerFormPage from './components/CustomerFormPage';
import CustomerDetailsPage from './components/CustomerDetailPage';
import AddressForm from './components/AddressFormPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CustomerList />} />
        <Route path="/customers/new" element={<CustomerFormPage />} />
        <Route path="/customers/edit/:id" element={<CustomerFormPage />} />
        <Route path="/customers/:id" element={<CustomerDetailsPage />} />
        <Route path="/customers/:customerId/addresses/new" element={<AddressForm />} />
        <Route path="/customers/:customerId/addresses/:addressId/edit" element={<AddressForm />} />
      </Routes>
    </Router>
  );
}

export default App;
