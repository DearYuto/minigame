import { useState } from 'react';

import './styles/home.css';

import GameSetting from '@/components/gameSetting';
import Gameboard from '@/components/gameboard';
import Main from '@/components/main';
import Step from '@/components/step';

type Step = 'MAIN' | 'SETTING' | 'GAME' | 'HISTORY';

export default function HomePage() {
  const [step, setStep] = useState<Step>('MAIN');

  return (
    <div className="container">
      <Step shouldRender={step === 'MAIN'}>
        <Main />
      </Step>

      <Step shouldRender={step === 'GAME'}>
        <Gameboard />
      </Step>

      <Step shouldRender={step === 'SETTING'}>
        <GameSetting />
      </Step>

      <Step shouldRender={step === 'HISTORY'}>
        <></>
      </Step>
      <GameSetting />
    </div>
  );
}
