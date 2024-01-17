import restaurantIcon from "../images/restaurant_icon.png"
import styles from '../css/Home.module.css'
export default function Home(){
    return(
        <>
    <div class={styles.container}>
      <h1 style="text-align: center;color: white;"> Scelti per te</h1>
      <div class={styles.containerCards}>
        <div class={styles.shell}>
          <div class={styles.row}>
            <div class={styles.cardProduct}>
              <div class={styles.cardImg}>
                  <img src={restaurantIcon} class={styles.imgResponsive} />
              </div>
              <div class={styles.cardText}>
                <div class={styles.category}>
                  <span onClick={() => window.location.href = '/prenotaRistorante'}>Prenota</span>
                </div>
                <div class={styles.titleProduct}>
                  <h3>Ristorante</h3>
                  <h4>Ristorante-pizzeria</h4>
                </div>
                <div class={styles.descriptionProd}>
                  <p>Indirizzo</p>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </>
    );
}