import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CloseIcon } from 'assets/icons/CloseIcon';
// import { useAppState, useAppDispatch } from 'contexts/app/app.provider';
import { Scrollbar } from 'components/scrollbar/scrollbar';

type SpringModalProps = {
    isOpen: boolean;
    onRequestClose: () => void;
    children: React.ReactNode;
    style?: React.CSSProperties;
};

const SpringModal: React.FC<SpringModalProps> = ({
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
            portalNode.current.className = 'modal-root spring-modal-root';
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
                <motion.div
                    key="spring-modal"
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '100%', opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    style={{
                        position: 'fixed',
                        left: '50%',
                        bottom: 0,
                        transform: 'translateX(-50%)',
                        width: '100%',
                        maxWidth: 'calc(100% - 10px)',
                        maxHeight: '70vh',
                        backgroundColor: '#ffffff',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        boxShadow: '0 -18px 40px rgba(0,0,0,0.12)',
                        zIndex: 1350,
                        paddingBottom: 10,
                        overflow: 'hidden',
                        ...style,
                    }}
                >
                    <button
                        type="button"
                        onClick={onRequestClose}
                        style={{
                            position: 'absolute',
                            top: -55,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 40,
                            height: 40,
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
                    <Scrollbar style={scrollbarStyle}>
                        <div style={{ padding: 30 }}>{children}</div>
                    </Scrollbar>
                </motion.div>
            )}
        </AnimatePresence>,
        portalNode.current
    );
};

export default SpringModal;
