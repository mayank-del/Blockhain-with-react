import React, { useState } from 'react'
import Navigation from '../components/Navigation';

const ViewTask = () => {
    const [task,setTask]=useState({id:"",name:"",date:""});
    const View = async(event) => {
    try{
        event.preventDefault()
        const taskID = document.querySelector("#taskID").value;
        const res = await fetch(`http://localhost:5000/api/ethereum/view-task/${taskID}`,
        {
          method:"GET",
          headers:{
              "content-type":"application/json"
          }
        });
        const data = await res.json();
        console.log(data);
        if(data.status===200){
          console.log(data.data)
          setTask(data.data)
        }else{
          throw new Error;
        }
     }catch(error){
      /* setModalContent("Task does not exist");
      setModalVisible(true); */
     }
    }

  return (
    <div>
        <Navigation/>
        {(task.id!=="" && task.name!=="" && task.date!=="") ? (
          <div className="view_task_by_id  view_all_tasks_card">
            <p>Task ID: {task.id}</p>
            <p>Task Name: {task.name}</p>
            <p>Task Date: {task.date}</p>
          </div>
        ) : (
          <div className="empty_div"></div>
        )}
         <form onSubmit={View}>
          <label>
            ID:
            <input id="taskID" />
          </label>
          <button type="submit">View Task</button>
        </form>
    </div>
  )

  }
export default ViewTask