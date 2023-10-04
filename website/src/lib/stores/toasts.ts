import { writable } from "svelte/store";

interface CreateToastData {
    title: string;
    message: string;
    type: "success" | "error";
};

interface Toast {
    id: number;
    title: string;
    message?: string;
    type: "success" | "error";
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