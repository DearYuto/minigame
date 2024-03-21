import { useContext } from 'react';

import Gameboard from '../gameboard';
import GameSetting from '../gameSetting';
import Main from '../main';
import Step from '../step';

import { GameValueContext } from '@/store/contextAPI/GameProvider';

export default function ConditionalRender() {
  const { gameStep } = useContext(GameValueContext);

  return (
    <>
      <Step shouldRender={gameStep === 'MAIN'}>
        <Main />
      </Step>

      <Step shouldRender={gameStep === 'GAME'}>
        <Gameboard />
      </Step>

      <Step shouldRender={gameStep === 'SETTING'}>
        <GameSetting />
      </Step>

      <Step shouldRender={gameStep === 'HISTORY'}>
        <></>
      </Step>
    </>
  );
}
