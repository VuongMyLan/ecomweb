import React from 'react';
import './modal.scss';

const Modal = ({ setShowWidget, className = null }) => {
    return (
        <div
            className={`xl:hidden w-screen h-screen bg-stone-400 fixed top-0 left-0 right-0 bottom-0 z-40 modal ${className}`}
            onClick={() => setShowWidget(false)}
        >
            {' '}
        </div>
    );
};

export default Modal;
