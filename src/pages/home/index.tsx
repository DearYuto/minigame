import './styles/home.css';

import ConditionalRender from '@/components/conditionalRender';

export default function HomePage() {
  return (
    <div className="container">
      <h1 className="title">TicTackTional</h1>
      <ConditionalRender />
    </div>
  );
}
