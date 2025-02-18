import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Col, Container } from 'react-bootstrap';

export default function EditProfile({ auth, mustVerifyEmail, status }: any) {
    return (
        <Container fluid>
            <Col>
                <UpdateProfileInformationForm
                    mustVerifyEmail={mustVerifyEmail}
                    status={status}
                    className="max-w-xl"
                />
            </Col>
            <Col>
                <UpdatePasswordForm className="max-w-xl" />
            </Col>
            <Col>
                <DeleteUserForm className="max-w-xl" />
            </Col>
        </Container>
    );
}