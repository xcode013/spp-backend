import React from 'react';
import style from "./cardlandscape.module.css";
import { NavLink } from 'react-router-dom';

export function CardLandscapeOne({titleCard, iconCard, mainContentCard, seemorePath}) {
  return (
    <div className={`${style.card_landscape} ${style.card_landscape_one} card-landscape variant-one`}>
        <header className={`${style.head} head-card_lshead-card_ls_one`}>
            <h1 className={`${style.title} title-card_ls title-card_ls_one`}>
                {titleCard}
            </h1>
        </header>
        <main className={`${style.body} body-card_ls body-card_ls_one`}>
            <div className={`${style.icon} icon-card_ls icon-card_ls_one`}>
                {iconCard}
            </div>
            <div className={`${style.content} content-card_ls content-card_ls_one`}>
                {mainContentCard}
            </div>
        </main>
        <footer className={`${style.foot} foot-card_ls foot-card_ls_one`}>
            <NavLink className={`${style.link} link-card_ls link-card_ls_one`} to={seemorePath}>See More...</NavLink>
        </footer>
    </div>
  )
}