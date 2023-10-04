import { writable } from "svelte/store";

type ToastType = "success" | "error" | "info";

interface CreateToastData {
    title: string;
    message?: string;
    type: ToastType;
};

interface Toast {
    id: number;
    title: string;
    message?: string;
    type: ToastType;
};

export const toasts = writable<Toast[]>([]);

export const removeToast = (id: number) => {
    toasts.update((toasts) => {
        return toasts.filter((toast) => toast.id !== id);
    });
};

export const addToast = (toast?: CreateToastData) => {
    if (!toast) return;
    
    const id = Math.floor(Math.random() * 1000);
    toasts.update((toasts) => [
        ...toasts,
        {
            ...toast,
            id,
        },
    ]);
    setTimeout(() => {
        removeToast(id);
    }, 6000);
};