import React from 'react'
import "./searchbar.css"

function SearchBar({inputType, placeholder, autoComplete}) {
  return (
    <div className='searchbar-component'>
        <button className='clear-button'>x</button>
        <input type={inputType} placeholder={placeholder} autoComplete={autoComplete} className='search-field' />
        <button className='search-button'>Search</button>
    </div>
  )
}

export default SearchBar