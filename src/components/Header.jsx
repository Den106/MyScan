import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import store from "./store/store.jsx";
import styles from "../styles/Header.module.css";
import Menu from "./detail/AuthorizationMenu.jsx";
import LogoHead from "../images/LogoHead.svg";
import Photo from "../images/Ava.svg";
import { accountInfo } from "../API/API.jsx";
import { authTime, authReboot } from "./func/authControl.jsx";

function Header({ isAuth, setIsAuth }) {
  const [usedCompany, setUsedCompany] = useState(
    localStorage.getItem("CompaniesUsed")
  );
  const [companyLimit, setCompanyLimit] = useState(
    localStorage.getItem("CompanyLimit")
  );
  const [userName, setUserName] = useState(localStorage.getItem("User"));
  const [menuStatus, setMenuStatus] = useState(store.getState().menuStatus);
  const [token, setToken] = useState(localStorage.getItem("TOKEN"));
  const logoRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem("TOKEN"));
    setUserName(localStorage.getItem("User"));
    authTime(
      localStorage.getItem("TOKEN"),
      localStorage.getItem("EXPIRE"),
      setIsAuth
    );
    if (isAuth) {
      getDataInfo(token);
    }
    setUserName(localStorage.getItem("User"));
  }, [isAuth, location]);

  async function getDataInfo() {
    await accountInfo(token)
      .then((res) => {
        localStorage.setItem("UsedCompany", res.usedCompanyCount);
        localStorage.setItem("CompanyLimit", res.companyLimit);
        setUsedCompany(res.usedCompanyCount);
        setCompanyLimit(res.companyLimit);
      })
      .catch((el) => {
        console.log("Impossible to receive account data :", el);
      });
  }

  function processLogOut() {
    authReboot(setIsAuth, navigate);
  }

  function redirectHome() {
    navigate("/");
  }

  store.subscribe(() => {
    setMenuStatus(store.getState().menuStatus);
  });

  return (
    <>
      <header className={menuStatus ? styles.headerInverted : styles.header}>
        <Link to={"/"} className={styles.logo}>
          <img
            ref={logoRef}
            className={styles.imgLogo}
            src={LogoHead}
            alt="Logotype"
          ></img>
        </Link>
        <div>
          <nav className={styles.nav}>
            <button onClick={redirectHome} className={styles.link}>
              Главная
            </button>
            <button className={styles.link}>Тарифы</button>
            <button className={styles.link}>FAQ</button>
          </nav>
        </div>
        {!isAuth ? (
          <div>
            <div className={styles.auth}>
              <Link className={styles.register} to={"#"}>
                Зарегистрироваться
              </Link>
              <div className={styles.separator}></div>
              <Link className={styles.enter} to={"/auth"}>
                Войти
              </Link>
            </div>
            <div className={styles.menu}>
              <Menu />
            </div>
          </div>
        ) : (
          <div className={styles.authData}>
            {companyLimit ? (
              <div
                className={
                  menuStatus ? styles.requestsInfoHidden : styles.requestsInfo
                }
              >
                <div className={styles.info}>Использовано компаний </div>
                <div className={styles.data}>{usedCompany}</div>
                <div className={styles.info}>Лимит по компаниям</div>
                <div className={styles.data}>{companyLimit}</div>
              </div>
            ) : (
              <div className={styles.loaderContainer}>
              </div>
            )}
            <div className={styles.profile}>
              <div className={styles.name}>
                <div>{userName}</div>
                <button onClick={processLogOut} className={styles.exit}>
                  Выйти
                </button>
              </div>
              <div className={styles.avatar}>
                <img
                  className={styles.imgProfile}
                  src={Photo}
                  alt="Avatar"
                ></img>
              </div>
            </div>
            <div className={styles.menu}>
              <Menu />
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export default Header;
