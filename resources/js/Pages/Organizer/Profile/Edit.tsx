import React from 'react';
import { Head } from '@inertiajs/react';
import Layout from '../../../Layouts/Organizer';
import EditProfile from '../../../Components/Profile/EditProfile';

function Edit({ auth, mustVerifyEmail, status }: any) {
    return (
        <React.Fragment>
            <Head title="Profile | Velzon - React Admin & Dashboard Template" />
            <div className='page-content'>
                <EditProfile auth={auth} mustVerifyEmail={mustVerifyEmail} status={status} />
            </div>
        </React.Fragment >
    );
}

Edit.layout =(page:any) => <Layout children={page}/>

export default Edit;