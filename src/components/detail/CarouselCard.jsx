import styles from "../../styles/CarouselCard.module.css";
import Watch from "../../images/Watch.svg";
import Loup from "../../images/Loup.svg";
import Shield from "../../images/Shield.svg";

export function CarouselCard(props) {
    return (
        <>
            <div
                className={
                    props.data.class === "desktop"
                        ? styles.cardDesktop
                        : styles.cardMobile
                }
            >
                <div className={styles.cardContainer}>
                    <img src={props.data.icon} alt="CardIcon"/>
                    <div
                        className={
                            props.data.class === "desktop"
                                ? styles.contentDesktop
                                : styles.contentMobile
                        }
                    >
                        {props.data.text}
                    </div>
                </div>
            </div>
        </>
    );
}

export const CARD = [
    {
        id: 0,
        icon: Watch,
        text: "Высокая и оперативная скорость обработки заявки",
    },
    {
        id: 1,
        icon: Loup,
        text: "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос",
    },
    {
        id: 2,
        icon: Shield,
        text: "Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству",
    },
];