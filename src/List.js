import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const List = ({items,deleteItem,editElement}) => {
  return (<div className="grocey-list">
    {items.map((item)=>{
      return (<article key={item.id} className="grocery-item">
        <p className="title"> {item.title}</p>
        <div className="btn-container">
          <button type="button" className="edit-btn" onClick={(e)=>{
            e.preventDefault()
            editElement(item.id)
          }}><FaEdit/></button>

          <button type="button" className="delete-btn" onClick={(e)=>{
            e.preventDefault()
            deleteItem(item.id)}
            }><FaTrash/></button>
        </div>
      </article>)
    }) }

  </div>)
}

export default List
