import { router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type ToastMessages = {
    type: string;
    message: string;
}[]

export default function useToastMessages() {
    const [showMessages, setShowMessages] = useState(true);

    const messages = (usePage().props.messages ?? []) as ToastMessages;

    useEffect(() => {
        if (showMessages) {
            messages.map(message => {
                switch (message.type) {
                    case 'success':
                        toast.success(message.message);
                        break;
                    case 'error':
                        toast.error(message.message);
                        break;
                }
            })

            setShowMessages(false);
        }
    }, [showMessages]);

    useEffect(() => {
        return router.on('finish', () => {
            setShowMessages(true);
        })
    }, [])
}
