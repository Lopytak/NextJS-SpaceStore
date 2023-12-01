import styles from "../styles/Earth.module.css";
import Image from "next/image";
import EarthImage from "../public/images/earth.png"

const Earth = () => {
    return (
        <div className={ styles.earthImageWrapper}>
            <Image
                src={EarthImage}
                alt='Картинка Земли'
                className={ styles.earthPosition }
            />
        </div>
    )
}

export default Earth
