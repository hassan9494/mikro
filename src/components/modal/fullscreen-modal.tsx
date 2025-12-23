import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CloseIcon } from 'assets/icons/CloseIcon';
// import { useAppState, useAppDispatch } from 'contexts/app/app.provider';
import { Scrollbar } from 'components/scrollbar/scrollbar';

type SpringModalProps = {
    isOpen: boolean;
    onRequestClose: () => void;
    children: React.ReactNode;
    style?: any;
    defaultClose?: boolean;
};

const SpringModal: React.FC<SpringModalProps> = ({
                                                     isOpen,
                                                     onRequestClose,
                                                     children,
                                                     defaultClose = true,
                                                     style = {},
                                                 }) => {
    const [mounted, setMounted] = useState(false);
    const portalNode = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (typeof document === 'undefined') return;
        if (!portalNode.current) {
            portalNode.current = document.createElement('div');
            portalNode.current.className = 'modal-root fullscreen-modal-root';
        }
        const node = portalNode.current;
        document.body.appendChild(node);
        setMounted(true);
        return () => {
            if (node.parentElement) {
                node.parentElement.removeChild(node);
            }
        };
    }, []);

    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onRequestClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = originalOverflow;
        };
    }, [isOpen, onRequestClose]);

    const scrollbarStyle = useMemo(
        () => ({
            height: '100%',
            width: '100%',
        }),
        []
    );

    if (!mounted || !portalNode.current) {
        return null;
    }

    const handleBackdropClick = () => {
        if (defaultClose) {
            onRequestClose();
        }
    };

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <Fragment>
                    <motion.div
                        className="modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            zIndex: 1400,
                        }}
                        onClick={handleBackdropClick}
                    />
                    <motion.div
                        key="fullscreen-modal"
                        initial={{ y: '100%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: '100%', opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 1410,
                            backgroundColor: '#ffffff',
                            display: 'flex',
                            flexDirection: 'column',
                            ...style,
                        }}
                    >
                        {defaultClose && (
                            <button
                                type="button"
                                onClick={onRequestClose}
                                style={{
                                    position: 'absolute',
                                    top: 16,
                                    right: 16,
                                    width: 36,
                                    height: 36,
                                    borderRadius: '50%',
                                    border: 'none',
                                    backgroundColor: '#ffffff',
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    color: '#0D1136',
                                    zIndex: 1415,
                                }}
                                aria-label="Close modal"
                            >
                                <CloseIcon style={{ width: 14, height: 14 }} />
                            </button>
                        )}
                        <Scrollbar style={scrollbarStyle}>{children}</Scrollbar>
                    </motion.div>
                </Fragment>
            )}
        </AnimatePresence>,
        portalNode.current
    );
};

export default SpringModal;
