import React, { useEffect, useState } from 'react';
import './Groups.css'
import Popup from './Popup/Popup';

function Groups({clickReciever, close: closeNotes}) {

  const [groupsName, setGroupsName] = useState([]);
  const [clickedGrp, setClickedGrp] = useState({});


  useEffect(()=>{

    // fetching groups from localstorage
    let grps = JSON.parse(localStorage.getItem('notesGroups'));

    if(grps){
      setGroupsName(grps);
    }

  },[clickedGrp])


  //function for recieve updated groups when add new group
  const recieveGroups = (group) =>{
    setGroupsName([group, ...groupsName]);
    setClickedGrp({...clickedGrp, index: clickedGrp.index+1});
  }

  const clickHandler = (i) =>{
    setClickedGrp(i);
    clickReciever(i);
  }

  return (
    <div className={closeNotes ? 'grpsContainer': 'grpsContainer hideGroups'} >
        <h1>Pocket Notes</h1>
        <Popup groupReciever={recieveGroups} />
        <ul className='grpsBox'>
          { groupsName &&
            groupsName.map((group, index)=>(
              <li onClick={()=>{clickHandler({index, ...group})}} className={index === clickedGrp.index && 'clickBg'} key={index}>
                <div className="profile" style={{backgroundColor: group.color}}>{group.profileLetters}</div>
                <div className="name">{group.groupName}</div>
              </li>
            ))
          }
        </ul>
    </div>
  )
}

export default Groups