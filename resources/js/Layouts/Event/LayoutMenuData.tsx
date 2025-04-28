import { usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

const Navdata = () => {
    const currentEvent = usePage().props.currentEvent as any;
    // console.log("Event Start Date:", currentEvent?.dates[0]?.date);

    // State data
    const [isDashboard, setIsDashboard] = useState<boolean>(false);
    const [isContent, setIsContent] = useState<boolean>(false);
    const [isEngagement, setIsEngagement] = useState<boolean>(false);
    const [isAttendees, setIsAttendees] = useState<boolean>(false);
    const [isTickets, setIsTickets] = useState<boolean>(false);
    const [isRefundTicket, setIsRefundTicket] = useState<boolean>(false);
    const [isEvent, setIsEvent] = useState<boolean>(false);
    const [isForm, setIsForm] = useState<boolean>(false);
    const [IsQuestionnaireForm, setIsQuestionnaireForm] = useState<boolean>(false);
    const [IsWebsite, setIsWebsite] = useState<boolean>(false);
    const [IsSessionAttendance, setIsSessionAttendance] = useState<boolean>(false);
    const [IspayemntSettings, setIspayemntSettings] = useState<boolean>(false);
    const [isSettingsMenu, setIsSettingsMenu] = useState<boolean>(false);
    const [IsQuestionnaireResponse, setIsQuestionnaireResponse] = useState<boolean>(false);
    const [isAssignTicket, setIsAssignTicket] = useState<boolean>(false);
    const [isUpgradeTicket, setUpgradeTicket] = useState<boolean>(false);

    const [iscurrentState, setIscurrentState] = useState<any>('Dashboard');

    function updateIconSidebar(e: any) {
        if (e && e.target && e.target.getAttribute("sub-items")) {
            const ul: any = document.getElementById("two-column-menu");
            const iconItems: any = ul.querySelectorAll(".nav-icon.active");
            let activeIconItems = [...iconItems];
            activeIconItems.forEach((item) => {
                item.classList.remove("active");
                var id = item.getAttribute("sub-items");
                const getID: any = document.getElementById(id) as HTMLElement;
                if (getID)
                    getID?.parentElement.classList.remove("show");
            });
        }
    }

    useEffect(() => {
        document.body.classList.remove('twocolumn-panel');
        if (iscurrentState !== 'Dashboard') setIsDashboard(false);
        if (iscurrentState !== 'Event') setIsEvent(false);
        if (iscurrentState !== 'Content') setIsContent(false);
        if (iscurrentState !== 'users') setIsAttendees(false);
        if (iscurrentState !== 'registrationForm') setIsForm(false);
        if (iscurrentState !== 'website') setIsWebsite(false);
        if (iscurrentState !== 'Settings') setIsSettingsMenu(false);
        if (iscurrentState !== 'payemntSettings') setIspayemntSettings(false);
        if (iscurrentState !== 'sessionAttendance') setIsSessionAttendance(false);
        if (iscurrentState !== 'Tickets') setIsTickets(false);
        // if (iscurrentState !== 'refundTicket') setIsRefundTicket(false);
        if (iscurrentState !== 'Questionnaire') setIsQuestionnaireForm(false);
        if (iscurrentState !== 'Questionnaire_response') setIsQuestionnaireResponse(false);
        // if (iscurrentState !== 'assignTickets') setIsTickets(false);
        // if (iscurrentState !== 'upgradeTicket') setIsTickets(false);
    }, [
        iscurrentState,
        isDashboard,
        isEvent,
        isAttendees,
        isSettingsMenu,
        isForm,
        IsWebsite,
        IspayemntSettings,
        IsSessionAttendance,
        // isRefundTicket,
        isTickets,
        // isAssignTicket,
        // isUpgradeTicket
    ]);

    // Dynamic current date
    const currentDate = new Date();
    const eventStartDate = currentEvent?.dates[0]?.date ? new Date(currentEvent.dates[0].date) : null;
    const isEventStarted = eventStartDate && currentDate >= eventStartDate;

    const menuItems: any = [
        {
            id: "dashboard",
            label: "Dashboard",
            icon: "bx bxs-dashboard",
            link: route('organizer.events.dashboard'),
            stateVariables: isDashboard,
            click: function (e: any) {
                e.preventDefault();
                setIsDashboard(!isDashboard);
                setIscurrentState('Dashboard');
                updateIconSidebar(e);
            },
            hasPermissions: [
                'view_event_dashboard',
            ],
        },
        {
            id: "attendees",
            label: "Event",
            icon: "bx bxs-calendar-event",
            link: route('organizer.events.settings.event.index'),
            stateVariables: isEvent,
            click: function (e: any) {
                e.preventDefault();
                setIsEvent(!isEvent);
                setIscurrentState('Event');
                updateIconSidebar(e);
            },
            hasPermissions: [
                'edit_events',
            ],
        },
        {
            id: "Content",
            label: "Content",
            icon: "bx bx-book-content",
            link: "/#",
            stateVariables: isContent,
            click: function (e: any) {
                e.preventDefault();
                setIsContent(!isContent);
                setIscurrentState('Content');
                updateIconSidebar(e);
            },
            hasAnyPermission: [
                'view_event_sessions',
                'view_speakers',
                'view_partner',
                'view_tickets',
            ],
            subItems: [
                {
                    id: "schedule",
                    label: "Schedule",
                    link: route('organizer.events.schedule.index'),
                    parentId: "Content",
                    hasPermissions: [
                        'view_event_sessions',
                    ],
                },
                {
                    id: "speakers",
                    label: "Speakers",
                    link: route('organizer.events.speaker.index'),
                    parentId: "Content",
                    hasPermissions: [
                        'view_speakers',
                    ],
                },
                {
                    id: "partners",
                    label: "Partners",
                    link: route('organizer.events.partner.index'),
                    parentId: "Content",
                    hasPermissions: [
                        'view_partner',
                    ],
                },
                {
                    id: "tickets",
                    label: "Tickets",
                    link: route('organizer.events.tickets.index'),
                    parentId: "Content",
                    hasPermissions: [
                        'view_tickets',
                    ],
                },
                {
                    id: "ticket-fees",
                    label: "Ticket Fees",
                    link: route('organizer.events.ticket-fees.index'),
                    parentId: "Content",
                    hasPermissions: [
                        'view_tickets', //To be changed after permission added
                    ],
                },
                {
                    id: "ticket-addons",
                    label: "Ticket Add-ons",
                    link: route('organizer.events.addon.index'),
                    parentId: "Content",
                    hasPermissions: [
                        'view_tickets',  //To be changed after permission added
                    ],
                },

                {
                    id: "promo-codes",
                    label: "Promo Codes",
                    link: route('organizer.events.promo-codes.index'),
                    parentId: "Content",
                    hasPermissions: [
                        'view_tickets',
                    ],
                },
            ]
        },
        {
            id: "attendees",
            label: "Attendees",
            icon: "bx bxs-user-account",
            link: route('organizer.events.attendees.index'),
            stateVariables: isAttendees,
            click: function (e: any) {
                e.preventDefault();
                setIsAttendees(!isAttendees);
                setIscurrentState('users');
                updateIconSidebar(e);
            },
            hasPermissions: [
                'view_attendees'
            ],
        },
        {
            id: "payments",
            label: "Payments",
            icon: "bx bxs-credit-card",
            link: route('organizer.events.payments'),
            stateVariables: isAttendees,
            click: function (e: any) {
                e.preventDefault();
                setIsTickets(!isTickets);
                setIscurrentState('payments');
                updateIconSidebar(e);
            },
            hasPermissions: [
                'view_payments'
            ],
        },

        {
            id: "registrationForm",
            label: "Registration Form",
            icon: "bx bxs-user-plus",
            link: route('organizer.events.settings.registration-form.index'),
            stateVariables: isForm,
            click: function (e: any) {
                e.preventDefault();
                setIsForm(!isForm);
                setIscurrentState('registrationForm');
                updateIconSidebar(e);
            },
            hasPermissions: [
                'edit_registration_form'
            ],
        },
        ...(isEventStarted ? [{
            id: "sessionAttendance",
            label: "Sessions Attendance",
            icon: "bx bx-calendar-check",
            link: route('organizer.events.attendance.index'),
            stateVariables: IsSessionAttendance,
            click: function (e: any) {
                e.preventDefault();
                setIsSessionAttendance(!IsSessionAttendance);
                setIscurrentState('sessionAttendance');
                updateIconSidebar(e);
            },
            hasPermissions: [
                'view_session_attendence'
            ],
        }] : []),
        {
            id: "website",
            label: "Website",
            icon: "bx bx-globe",
            link: route('organizer.events.settings.website.index'),
            stateVariables: IsWebsite,
            click: function (e: any) {
                e.preventDefault();
                setIsWebsite(!IsWebsite);
                setIscurrentState('website');
                updateIconSidebar(e);
            },
            hasPermissions: [
                'view_website'
            ],
        },
        // {
        //     id: "payemntSettings",
        //     label: "Payment Settings",
        //     icon: "bx bx-cog",
        //     link: route('organizer.events.settings.payment.index'),
        //     stateVariables: IspayemntSettings,
        //     click: function (e: any) {
        //         e.preventDefault();
        //         setIspayemntSettings(!IspayemntSettings);
        //         setIscurrentState('payemntSettings');
        //         updateIconSidebar(e);
        //     },
        //     hasPermissions: [
        //         'edit_payment_settings'
        //     ],
        // },
        {
            id: "tickets",
            label: "Tickets",
            icon: "bx bxs-server",
            link: "/#",
            stateVariables: isTickets,
            click: function (e: any) {
                e.preventDefault();
                setIsTickets(!isTickets);
                setIscurrentState('Tickets');
                updateIconSidebar(e);
            },
            hasAnyPermission: [
                'view_tickets',
            ],
            subItems: [
                {
                    id: "assignTickets",
                    label: "Assign Tickets",
                    link: route('organizer.events.attendee.tickets.assign', null),
                    parentId: "tickets",
                    hasPermissions: [
                        'assign_tickets',
                    ],
                },
                {
                    id: "upgradeTicket",
                    label: "Upgrade Tickets",
                    link: route('organizer.events.tickets.upgrade'),
                    parentId: "tickets",
                    hasPermissions: [
                        'refund_ticket',
                    ],
                },
                {
                    id: "refundTicket",
                    label: "Refund Tickets",
                    link: route('organizer.events.refund.tickets'),
                    parentId: "tickets",
                    hasPermissions: [
                        'refund_ticket',
                    ],
                },
            ]
        },
        // {
        //     id: "assignTickets",
        //     label: "Assign Tickets",
        //     icon: "bx bxs-server",
        //     link: route('organizer.events.attendee.tickets.assign', null),
        //     stateVariables: isAssignTicket,
        //     click: function (e: any) {
        //         e.preventDefault();
        //         setIsAssignTicket(!isAssignTicket);
        //         setIscurrentState('assignTickets');
        //         updateIconSidebar(e);
        //     },
        //     hasPermissions: [
        //         'assign_tickets',
        //     ],
        // },
        // {
        //     id: "refundTicket",
        //     label: "Refund Tickets",
        //     icon: "bx bxs-credit-card",
        //     link: route('organizer.events.refund.tickets'),
        //     stateVariables: isRefundTicket,
        //     click: function (e: any) {
        //         e.preventDefault();
        //         setIsTickets(!isRefundTicket);
        //         setIscurrentState('refundTicket');
        //         updateIconSidebar(e);
        //     },
        //     hasPermissions: [
        //         'refund_ticket'
        //     ],
        // },
        // {
        //     id: "upgradeTicket",
        //     label: "Upgrade Tickets",
        //     icon: "bx bxs-credit-card",
        //     link: route('organizer.events.tickets.upgrade'),
        //     stateVariables: isUpgradeTicket,
        //     click: function (e: any) {
        //         e.preventDefault();
        //         setIsTickets(!isUpgradeTicket);
        //         setIscurrentState('upgradeTicket');
        //         updateIconSidebar(e);
        //     },
        //     hasPermissions: [
        //         'refund_ticket'
        //     ],
        // },
        {
            id: "badgePrinting",
            label: "Badge Printing",
            icon: "bx bxs-printer",
            link: route('organizer.events.badge.print'),
            click: function (e: any) {
                e.preventDefault();
                updateIconSidebar(e);
            },
            hasPermissions: [
                'print_badges',
            ],
        },
        // ...(isEventStarted ? [{
        {
            id: "Questionnaire",
            label: "Questionnaire Form",
            icon: "bx bxs-notepad",
            link: route('organizer.events.settings.questionnaire-form.index'),
            stateVariables: isForm,
            click: function (e: any) {
                e.preventDefault();
                setIsQuestionnaireForm(!isForm);
                setIscurrentState('Questionnaire');
                updateIconSidebar(e);
            },
            hasPermissions: [
                'edit_questionnaire_form'
            ],
        },
        {
            id: "Questionnaire_response",
            label: "Questionnaire Response",
            icon: "bx bxs-notepad",
            link: route('organizer.events.settings.questionnaire-form.response'),
            stateVariables: isForm,
            click: function (e: any) {
                e.preventDefault();
                setIsQuestionnaireResponse(!isForm);
                setIscurrentState('Questionnaire_response');
                updateIconSidebar(e);
            },
            hasPermissions: [
                'questionnaire_response'
            ],
        },
        // }] : []),
    ];

    return <React.Fragment>{menuItems}</React.Fragment>;
};

export default Navdata;
