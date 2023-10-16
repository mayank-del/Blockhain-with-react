import React from 'react'
import Navigation from '../components/Navigation';

const CreateTask = ({state}) => {
    console.log(state);
    const create = async(event)=>{
        event.preventDefault();
        const {contract,account}=state;
        const taskName = document.querySelector("#taskName").value;
        const taskDate = document.querySelector("#taskDate").value;
        try{
            const res = await fetch("http://localhost:5000/api/ethereum/create-task",{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({taskName:taskName})
            })
            
            const data = await res.json()
            console.log("line 21",contract)
            if(data.status===200){
                if(contract){
                    await contract.methods
                    .createTask(taskName,taskDate)
                    .send({from:account})
                    console.log(account);
                    //setModalContent(`Task ${taskName} added at ${taskDate}`);
                }
            }else{
                alert("Task cannot be added")
            }

        } catch (error) {
            //setModalContent(`Task already exists at ${taskDate}`);
          } finally {
            //setModalOpen(true);
          }
    }

  return (
    <div>
        <Navigation/>
        CreateTask

<form onSubmit={create}>
              <label>
                Name:
                <input id="taskName" />
              </label>
              <label>
                Date:
                <input id="taskDate" />
              </label>
              <button type="submit">Create Task</button>
            </form>
    </div>
  )
}

export default CreateTask