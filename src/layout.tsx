import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HomePage from './pages/home';

import '@/styles/main.css';

function Layout() {
  return (
    <div className="layout">
      <ToastContainer limit={5} autoClose={2_000} />
      <section className="container">
        <h1 className="title">TicTackTional</h1>
        <HomePage />
      </section>
    </div>
  );
}

export default Layout;
