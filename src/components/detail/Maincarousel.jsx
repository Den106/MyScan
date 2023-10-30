import React, { useState, useEffect } from "react";
import styles from "../../styles/MainCarousel.module.css";
import Left from "../../images/LeftArrow.svg";
import Right from "../../images/RightArrow.svg";
import {CarouselCard, CARD} from "./CarouselCard.jsx"

function MainCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [myAdvertData, setMyAdvertData] = useState(
    CARD.slice(currentIndex, currentIndex + 3)
  );
  const [renderer, setRenderer] = useState(false);

  function handleLeft() {
    const temp = myAdvertData.shift();
    myAdvertData.push(temp);
    setMyAdvertData(myAdvertData);
    setRenderer(!renderer);
  }

  function handleRight() {
    const temp = myAdvertData.pop();
    myAdvertData.unshift(temp);
    setMyAdvertData(myAdvertData);
    setRenderer(!renderer);
  }

  useEffect(() => {
    setCurrentIndex(currentIndex);
  }, [currentIndex]);

  return (
    <>
      <div className={styles.carouselBar}>
        <button onClick={handleLeft} className={styles.button}>
          <img src={Left} alt="Left" />
        </button>
        <div className={styles.carouselDesktopContainer}>
          {myAdvertData.map((elem) => {
            return (
              <div key={elem.id} className={styles.cardDesktop}>
                <CarouselCard
                  data={{
                    icon: elem.icon,
                    text: elem.text,
                    class: "desktop",
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className={styles.carouselMobileContainer}>
          {
            <CarouselCard
              data={{
                icon: myAdvertData[currentIndex].icon,
                text: myAdvertData[currentIndex].text,
                class: "mobile",
              }}
            />
          }
        </div>
        <button onClick={handleRight} className={styles.button}>
          <img src={Right} alt="Right" />
        </button>
      </div>
    </>
  );
}

export default MainCarousel;
