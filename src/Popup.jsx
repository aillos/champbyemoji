import React from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
        width: '20%',
        height: '10%',
        margin: 'auto',
        background: '#131313',
        color: '#FFFFFF',
        textAlign: 'center', // Center-align text
        fontSize: '22px', // Set the font size
        border: '2px solid #131313', // Set the border
        borderRadius: '10px', // Set border radius if desired
    },
    overlay: {
        background: 'rgba(70,70,70, 0.2)',
    },
};

Modal.setAppElement('#root'); // Set the root element for accessibility

function Popup({ isOpen, onClose, message }) {
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
            <p>{message}</p>
        </Modal>
    );
}

export default Popup;
