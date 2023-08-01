import React, { useState } from 'react'
import { NavLink } from "react-router-dom"
import { useToggle } from '../../../utilities/toggler/useToggle'
import "./form.css"

function Form({children, formOnSubmit = undefined, linkToBack = ""}) {
  return (
    <form onSubmit={formOnSubmit} className='form-component'>
        <main className='body'>
            {children}
        </main>
        <footer className='footer'>
            <NavLink className="toback-link" to={linkToBack}>
                <button className='back-btn' type='button'>Cancel</button>
            </NavLink>
            <button className='submit-btn' type='submit'>Submit</button>
        </footer>
    </form>
  )
}

export default Form

export const FormField = ({
    label = "Field Label",
    inputType = "text",
    actionOnChange = undefined,
    inputValue = undefined,
    required = true,
    autoComplete = "false",
    placeholder,
    maxLength
}) => {
    return(
        <div className='field'>
            <label className='label-field'>{label}</label>
            <input
                className='input-field'
                type={inputType} 
                onChange={actionOnChange}
                value={inputValue}
                required={required}
                autoComplete={autoComplete}
                placeholder={placeholder}
                maxLength={maxLength}
            />
        </div>
    )
}

export const FormFieldwithOpt = ({
    label = "Label field",
    actionOnChange = undefined,
    inputValue = undefined,
    required = true,
    children
}) => {
    return(
        <div className='field-with_opt'>
            <label className='label-field'>{label}</label>
            <select
                className='selection-field'
                onChange={actionOnChange}
                value={inputValue}
                required={required}
            >
                {children}
            </select>
        </div>
    )
}

export const Option = ({
    optLabel = "Option Label", 
    optValue = optLabel,
    disable = false
}) => {
    return(
        <>
            <option disabled={disable} className='option' value={optValue}>{optLabel}</option>
        </>
    )
}
