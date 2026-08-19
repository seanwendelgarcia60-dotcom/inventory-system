import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ProductList from './pages/ProductList';
import PrivateRoute from './components/PrivateRoute';

function Placeholder({ text }) {
  return <h2 style={{ padding: 24 }}>{text}</h2>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <ProductList />
            </PrivateRoute>
          }
        />
        <Route
          path="/report"
          element={
            <PrivateRoute>
              <Placeholder text="Report page coming next" />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}