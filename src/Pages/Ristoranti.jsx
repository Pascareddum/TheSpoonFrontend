import restaurantIcon from "../images/restaurant_icon.png"
import styles from "../css/Ristoranti.module.css"
const Ristoranti=()=>{
    return(
        <div class={styles.container}>
<div class={styles.products}>
        <div class={styles.product}>
            <img src={restaurantIcon} alt="immagine prodotto"/>
            <h3>Prodotto</h3>
            <p>Descrizione</p>
            <button>PRENOTA</button>
        </div>
        <div class={styles.product}>
            <img src={restaurantIcon} alt="immagine prodotto"/>
            <h3>Prodotto</h3>
            <p>Descrizione</p>
            <button>PRENOTA</button>
        </div>
        <div class={styles.product}>
            <img src={restaurantIcon} alt="immagine prodotto"/>
            <h3>Prodotto</h3>
            <p>Descrizione</p>
            <button>PRENOTA</button>
        </div>
        <div class={styles.product}>
            <img src={restaurantIcon} alt="immagine prodotto"/>
            <h3>Prodotto</h3>
            <p>Descrizione</p>
            <button>PRENOTA</button>
        </div>
        <div class={styles.product}>
            <img src={restaurantIcon} alt="immagine prodotto"/>
            <h3>Prodotto</h3>
            <p>Descrizione</p>
            <button>PRENOTA</button>
        </div>
    </div>

    
        </div>
    )
}
export default Ristoranti