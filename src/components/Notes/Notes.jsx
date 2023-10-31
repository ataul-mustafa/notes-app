import React, { useEffect, useState } from 'react';
import './Notes.css';
import sendButton from '../../assets/sendButton.png';
import beforeChatImage from '../../assets/beforeChatImage.png';
import lockIcon from '../../assets/lockIcon.png';
import backIcon from '../../assets/backIcon.png';

function Notes({ openedGrp, closeNotesReciever }) {

  const [note, setNote] = useState('');
  const [activeGrp, setActiveGrp] = useState({});
  const [closeNotes, setCloseNotes] = useState(true);

  useEffect(() => {
    if (openedGrp) {
      setActiveGrp(openedGrp)
      setCloseNotes(false)
      // console.log(openedGrp)
    }

  }, [openedGrp])


  //function to get current time
  function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let ampm = hours > 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // "0" should be displayed as "12"

    // Add leading zero to single-digit minutes
    minutes = minutes < 10 ? '0' + minutes : minutes;

    // Construct the formatted time string
    const formattedTime = `${hours}:${minutes} ${ampm}`;

    return formattedTime;
  }

  //function to get current date
  function getFormattedDate() {
    const months = [
      'Jan', 'Feb', 'March', 'April', 'May', 'June',
      'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ];

    const now = new Date();
    const day = now.getDate();
    const monthIndex = now.getMonth();
    const monthName = months[monthIndex];
    const year = now.getFullYear();

    const formattedDate = `${day} ${monthName} ${year}`;
    return formattedDate;
  }

  const submitFormFun = (e) =>{
    e.preventDefault();

      let allNotes = JSON.parse(localStorage.getItem('notesGroups'));

      const newNote = {
        date: getFormattedDate(),
        time: getCurrentTime(),
        note,
      }
      if (note) {
        setActiveGrp({
          ...allNotes[openedGrp.index],
          notes: [...allNotes[openedGrp.index].notes, newNote]
        })

        const newGroup = {
          ...allNotes[openedGrp.index],
          notes: [...allNotes[openedGrp.index].notes, newNote]
        }

        allNotes[openedGrp.index] = newGroup;

        localStorage.setItem('notesGroups', JSON.stringify(allNotes))
        setNote('');
      }
  }



  const addNoteHandler = (e) => {

    if (e.key === 'Enter' && !e.shiftKey) {
      submitFormFun(e)
    }
  }

  const closeHandler = () => {
    closeNotesReciever(true)
    setCloseNotes(true);
  }

  return (
    <div className={closeNotes ? 'hideNotes notesContainer' : 'notesContainer'} >
      {
        openedGrp &&
        <div className='notesBox'>
          <div className='head'>
            <img onClick={closeHandler} src={backIcon} alt="" />
            <div style={{ backgroundColor: activeGrp.color }} className="prflIcon">{activeGrp.profileLetters}</div>
            <div className="groupName">{activeGrp.groupName}</div>
          </div>
          <ul>
            {
              activeGrp.notes &&
              activeGrp.notes.map((not, i) => (
                <li key={i}>
                  <div className="dateTime">
                    <div className="time">{not.time}</div>
                    <div className="date">{not.date}</div>
                  </div>
                  <div className="note">{not.note}</div>
                </li>
              ))
            }
          </ul>
          <form onKeyDown={addNoteHandler} className="inputBox">
            <textarea value={note} onChange={(e) => { setNote(e.target.value) }} placeholder='Enter your text here...........'></textarea>
            <button onClick={submitFormFun}>
              <img src={sendButton} alt="send" />
            </button>
          </form>
        </div>}
      {!openedGrp &&
        <div className='notesImg'>
          <img src={beforeChatImage} alt="BackgrounImage" />
          <h1>Pocket Notes</h1>
          <p>Send and receive messages without keeping your phone online. Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
          <div className='bottomPara'>
            <img src={lockIcon} alt="" />
            end-to-end encrypted
          </div>
        </div>
      }
    </div>
  )
}

export default Notes