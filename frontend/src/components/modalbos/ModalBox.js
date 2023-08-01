import React from 'react'
import style from "./modal.module.css"

function ModalBox({active, title = "Modal-desu", closeBtnAction, children = "Modal Box-desu~"}) {
  return (
    <div className={`modalbox-component ${style.modalbox} ${active === 'active' ? style.active : ''}`}>
        <div className={`container ${style.container}`}>
            <button onClick={closeBtnAction} className={`close-button ${style.close_button}`}>
                x
            </button>
            <header className={`headline ${style.headline}`}>
                <h1 className={`title ${style.title}`}>
                    {title}
                </h1>
            </header>
            <main className={`main-content ${style.main_content}`}>
                {children}
            </main>
        </div>
    </div>
  )
}

export default ModalBox