import  styles from"./NavigationBar.module.css"
import React from "react";
// import { Router, Route, Link} from 'react-router-dom'

export function Nav() {
    return (
        <div>
            <nav>
                <h1>ShopWise</h1>
                    <ul className={styles.nav}>
                        <li className={styles.space}></li>
                        <li className={styles.links}>
                            Acasa
                        </li>
                        <li className={styles.links}>
                            Despre
                        </li>
                        <li className={styles.links}>
                            Experienta
                        </li>
                        <li className={styles.links}>
                            Educatie
                        </li>
                        <li className={styles.links}>
                            Abilitati
                        </li>
                        <li className={styles.links}>
                            Proiecte
                        </li>
                    </ul>
            </nav>
        </div>
    )
}

