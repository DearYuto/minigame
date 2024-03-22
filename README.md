# 🎮 MINI GAME

크롬 브라우저(PC)에 최적화되어 있습니다.

<br/>

> **HOW TO GAME**

- 최대 2명의 플레이어가 즐길 수 있는 게임으로 가로, 세로, 대각선으로 이어진
  특정 플레이어 마킹 개수가 승리 조건에 먼저 도달한 플레이어가 승리하는 게임입니다.
- 모든 칸이 마킹되었으나, 승리 조건에 도달한 플레이어가 없다면 무승부입니다.

<br/>

> **게임 주의사항**

- 모든 플레이어는 동일한 문양이면서 동일한 컬러는 선택할 수 없습니다.
- 15초 내에 마킹할 위치를 선택하지 않으면 비어있는 랜덤한 위치에 마킹이 되며 상대방의 턴으로 넘어갑니다.
- 각 플레이어는 최대 3번의 무르기를 사용할 수 있습니다.
- 게임 기록 저장은 가장 최근 플레이한 게임 중 저장한 게임만 확인할 수 있습니다.

<br/>

> **프로젝트 실행 방법**

```
yarn && yarn dev
```

<br/>

## 💎 사용 기술 스택

<img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-round&logo=Typescript&logoColor=white"/> <img src="https://img.shields.io/badge/React-6EC0EB?style=flat-round&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-round&logo=CSS3&logoColor=white"/>

<br/>

## 💎 버전 정보

```
├── @radix-ui/react-icons@1.3.0
├── @types/react-dom@18.2.22
├── @types/react@18.2.67
├── @typescript-eslint/eslint-plugin@7.3.1
├── @typescript-eslint/parser@7.3.1
├── @vitejs/plugin-react@4.2.1
├── eslint-plugin-react-hooks@4.6.0
├── eslint-plugin-react-refresh@0.4.6
├── eslint@8.57.0
├── react-dom@18.2.0
├── react-toastify@10.0.5
├── react@18.2.0
├── typescript@5.4.2
└── vite@5.1.6

```

<br/>

## 💎 폴더 구조

```
├─components
│  ├─conditionalRender
│  ├─gameboard
│  │  ├─styles
│  │  └─utils
│  ├─gameHistory
│  │  └─styles
│  ├─gameResult
│  │  └─styles
│  ├─gameSetting
│  │  ├─hooks
│  │  ├─styles
│  │  └─utils
│  ├─gameTimer
│  │  ├─hooks
│  │  └─styles
│  ├─main
│  ├─mainButton
│  ├─player
│  │  ├─constants
│  │  ├─styles
│  │  └─types
│  └─step
├─constants
├─pages
│  └─home
├─store
│  └─contextAPI
│      ├─state
│      └─types
└─styles
```
