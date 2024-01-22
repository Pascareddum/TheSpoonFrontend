import styles from '../../css/ConfermaSignUp.module.css';

function ConfermaSignUp(){
    return(
        <>
        <div class={styles.container}>
            <h1>Registrazione effettuata con successo</h1><br/>
            <a href="/" style="color:black;">Torna alla home</a>
        </div>
        </>
    );
}
export default ConfermaSignUp;