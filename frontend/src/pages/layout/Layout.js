import React from 'react';
import styles from "./layout.module.css";

// Components
import Sidebar from '../../components/sidebar/Sidebar';

function Layout({children}) {
  return (
    <React.Fragment>
        <div className={styles.container}>
            <div className={styles.sidebar_container}>
              <Sidebar/>
            </div>
            <div className={styles.main}>
                {children}
            </div>
        </div>
    </React.Fragment>
  )
}

export default Layout