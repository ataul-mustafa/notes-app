import React, {useState} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './Popup.css'

const PopupModel = ({groupReciever}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [groupData, setGroupData] = useState({
        groupName: '',
        color: '',
        profileLetters: '',
        notes: ''
    })
  
    const togglePopup = () => {
      setIsOpen(!isOpen);
    };

    const popupContentStyle = {
        borderRadius: '10px', 
        background: '#ffffff',
        boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)', 
        width: window.innerWidth <= 768 ? '80%' : '50%', 
      
        '@media (maxWidth: 768px)': {
          width: '90%', // Width for mobile screens
        },
      };

      //function to get a random letter
      const getRandomLetter = (name)=>{
        let randNo = Math.floor(Math.random() * (name.length - 1) + 1);
        let randLetter = name[randNo];
    
        return randLetter;
      }
    
      // function for obtaining profile letters
      const prflLetters = (name) =>{
    
        let letters;
        let randomeLetter = getRandomLetter(name);
    
        if(randomeLetter === ' '){
          randomeLetter = getRandomLetter(name);
        }
    
        letters = name[0]+randomeLetter;
    
        return letters.toUpperCase()
      }
    




      function addToLocalStorage(element) {

        let newElement = element;

        newElement.profileLetters = prflLetters(element.groupName);

        let groupsArray = JSON.parse(localStorage.getItem('notesGroups')) || [];
    
        groupsArray.unshift(newElement);
    
        localStorage.setItem('notesGroups', JSON.stringify(groupsArray));

        groupReciever(newElement);
    }
      
    const handleSubmit = (e) =>{

      //preventing from refresh
      e.preventDefault();
      if(groupData.groupName && groupData.color){
        addToLocalStorage(groupData)
      }
    }
  
    return (
      <div>
        <button className='createNoteBtn' onClick={togglePopup}><span>+ </span>Create Notes Group</button>
  
        <Popup open={isOpen} 
        closeOnDocumentClick
         onClose={togglePopup}
         contentStyle={popupContentStyle}
         >
          {(close) => (
            <div className="popup-container">
              <h2>Create New Notes Group</h2>
              <form>
                <div>
                    <label>Group Name</label>
                    <input type="text" onChange={(e)=>{setGroupData({...groupData, groupName: e.target.value})}} placeholder='Enter your group name' />
                </div>
                <div>
                    <label>Choose colour</label>
                    <ul>
                        <li onClick={()=>{setGroupData({...groupData, color:'#B38BFA'})}} style={{backgroundColor: '#B38BFA'}}></li>
                        <li onClick={()=>{setGroupData({...groupData, color:'#FF79F2'})}} style={{backgroundColor: '#FF79F2'}}></li>
                        <li onClick={()=>{setGroupData({...groupData, color:'#43E6FC'})}} style={{backgroundColor: '#43E6FC'}}></li>
                        <li onClick={()=>{setGroupData({...groupData, color:'#F19576'})}} style={{backgroundColor: '#F19576'}}></li>
                        <li onClick={()=>{setGroupData({...groupData, color:'#0047FF'})}} style={{backgroundColor: '#0047FF'}}></li>
                        <li onClick={()=>{setGroupData({...groupData, color:'#6691FF'})}} style={{backgroundColor: '#6691FF'}}></li>
                    </ul>
                </div>
                <button onClick={(e)=>{handleSubmit(e); close()}}>Create</button>
              </form>
            </div>
          )}
        </Popup>
      </div>
    );
  };
  
  export default PopupModel;
  