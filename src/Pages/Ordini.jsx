import styles from "../css/Ordini.module.css"
import mealIcon from "../images/meal_icon.png"

export default function Ordini(){
    return(
        <div class={styles.container}>
    <div class={styles.category}>
        <button>CATEGORIA 1</button>
        <button>CATEGORIA 2</button>
        <button>CATEGORIA 3</button>
        <button>CATEGORIA 4</button>
        <button>CATEGORIA 5</button>
        <button>CATEGORIA 6</button>
        <button>CATEGORIA 7</button>
        <button>CATEGORIA 8</button>
        <button>CATEGORIA 9</button>
    </div>

    <div class={styles.products}>
        <div class={styles.product}>
            <img src={mealIcon} alt="immagine prodotto"/>
            <h3>Prodotto</h3>
            <p>Descrizione</p>
            <button>AGGIUNGI</button>
        </div>
    </div>
    <div class={styles.footer}>
        <button>VISUALIZZA ORDINI</button>
    </div>
</div>

    )
}