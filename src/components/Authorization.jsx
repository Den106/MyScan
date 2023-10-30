import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Characters from "../images/Characters.svg";
import Lock from "../images/Lock.svg";
import Google from "../images/Google.svg";
import Facebook from "../images/Facebook.svg";
import Yandex from "../images/Yandex.svg";
import { Button, Container } from "react-bootstrap";
import styles from "../styles/Authorization.module.css";
import { logIn } from "../API/API";
import { authCheck } from "./func/authControl";

const Auth = ({ isAuth, setIsAuth }) => {
  const [userName, setUsersName] = useState(localStorage.getItem("User"));
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleAuth() {
    localStorage.setItem("User", userName);
    logIn(userName, password).then(() => {
      return authCheck(
        localStorage.getItem("TOKEN"),
        localStorage.getItem("EXPIRE"),
        setIsAuth,
        navigate
      );
    });
    setUsersName("");
    setPassword("");
  }

  return (
    <main>
      <Container>
        <div className={styles.displayForm}>
          <div className={styles.Authorization}>
            {isAuth === 2 ? (
              <h1>wrong data</h1>
            ) : (
              <h1>
                ДЛЯ ОФОРМЛЕНИЯ ПОДПИСКИ
                <br />
                НА ТАРИФ, НЕОБХОДИМО
                <br />
                АВТОРИЗОВАТЬСЯ.
              </h1>
            )}

            <img
              className={styles.Characters}
              src={Characters}
              alt="Characters"
            />
          </div>
          <div className={styles.form}>
            <div className={styles.loginContainer}>
              <div className={styles.row}>
                <div className={styles.loginForm}>
                  <form>
                    <img className={styles.lock} src={Lock} alt="Lock" />
                    <div className={styles.loginsignup}>
                      <Button className={styles.login}>Войти</Button>
                      <Button className={styles.signup}>
                        Зарегистрироваться
                      </Button>
                    </div>
                    <div className={styles.formGroup}>
                      <label>
                        Логин или номер телефона:
                        <input
                          type="text"
                          className={styles.FormControl}
                          placeholder={userName}
                          value={userName}
                          onChange={(el) => {
                            setUsersName(el.target.value);
                          }}
                        />
                      </label>
                    </div>
                    <div className={styles.formGroup}>
                      <label>
                        Пароль:
                        <input
                          type="password"
                          className={styles.FormControl}
                          placeholder=""
                          value={password}
                          onChange={(el) => {
                            setPassword(el.target.value);
                          }}
                        />
                      </label>
                    </div>
                    <Button onClick={handleAuth} className={styles.btnSubmit}>
                      Войти
                    </Button>
                    <div className={styles.formGroup}>
                      <a href="" className={styles.recoverPwd}>
                        Восстановить пароль
                      </a>
                      <label>Войти через:</label>
                      <div className={styles.imgsvg}>
                        <img
                          className={styles.Google}
                          src={Google}
                          alt="Google"
                        />
                        <img
                          className={styles.facebook}
                          src={Facebook}
                          alt="Facebook"
                        />
                        <img
                          className={styles.yandex}
                          src={Yandex}
                          alt="Yandex"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
};

export { Auth };
