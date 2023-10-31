import React, { useState } from 'react';
import Groups from '../../components/Groups/Groups';
import Notes from '../../components/Notes/Notes';

function Home() {
  const [openedGrp, setOpenedGrp] = useState(null);
  const [closeNotes, setCloseNotes] = useState(true);

  const recieveClickedGrp = (i) =>{
    setOpenedGrp(i);
    setCloseNotes(false);
  }

  const closeFun = (val) =>{
    setCloseNotes(val);
  }

  return (
    <div style={{display: 'flex'}}>
        <Groups clickReciever={recieveClickedGrp} close={closeNotes} />
        <Notes openedGrp={openedGrp} closeNotesReciever={closeFun} />
    </div> 
  )
}

export default Home