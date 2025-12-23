import React,
  {
    PropsWithChildren,
    ReactElement,
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
  } from 'react';
import ReactDOM from 'react-dom';
import { Backdrop, Box } from '@mui/material';

export interface ModalConfig {
  className?: string;
  width?: number | string;
  height?: number | string;
  disableDragging?: boolean;
  enableResizing?: boolean;
  transition?: Record<string, unknown>;
}

export interface OpenModalOptions {
  component: React.ComponentType<any> | ReactElement;
  componentProps?: Record<string, unknown>;
  overlayClassName?: string;
  closeComponent?: ReactNode | (() => ReactNode);
  closeOnClickOutside?: boolean;
  config?: ModalConfig;
  show?: boolean;
}

interface ModalManager {
  open: (options: OpenModalOptions) => void;
  close: () => void;
}

let modalManager: ModalManager | null = null;

const stopPropagation = (event: React.MouseEvent) => {
  event.stopPropagation();
};

function renderCloseComponent(closeComponent: OpenModalOptions['closeComponent']) {
  if (!closeComponent) return null;
  return typeof closeComponent === 'function' ? closeComponent() : closeComponent;
}

function resolveComponent(
  component: OpenModalOptions['component'],
  componentProps: Record<string, unknown> | undefined,
) {
  if (React.isValidElement(component)) {
    return React.cloneElement(component, componentProps);
  }

  const Component = component as React.ComponentType<any>;
  return <Component {...componentProps} />;
}

const ModalRenderer: React.FC<{
  options: OpenModalOptions | null;
  onClose: () => void;
}> = ({ options, onClose }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (options) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [options, onClose]);

  const content = useMemo(() => {
    if (!options) return null;

    const {
      overlayClassName,
      closeComponent,
      closeOnClickOutside = true,
      config,
      component,
      componentProps = {},
      show = true,
    } = options;

    if (!show) {
      return null;
    }

    const mergedProps = {
      ...componentProps,
      closeModal: onClose,
    };

    const width = typeof config?.width === 'number' ? `${config?.width}px` : config?.width;
    const height = typeof config?.height === 'number' ? `${config?.height}px` : config?.height;

    const modalBody = (
      <div
        ref={containerRef}
        className="reuseModalHolder"
        onClick={stopPropagation}
      >
        <Box
          className={config?.className}
          sx={{
            position: 'relative',
            width: width || 'auto',
            height: height || 'auto',
            maxWidth: 'calc(100vw - 32px)',
            maxHeight: 'calc(100vh - 32px)',
            overflow: 'auto',
            p: 0,
            // Force white background for the mobile search modal to avoid transparent center
            bgcolor: config?.className === 'search-modal-mobile' ? '#ffffff' : 'background.paper',
            borderRadius: 1,
            boxShadow: (theme) => theme.shadows[8],
          }}
        >
          {renderCloseComponent(closeComponent)}
          {resolveComponent(component, mergedProps)}
        </Box>
      </div>
    );

    const overlayClasses = ['modal-overlay'];
    if (overlayClassName) {
      overlayClasses.push(overlayClassName);
    }

    return (
      <Backdrop
        open
        onClick={closeOnClickOutside ? onClose : undefined}
        className={overlayClasses.join(' ')}
        sx={{
          zIndex: (theme) => theme.zIndex.modal + 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      >
        {modalBody}
      </Backdrop>
    );
  }, [options, onClose]);

  if (!options || typeof window === 'undefined') {
    return null;
  }

  const root = document.getElementById('modal-root') || document.body;
  return ReactDOM.createPortal(content, root);
};

export const ReuseModalProvider: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [options, setOptions] = useState<OpenModalOptions | null>(null);

  const close = useCallback(() => {
    setOptions(null);
  }, []);

  const open = useCallback((value: OpenModalOptions) => {
    setOptions(value);
  }, []);

  useEffect(() => {
    modalManager = { open, close };
    return () => {
      modalManager = null;
    };
  }, [open, close]);

  return (
    <>
      {children}
      <ModalRenderer options={options} onClose={close} />
    </>
  );
};

export const openModal = (options: OpenModalOptions) => {
  if (!modalManager) {
    throw new Error('ModalProvider is not mounted. Please wrap your application with ModalProvider.');
  }

  modalManager.open(options);
};

export const closeModal = () => {
  modalManager?.close();
};

export const Modal: React.FC<PropsWithChildren<unknown>> = ({ children }) => <>{children}</>;

export const ModalProvider = ReuseModalProvider;
