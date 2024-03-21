// 클릭했을 때 마킹 - 이미 선택된 상태라면 불가능
// 클릭 이벤트 -> 버블링 사용해서 한번에 컨트롤 하는 게 나을 것 같긴한데 일단 구현 후 생각

type Props = {
  children?: React.ReactNode;
  id: string;
};

export default function Cell({ children, id }: Props) {
  return (
    <td id={id} className="cell">
      {children}
    </td>
  );
}
