import restaurantIcon from "../../images/restaurant_icon.png"
import menuIcon from "../../images/menu_icon.png"
import styles from "../../css/CercaRistorante.module.css"
export default function CercaRistoranti(){
   
    return(
<div class={styles.container}>
    <img src={restaurantIcon}/>
    <div class={styles.description}>
        <h1>Ristorante</h1>
        <h2>Ristorante-Pizzeria</h2>
        <h3>Indrizzo</h3>
    </div>
    <div class={styles.navLink}>
        <a href="#"><img src={menuIcon}/></a>
        <button class={styles.buttonBook} onClick={() => window.location.href = '/prenotaRistorante'}role="button">Prenota</button>
    </div>
</div>


);
}