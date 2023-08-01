import React from 'react'
import "./table.css";

function Table({tableHead, children}) {
  return (
    <div className='table-component'>
        <table cellSpacing={0} className='table'>
            <thead className='table-header'>
                <tr className='table-row'>
                    {
                        tableHead ? tableHead.map((header, index) => {
                            return(
                                <td className='table-data' key={index}>
                                    {header}
                                </td>
                            )
                        }) : ""
                    }
                </tr>
            </thead>
            <tbody className='table-body'>
                {children}
            </tbody>
        </table>
    </div>
  )
}

export default Table;

export function RowData({children}) {
  return (
    <tr className='table-row'>
        {children}
    </tr>
  )
}

export function Data({children, textAlign}) {
    return(
        <td className={`table-data ${textAlign}`}>
            {children}
        </td>
    )
}