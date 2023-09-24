import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';

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

const pcStyles = {
    content: {

        width: '300px',
        height: '100px',
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

Modal.setAppElement('#root');

function Popup({ isOpen, onClose, message }) {
    const [modalStyles, setModalStyles] = useState(pcStyles);

    useEffect(() => {

        const updateModalStyles = () => {
            const isMobile = window.innerWidth <= 768;
            setModalStyles(isMobile ? mobileStyles : pcStyles);
        };


        updateModalStyles();

        window.addEventListener('resize', updateModalStyles);


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