import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/HomePage.module.css";
import TariffCard from "./detail/TariffCard.jsx";
import MainCarousel from "./detail/Maincarousel.jsx";
import HomeImage from "../images/Home-image.svg";
import SitMan from "../images/SitMan.svg";
import SitManMob from "../images/SitManMob.svg";
import Bulb from "../images/Bulb.svg";
import Hit from "../images/Hit.svg";
import Laptop from "../images/Laptop.svg";

function HomePage({isAuth}) {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.mainInfo}>
          <div className={styles.mainContent}>
            <h1 className={styles.mainTitle}>
              сервис по поиску публикаций о компании по его ИНН
            </h1>
            <div className={styles.mainDescription}>
              Комплексный анализ публикаций, получение данных в формате PDF на
              электронную почту.
            </div>
            <nav className={styles.nav}>
              <Link className={styles.requestData} to={"/search"}>
                Запросить данные
              </Link>
            </nav>
          </div>
          <div className={styles.homeImage}>
            <img src={HomeImage} alt="HomeImage" />
          </div>
        </div>
        <div className={styles.advantagesBar}>
          <div>Почему именно мы</div>
          <div className={styles.carouselDesktop}>
            <MainCarousel />
          </div>
        </div>
        <div className={styles.advantagImage}>
          <div className={styles.sitMan}>
            <img src={SitMan} alt="SitManPicture" />
          </div>
          <div className={styles.sitManMob}>
            <img src={SitManMob} alt="SitManMobPicture" />
          </div>
        </div>
        <div className={styles.tariffTitle}>наши тарифы</div>
        <div className={styles.tariffs}>
          {!isAuth ? (
            <TariffCard
            title={["Beginner", "Для небольшого исследования", { icon: Bulb }]}
            prices={[
              "799 ₽",
              "1 200 ₽",
              "или 150 ₽/мес. при рассрочке на 24 мес.",
            ]}
            details={[
              "Безлимитная история запросов",
              "Безопасная сделка",
              "Поддержка 24/7",
            ]}
            isPurchased={false}
            color={{
              primaryColor: "rgba(255, 182, 79, 1)",
              secondaryColor: "rgba(0, 0, 0, 1)",
            }}
          />
           ) : (
            <TariffCard
            title={["Beginner", "Для небольшого исследования", { icon: Bulb }]}
            prices={[
              "799 ₽",
              "1 200 ₽",
              "или 150 ₽/мес. при рассрочке на 24 мес.",
            ]}
            details={[
              "Безлимитная история запросов",
              "Безопасная сделка",
              "Поддержка 24/7",
            ]}
            isPurchased={true}
            color={{
              primaryColor: "rgba(255, 182, 79, 1)",
              secondaryColor: "rgba(0, 0, 0, 1)",
            }}
          />
           )}
          <TariffCard
            title={["Pro", "Для HR и фрилансеров", { icon: Hit }]}
            prices={[
              "1 299 ₽",
              "2 600 ₽",
              "или 279 ₽/мес. при рассрочке на 24 мес.",
            ]}
            details={[
              "Все пункты тарифа Beginner",
              "Экспорт истории",
              "Рекомендации по приоритетам",
            ]}
            isPurchased={false}
            color={{
              primaryColor: "rgba(124, 227, 225, 1)",
              secondaryColor: "rgba(0, 0, 0, 1)",
            }}
          />
          <TariffCard
            title={["Business", "Для корпоративных клиентов", { icon: Laptop }]}
            prices={["2 379 ₽", "3 700 ₽", ""]}
            details={[
              "Все пункты тарифа Pro",
              "Безлимитное количество запросов",
              "Приоритетная поддержка",
            ]}
            isPurchased={false}
            color={{
              primaryColor: "rgba(0, 0, 0, 1)",
              secondaryColor: "rgba(255, 255, 255, 1)",
            }}
          />
        </div>
      </main>
    </>
  );
}

export { HomePage };