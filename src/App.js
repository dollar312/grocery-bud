import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";
const getListLocalStorage = () =>{
  let list = localStorage.getItem('list')
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  }else{
    return []
  }
}
function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getListLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name){
      showAller(true,'Add some Information here', 'danger')
    }else{
      showAller(true,'Added to the List', 'success')
      isEditing && setIsEditing(false)
      const newItem = {id: new Date().getTime().toString(),title:name}
      setList(prevList =>(prevList = [...prevList,newItem]))
      setName('')
    }
    
  };
  const showAller =(show=false,msg='',type='')=>{
    setAlert({show,msg,type})
  }
  const removeItems =(id)=>{
    showAller(true,'Delete From the List', 'danger')
    const allElementsRemaining = list.filter(elemenet => elemenet.id !== id)
    setList([...allElementsRemaining ])
  }
  const editElement = (id)=>{
    showAller(true,'Editing element', 'success')
    let getElementToModify = list.filter(element => element.id === id)
    console.log(getElementToModify[0].title)
    setIsEditing(true)
    removeItems(id)
    showAller(true,'Editing element', 'success')
    setName(getElementToModify[0].title)
  }
  useEffect(() => {
   localStorage.setItem('list', JSON.stringify(list))
  }, [list])
  return (
    <section className="section-center">
      <form onSubmit={handleSubmit} className="grocery-form">
        {alert.show && <Alert  {...alert} removeAler={showAller}/>}
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g eggs "
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <button type="submit" className="submit-btn">
            
            {isEditing ? "Editing" : "Submit"}
          </button>
        </div>
      </form>
      <div className="grocery-container">
      {list.length > 0 && <List items = {list} deleteItem={removeItems} editElement = {editElement}/>} 
        <button className="clear-btn" onClick={()=>{
          showAller(true,'you Cleaned all the list', 'danger')
          setList([])
        }}>clear All</button>
      </div>
    </section>
  );
}

export default App;
