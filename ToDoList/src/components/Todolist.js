import React,{useState,useEffect} from 'react'
import "./Todostyles.css"

const getLocaldata=()=>
{
const lists =  localStorage.getItem("mytodolist")
if(lists)
{
  return JSON.parse(lists)
}
else {
  return [];
}
}

function Todolist() {
  const [inputdata,setInputdata]=useState("")
  const [items,setItems]=useState(getLocaldata())
  const [isEdititem,setisEdititem] = useState(" ")
  const[toggele,settoggle]=useState(false)

  const additem =()=>
  {
      if(!inputdata)
      {
        alert('plx fill the data')
      }
      else if(inputdata && toggele)
      {
        setItems(items.map((currentElem)=>
        {
           if(currentElem.id===isEdititem)
           {
            return {...currentElem,name:inputdata};
           }
           return currentElem;
        })
        );
        setisEdititem("");
setInputdata("");
settoggle(false)
      }
        else {
        const newinputdata =
        {id :new Date().getTime().toString(),
          name : inputdata
        };
        setItems([...items,newinputdata])
        setInputdata(" ")
      };
  }
  
  

  const editItem=(index)=>
  {
const editedlist=items.find((currentElem)=>
{
  return currentElem.id ===index;
});
setisEdititem(index);
setInputdata(editedlist.name);
settoggle(true)
  };
const deleteItem = (index) => {
        const updatedItems = items.filter((currentElem) => {
          return currentElem.id !== index;
        });
        setItems(updatedItems);
      };
const Removeall =()=>
{
  setItems([]); 
}

useEffect(()=>
{
localStorage.setItem("mytodolist",JSON.stringify(items))
},[items])
    
  return (
    <>
      <div className='main-div'>
       
         <div div className='child-div'>
         <div className="additems">
               <input type="text" placeholder='Enter Task' className="form-control" 
               value={inputdata}
               onChange={(e)=>
               {
                setInputdata(e.target.value)
               }}/>
               {toggele ?  <i className="far fa-edit add-btn" onClick={additem}></i> : <i className="fa fa-plus add-btn" onClick={additem}></i>}
            </div>
            <p className="ToDo"> ToDo Tasks</p>
            <div className="showItems">
              {
                items.map((currentElem)=>
                {
                  return (
              <div className="eachItem" key={currentElem.id}>
                <p>{currentElem.name}</p>
                <div className="todo-btn">
                  <i className="far fa-edit add-btn" onClick={()=>editItem(currentElem.id)}></i>
                  <i className="far fa-trash-alt add-btn" onClick={()=>deleteItem(currentElem.id)}></i>
                </div>
              </div>
                );
              })
              }
            </div>
            
           
              
              
           
            
            <div className="showItems">
                <button className="btn effect04" data-sm-link-text="Remove-All" onClick={Removeall}><span>Remove All</span>
                </button>
            </div>
      
            </div>
     </div>
           
      
    </>
  )
}

export default Todolist
