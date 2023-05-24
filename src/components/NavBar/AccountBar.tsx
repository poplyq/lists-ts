import React, { FC } from 'react';
import './accountbar.css';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import logo from './100.png';

interface AccountBarProps {
  setIsActive(arg: boolean): void;
}

export const AccountBar: FC<AccountBarProps> = ({setIsActive}) => {
  const user = useTypedSelector((state) => state.user);
  const email = user.user?.email;

  const click = ()=>{
    setIsActive(false)
  }
  return (
    <div className="accountBarContainer">
      <button className="closeButton" onClick={click}>
        &#xd7;
      </button>
      <h2 className="accountBarTitle">Учетная запись</h2>
      <div className="emailWraper">
        <img className="emailLogo" src={logo} alt="logo" />
        <h3 className="emailTitle">{email}</h3>
      </div>
      <hr />
    </div>
  );
};
