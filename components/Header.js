import styles from "../styles/Home.module.scss";

export default function Header() {
  return (
    <>
        <h1 className={styles.mainHeader}>Vinařství Iris</h1>
        <p className={styles.mainPar}>
            Rodinné vinařství Zdeňka Šilinka se nachází pod Pálavou v malebné vinařské obci Pavlov, kde má vinařství mnoha set letou tradici. V minulém století ještě platilo, že ke každému domku patří sklep a ke sklepu vinohrad.
            Vína vyrábíme klasickými postupy s přihlédnutím k novým výrobním trendům.
        </p>
    </>
  )
}