import React from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div 
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-brand-surface rounded-lg shadow-xl w-full max-w-sm m-4 p-6"
        onClick={e => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        <h2 className="text-xl font-medium text-brand-on-surface mb-4">{title}</h2>
        {children}
      </div>
    </div>,
    document.body
  );
};