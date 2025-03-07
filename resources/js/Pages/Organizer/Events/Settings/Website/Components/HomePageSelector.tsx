import { useForm } from '@inertiajs/react';
import React from 'react'
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput'

export default function HomePageSelector({ page }: any) {
    const switchRef = React.useRef<HTMLInputElement | null>(null);

    React.useEffect(() => {
        if (switchRef.current) {
            switchRef.current.checked = page.is_home_page;
        }
    }, [page]);

    const { post } = useForm();

    const toggleHomePage = () => {
        post(route('organizer.events.pages.toggle-home-page', page.id), {
            preserveScroll: true,
        });
    }

    return (
        <div className="form-check form-switch form-switch-lg" dir='ltr'>
            <FormCheckInput
                ref={switchRef}
                type="checkbox"
                className="form-check-input"
                onChange={toggleHomePage}
            />
        </div>
    )
}
