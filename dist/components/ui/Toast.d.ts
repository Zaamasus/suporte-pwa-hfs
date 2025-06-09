type ToastProps = {
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    onClose: () => void;
    duration?: number;
};
export declare function Toast({ type, message, onClose, duration }: ToastProps): import("react/jsx-runtime").JSX.Element;
export {};
