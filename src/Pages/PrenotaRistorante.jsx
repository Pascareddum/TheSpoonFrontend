import styles from "../css/PrenotaRistorante.module.css"
export default function PrenotaRistorante(){
    return(
        <main class={styles.cd__main}>
    <form class={styles.bookingForm} action="#" method="post">
    <div class={styles.elemGroup}>
            <label for="name">Nome</label>
            <input type="text" id="name" name="visitor_name" placeholder="Vincenzo Esposito" pattern="[A-Z\\sa-z]{3,20}" required=""/>
        </div>
        <div class={styles.elemGroup}>
            <label for="email">E-mail</label>
            <input type="email" id="email" name="visitor_email" placeholder="VincenzoEsposito@gmail.com" required=""/>
        </div>
        <div class={styles.elemGroup}>
            <label for="phone">Cellulare</label>
            <input type="tel" id="phone" name="visitor_phone" placeholder="498-348-3872" pattern="(\\d{3})-?\\s?(\\d{3})-?\\s?(\\d{4})" required=""/>
        </div>
        <hr/>
        <div class={styles.elemGroupIn}>
            <label for="adult">Adulti</label>
            <input type="number" id="adult" name="total_adults" placeholder="2" min="1" required=""/>
        </div>
        <div class={styles.elemGroupIn}>
            <label for="child">Bambini(Minori di 5 anni)</label>
            <input type="number" id="child" name="total_children" placeholder="2" min="0" required=""/>
        </div>
        <div class={styles.elemGroupIn}>
            <label for="check-date">Data</label>
            <input type="date" id="check-date" name="checkin" required="" min="2023-12-07"/>
        </div>
        <div class={styles.elemGroupIn}>
            <label for="hour">Ora</label>
            <input type="time" id="hour" name="check-hour" required="" min=""/>
        </div>
        <hr/>

        <button class={styles.buttonBook}type="submit">Prenota</button>
    </form>
</main>
    )
}