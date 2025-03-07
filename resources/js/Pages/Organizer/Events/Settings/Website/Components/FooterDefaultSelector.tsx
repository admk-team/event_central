import { useForm } from '@inertiajs/react';
import React from 'react'
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput'

export default function FooterDefaultSelector({ footer }: any) {
    const switchRef = React.useRef<HTMLInputElement | null>(null);

    React.useEffect(() => {
        if (switchRef.current) {
            switchRef.current.checked = footer.is_default;
        }
    }, [footer]);

    const { post } = useForm();

    const toggleDefault = () => {
        post(route('organizer.events.footers.toggle-default', footer.id), {
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
