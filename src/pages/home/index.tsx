import ConditionalRender from '@/components/conditionalRender';

export default function HomePage() {
  return (
    <div className="container">
      <h1 className="title">TicTacTional</h1>
      <ConditionalRender />
    </div>
  );
}
