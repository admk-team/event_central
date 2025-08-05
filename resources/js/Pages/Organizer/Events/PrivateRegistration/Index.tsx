import React, { useEffect, useState } from 'react';
import Layout from '../../../../Layouts/Event';
import { Head, useForm } from '@inertiajs/react';
import { Button, Col, Container, FormGroup, Row, FormLabel } from 'react-bootstrap';
import BreadCrumb2 from '../../../../Components/Common/BreadCrumb2';
import Select, { StylesConfig } from 'react-select';

type OptionType = {
    label: string;
    value: string;
};

const customStyles: StylesConfig = {
    control: (base) => ({
        ...base,
        minHeight: 40,
        borderColor: '#ced4da',
    }),
    multiValue: (base) => ({
        ...base,
        backgroundColor: '#d1e7dd',
    }),
};

function Index() {
    const [selectEmails, setSelectEmails] = useState<OptionType[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [sendNow, setSendNow] = useState(false); // 👈 trigger flag

    const { data, setData, post, processing, reset } = useForm({
        emails: [] as string[],
    });

    // 🔥 Watch when sendNow becomes true
    useEffect(() => {
        if (sendNow && data.emails.length > 0) {
            post(route('organizer.private-registration.send'), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    setSelectEmails([]);
                    setInputValue('');
                },
                onFinish: () => {
                    setSendNow(false); // reset trigger
                }
            });
        }
    }, [sendNow, data.emails]);

    const handleSendInvites = () => {
        const emails = selectEmails.map(e => e.value);
        if (emails.length === 0) return;

        setData('emails', emails); // update form data
        setSendNow(true); // trigger effect to actually post
    };

    return (
        <>
            <Head title="Private Registration" />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb2
                        title="Private Registration"
                        items={[
                            { title: "Private Registration via Email", link: route('organizer.private-registration.index') }
                        ]}
                    />

                    <Row className="mt-4">
                        <Col md={9} lg={9}>
                            <FormGroup className="mb-3">
                                <FormLabel>Email Addresses</FormLabel>
                                <Select
                                    placeholder="Type and press Enter to add emails..."
                                    value={selectEmails}
                                    inputValue={inputValue}
                                    isMulti
                                    onInputChange={(value) => setInputValue(value)}
                                    onChange={(list) => setSelectEmails(list as OptionType[])}
                                    options={[]}
                                    styles={customStyles}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && inputValue.trim()) {
                                            const email = inputValue.trim();

                                            if (/^\S+@\S+\.\S+$/.test(email)) {
                                                const exists = selectEmails.some(item => item.value === email);
                                                if (!exists) {
                                                    setSelectEmails(prev => [...prev, { label: email, value: email }]);
                                                }
                                                setInputValue('');
                                            }

                                            e.preventDefault();
                                        }
                                    }}
                                />
                            </FormGroup>

                            <Button
                                variant="primary"
                                disabled={processing || selectEmails.length === 0}
                                onClick={handleSendInvites}
                            >
                                Send Invitations
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

Index.layout = (page: any) => <Layout children={page} />;

export default Index;
