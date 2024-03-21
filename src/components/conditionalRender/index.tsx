import { useContext } from 'react';

import Gameboard from '../gameboard';
import GameSetting from '../gameSetting';
import Main from '../main';
import Step from '../step';

import { GameValueContext } from '@/store/contextAPI/GameProvider';
import MainButton from '../mainButton';

export default function ConditionalRender() {
  const { gameStep } = useContext(GameValueContext);

  return (
    <>
      <Step shouldRender={gameStep === 'MAIN'}>
        <h1 className="title">TicTacTional</h1>
        <Main />
      </Step>

      <Step shouldRender={gameStep === 'GAME'}>
        <Gameboard />
      </Step>

      <Step shouldRender={gameStep === 'SETTING'}>
        <MainButton />
        <GameSetting />
      </Step>

      <Step shouldRender={gameStep === 'HISTORY'}>
        <></>
      </Step>
    </>
  );
}
