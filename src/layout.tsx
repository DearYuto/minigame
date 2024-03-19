import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HomePage from './pages/home';
import GameProvider from './store/contextAPI/GameProvider';

import '@/styles/main.css';

function Layout() {
  return (
    <div className="layout">
      <ToastContainer limit={5} autoClose={2_000} />
      <GameProvider>
        <section className="container">
          <h1 className="title">TicTackTional</h1>
          <HomePage />
        </section>
      </GameProvider>
    </div>
  );
}

export default Layout;
