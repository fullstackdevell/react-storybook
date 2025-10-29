import type { HTMLAttributes } from "react";

export type ToastVariant = "success" | "error" | "warning" | "info";

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
    title: string;
    message: string;

    variant?: ToastVariant;
    duration?: number;
    onDismiss: () => void;
    showCloseButton?: boolean;
}