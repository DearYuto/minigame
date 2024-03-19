type Props = {
  children: React.ReactNode;
};

export default function Row({ children }: Props) {
  return <tr className="tr">{children}</tr>;
}
