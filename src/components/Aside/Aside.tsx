import React from 'react';
import './aside.css';
import desk from './desk.png';
import settings from './settings.png';
import table from './table.png';
import calendr from './calendr.png';

export const Aside = () => {
  function hideBar(e: React.MouseEvent<HTMLButtonElement>) {
    const aside = document.querySelector('.aside');
    const cadrs = document.querySelector('.cards');
    const button = document.querySelector('.asideButton');
    aside?.classList.toggle('animation');
    setTimeout(() => {
      aside?.classList.toggle('hide');
      button?.classList.toggle('buttonhide');
      cadrs?.classList.toggle('margin');
    }, 300);
  }
  return (
    <div className="aside">
      <div className="asideTitleblock">
        <img src="" className="asideImage" alt="" />
        <h3 className="asideTitle"> Рабочее пространство Lists </h3>
        <button className="asideButton" onClick={hideBar}>
          {' '}
          &#x2039;
        </button>
      </div>

      <div className="asideBlock">
        <div className="asideBlockElement">
          <img className="asideIcon" src={desk} alt="" />
          <p>Доски</p>
        </div>
        <div className="asideBlockElement">
          <img className="asideIcon" src={settings} alt="" />
          <p>Настройки</p>
        </div>
        <p className="asideSubtitle">Режимы просмотра рабочего пространства</p>
      </div>
      <div className="asideBlock">
        <div className="asideBlockElement">
          <img className="asideIcon" src={table} alt="" />
          <p>Таблица</p>
        </div>
        <div className="asideBlockElement">
          <img className="asideIcon" src={calendr} alt="" />
          <p>Кaлендарь</p>
        </div>
      </div>
    </div>
  );
};
