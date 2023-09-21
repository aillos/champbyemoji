// Popup.d.ts
import React from 'react';

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
}

declare const Popup: React.FC<PopupProps>;

export default Popup;
