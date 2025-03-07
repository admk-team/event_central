import { useForm } from '@inertiajs/react';
import React from 'react'
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput'

export default function HeaderDefaultSelector({ header }: any) {
    const switchRef = React.useRef<HTMLInputElement | null>(null);

    React.useEffect(() => {
        if (switchRef.current) {
            switchRef.current.checked = header.is_default;
        }
    }, [header]);

    const { post } = useForm();

    const toggleDefault = () => {
        post(route('organizer.events.headers.toggle-default', header.id), {
            preserveScroll: true,
        });
    }

    return (
        <div className="form-check form-switch form-switch-lg" dir='ltr'>
            <FormCheckInput
                ref={switchRef}
                type="checkbox"
                className="form-check-input"
                onChange={toggleDefault}
            />
        </div>
    )
}
