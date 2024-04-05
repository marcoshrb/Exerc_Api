import React from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import Modal from 'react-modal';
import { useState } from 'react'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    textAling: "center",
    alignItems: "center",
    padding: "20px",
    borderRadius: "10px",
    width: "250px",
    margin: "10px",
    backgroundColor: "rgb(80, 80, 80)"
  },
};

export const CardApi = ({
  name, status, species, type, gender, image
}) => {

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignContent: "space-between",
        minHeight: "395px"
      }}>
        <h1>{name}</h1>
        <div>
          <p>{species}</p>
          <p>{type}</p>
          <p>{gender}</p>
          <img src={image} alt={name} width={150} height={"auto"} />
          <h2>{status}</h2>

          <button onClick={openModal}>Info</button>
        </div>
      </div>

      <div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div style={{ display: "flex", justifyContent: "end" }}>
            <button 
            style={{  backgroundColor: "rgb(80, 80, 80)", 
                      border: "none",
                      color: "white"
                      }} onClick={closeModal}>X</button>
          </div>
          <div style={{ textAlign: "center"}}>
            <h1>{name}</h1>
            <p>{type}</p>
            <p>{gender}</p>
            <img src={image} alt={name} width={150} height={"auto"} />
            <h2>{status}</h2>
          </div>
        </Modal>
      </div>



    </>
  )
}