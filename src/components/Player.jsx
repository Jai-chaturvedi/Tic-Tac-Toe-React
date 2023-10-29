import { useState } from "react";

export default function Player({name, symbol,isActive,onChangeName}){
    const [PlayerName , setPlayerName] = useState(name);
    const [isEditing , setIsEditing] = useState(false);
    const editAndSaveHandler =()=>{
        setIsEditing((isEditing)=>{
             return !isEditing;
        });
        if(isEditing){
            onChangeName(symbol,PlayerName);
        }
    }

    const changeHandler = (e) =>{
           setPlayerName(e.target.value);
    }
    return(
        <li className = {isActive ?  "active" : ""}>
            <span className="player">
            { !isEditing &&
            <span className="player-name">{PlayerName}</span>
            }  
            {
                isEditing &&
                <input value = {PlayerName} type="text" required onChange={changeHandler}></input>
            }
            <span className="player-symbol">{symbol}</span>
             </span>
             <button onClick={editAndSaveHandler}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    );
}
