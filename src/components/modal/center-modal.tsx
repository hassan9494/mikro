import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CloseIcon } from 'assets/icons/CloseIcon';
import { Scrollbar } from 'components/scrollbar/scrollbar';

type SpringModalProps = {
    isOpen: boolean;
    onRequestClose: () => void;
    children: React.ReactNode;
    style?: any;
};

const CenterModal: React.FC<SpringModalProps> = ({
    isOpen,
    onRequestClose,
    children,
    style = {},
}) => {
    const [mounted, setMounted] = useState(false);
    const portalNode = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (typeof document === 'undefined') return;
        if (!portalNode.current) {
            portalNode.current = document.createElement('div');
            portalNode.current.className = 'modal-root center-modal-root';
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
                            zIndex: 1300,
                        }}
                        onClick={onRequestClose}
                    />
                    <motion.div
                        key="center-modal"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 1310,
                            backgroundColor: '#ffffff',
                            borderRadius: 12,
                            maxHeight: 'calc(100vh - 40px)',
                            maxWidth: 'calc(100vw - 40px)',
                            width: '100%',
                            padding: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: '0 18px 40px rgba(0, 0, 0, 0.15)',
                            ...style,
                        }}
                    >
                        <button
                            type="button"
                            onClick={onRequestClose}
                            style={{
                                position: 'absolute',
                                top: 16,
                                right: 16,
                                width: 32,
                                height: 32,
                                borderRadius: '50%',
                                border: 'none',
                                backgroundColor: '#ffffff',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: '#0D1136',
                            }}
                            aria-label="Close modal"
                        >
                            <CloseIcon style={{ width: 12, height: 12 }} />
                        </button>
                        <Scrollbar style={scrollbarStyle}>{children}</Scrollbar>
                    </motion.div>
                </Fragment>
            )}
        </AnimatePresence>,
        portalNode.current
    );
};

export default CenterModal;
