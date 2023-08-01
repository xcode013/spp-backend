import React from 'react';
import style from "./header.module.css"

function Header({title, mainTitle, subTitle, mainSubTitle}) {
  return (
    <header className={style.head}>
        <h1 className={style.title}>
            {title} <span className={style.title_main}>{mainTitle}</span>
        </h1>
        <h4 className={style.title_sub}>
            {subTitle} <span className={style.title_sub_main}>{mainSubTitle}</span>
        </h4>
    </header>
  )
}

export default Header