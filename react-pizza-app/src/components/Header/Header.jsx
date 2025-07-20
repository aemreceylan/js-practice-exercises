import { useContext } from "react";
import logo from "../../assets/logo.png";
import "./header.css";
import { AppContext } from "../../contexts/AppContext";

export default function Header() {
  const { setShowShoppingCard, setFilter } = useContext(AppContext);
  return (
    <>
      <header>
        <div id="header-container">
          <div id="header-logo">
            <img src={logo} alt="" draggable="false" />
            <div id="header-logo-title">
              <span>pizza-app</span>
            </div>
          </div>
          <div id="header-input">
            <input onInput={(e)=>{setFilter(e.target.value)}} type="text" placeholder="pizza giriniz..." />
          </div>
          <div
            id="shopping-card"
            onMouseDown={() => {
              setShowShoppingCard((state) => !state);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4z" />
            </svg>
          </div>
        </div>
      </header>
    </>
  );
}
