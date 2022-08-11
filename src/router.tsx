import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DefaultLayout } from './layouts/DefaultLayout';
import { CheckoutPage } from './pages/checkout';
import { Home } from './pages/home';
import { SuccessPaymentPage } from './pages/successPayment';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/success-payment" element={<SuccessPaymentPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
