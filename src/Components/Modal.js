import React from 'react'

function Modal({ closeModal }) {
  return (
    <div className="modalBackground">
        <div className="modalContainer">
            <button onClick={() => {closeModal(false);}}> X </button>
            <div className="title">
                <h1>Are you Sure You want to Continue?</h1>
            </div>
            <div className="body">
                <p>The next page is awesome! You should move forward, you will enjoy it.</p>    
            </div>
            <div className="footer">
                <button onClick={() => {closeModal(false);}}>Cancel</button>
                <button>Continue</button>
            </div>
        </div>
    </div>
  )
}

export default Modal;
