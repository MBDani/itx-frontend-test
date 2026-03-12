import { Routes, Route } from 'react-router-dom';
import { BaseLayout } from '@/components/layout/BaseLayout';
import { ProductListPage } from '@/pages/ProductListPage';
import { ProductDetailsPage } from '@/pages/ProductDetailsPage';

function App() {
  return (
    <Routes>
      <Route element={<BaseLayout />}>
        {/* The index route matches "/" */}
        <Route index element={<ProductListPage />} />
        {/* Dynamic route matching "/product/:id" */}
        <Route path="product/:id" element={<ProductDetailsPage />} />
        {/* Fallback route for 404s pointing to home in an SPA context */}
        <Route path="*" element={<ProductListPage />} />
      </Route>
    </Routes>
  );
}

export default App;
