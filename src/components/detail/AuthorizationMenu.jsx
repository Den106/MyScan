import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import store from "../store/store.jsx";
import styles from "../../styles/AuthorizationMenu.module.css";
import { authReboot } from "../func/authControl.jsx";

function NavBar(props) {
    const navigation = useNavigate();
  
    function redirectMain() {
      props.handler();
      navigation("/");
    }
  
    return (
      <>
        <button onClick={redirectMain} className={styles.link}>
          Главная
        </button>
        <button className={styles.link}>Тарифы</button>
        <button className={styles.link}>FAQ</button>
      </>
    );
  }

function Menu() {
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const [menuStatus, setMenuStatus] = useState(store.getState().menuStatus);
  const [authStatus, setAuthStatus] = useState(
    localStorage.getItem("AuthStatus")
  );
  function handleMenu() {
    store.dispatch({ type: "CHANGE_MENU_STATUS" });
    setMenuStatus(!menuStatus);
  }

  function enterHandler() {
    handleMenu();
    navigate("/auth");
  }

  function exitHandler() {
    authReboot(setAuthStatus, navigate);
    handleMenu();
  }

  return (
    <>
      <div
        className={menuStatus ? styles.menuButtonOpened : styles.menuButton}
        onClick={handleMenu}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div
        ref={menuRef}
        className={
          menuStatus ? styles.mobileMenuVisible : styles.mobileMenuHidden
        }
      >
        <nav className={styles.navMobile}>
          <NavBar handler={handleMenu} />
        </nav>
        <div className={styles.mobileAuth}>
          <Link to={"#"} className={styles.mobileRegister}>
            Зарегистрироваться
          </Link>
          {authStatus === "false" ? (
            <button onClick={enterHandler} className={styles.mobileEnter}>
              Войти
            </button>
          ) : (
            <button onClick={exitHandler} className={styles.mobileEnter}>
              Выйти
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Menu;
