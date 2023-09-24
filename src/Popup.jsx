import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';

// Media query for screens with a maximum width of 768px (adjust as needed)
const mobileStyles = {
    content: {
        width: '300px',
        height: '10%',
        margin: 'auto',
        position: 'absolute',
        top: '16%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: '#131313',
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: '20px',
        border: '2px solid #131313',
        borderRadius: '10px',
    },
    overlay: {
        background: 'rgba(70, 70, 70, 0.2)',
    },
};

// Media query for screens with a minimum width of 769px (adjust as needed)
const pcStyles = {
    content: {

        width: '300px',
        height: '80px',
        margin: 'auto',
        marginTop: '25%',
        background: '#131313',
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: '20px',
        border: '2px solid #131313',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        background: 'rgba(70, 70, 70, 0.2)',
    },
};

Modal.setAppElement('#root'); // Set the root element for accessibility

function Popup({ isOpen, onClose, message }) {
    const [modalStyles, setModalStyles] = useState(pcStyles);

    useEffect(() => {
        // Update styles based on screen width when the component mounts
        const updateModalStyles = () => {
            const isMobile = window.innerWidth <= 768; // Adjust the breakpoint as needed
            setModalStyles(isMobile ? mobileStyles : pcStyles);
        };

        // Call the function to set the initial styles
        updateModalStyles();

        // Attach a resize event listener to update styles when the window size changes
        window.addEventListener('resize', updateModalStyles);

        // Cleanup: Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', updateModalStyles);
        };
    }, []);

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} style={modalStyles}>
            <p>{message}</p>
        </Modal>
    );
}

export default Popup;