type Props = {
  children?: React.ReactNode;
  id: string;
  style?: React.CSSProperties;
};

export default function Cell({ children, id, style }: Props) {
  return (
    <td style={style} id={id} className="cell">
      {children}
    </td>
  );
}
