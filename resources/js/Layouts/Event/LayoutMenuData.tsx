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
    const [IsQuestionnaireForm, setIsQuestionnaireForm] =
        useState<boolean>(false);
    const [IsWebsite, setIsWebsite] = useState<boolean>(false);
    const [IsSessionAttendance, setIsSessionAttendance] =
        useState<boolean>(false);
    const [IspayemntSettings, setIspayemntSettings] = useState<boolean>(false);
    const [isSettingsMenu, setIsSettingsMenu] = useState<boolean>(false);
    const [IsQuestionnaireResponse, setIsQuestionnaireResponse] =
        useState<boolean>(false);
    const [isAssignTicket, setIsAssignTicket] = useState<boolean>(false);
    const [isUpgradeTicket, setUpgradeTicket] = useState<boolean>(false);
    const [isRefferalLink, setIsRefferalLink] = useState<boolean>(false);
    const [isEventBadge, setIsEventBadge] = useState<boolean>(false);
    const [isBaseTemplate, setIsBaseTemplate] = useState<boolean>(false);
    const [isEmailTemplate, setIsEmailTemplate] = useState<boolean>(false);
    const [isChat, setIsChat] = useState<boolean>(false);
    const [isContactForm, setIsContactForm] = useState<boolean>(false);
    const [isReport, setIsReport] = useState<boolean>(false);
    const [isPrayerRequest, setIsPrayerRequest] = useState<boolean>(false);
    const [isPrivateRegister, setIsPrivateRegister] = useState<boolean>(false);
    const [isDemographic, setIsDemographic] = useState<boolean>(false);

    const [iscurrentState, setIscurrentState] = useState<any>("Dashboard");

    function updateIconSidebar(e: any) {
        if (e && e.target && e.target.getAttribute("sub-items")) {
            const ul: any = document.getElementById("two-column-menu");
            const iconItems: any = ul.querySelectorAll(".nav-icon.active");
            let activeIconItems = [...iconItems];
            activeIconItems.forEach((item) => {
                item.classList.remove("active");
                var id = item.getAttribute("sub-items");
                const getID: any = document.getElementById(id) as HTMLElement;
                if (getID) getID?.parentElement.classList.remove("show");
            });
        }
    }

    useEffect(() => {
        document.body.classList.remove("twocolumn-panel");
        if (iscurrentState !== "Dashboard") setIsDashboard(false);
        if (iscurrentState !== "Event") setIsEvent(false);
        if (iscurrentState !== "Content") setIsContent(false);
        if (iscurrentState !== "Report") setIsContent(false);
        if (iscurrentState !== "users") setIsAttendees(false);
        if (iscurrentState !== "registrationForm") setIsForm(false);
        if (iscurrentState !== "website") setIsWebsite(false);
        if (iscurrentState !== "Settings") setIsSettingsMenu(false);
        if (iscurrentState !== "payemntSettings") setIspayemntSettings(false);
        if (iscurrentState !== "sessionAttendance")
            setIsSessionAttendance(false);
        if (iscurrentState !== "Tickets") setIsTickets(false);
        // if (iscurrentState !== 'refundTicket') setIsRefundTicket(false);
        if (iscurrentState !== "Questionnaire") setIsQuestionnaireForm(false);
        if (iscurrentState !== "BaseTemplate") setIsBaseTemplate(false);
        if (iscurrentState !== "EmailTemplate") setIsEmailTemplate(false);
        if (iscurrentState !== "ContactForm") setIsContactForm(false);
        if (iscurrentState !== "refferal-link") setIsRefferalLink(false);
        if (iscurrentState !== "event_badge") setIsEventBadge(false);
        if (iscurrentState !== "prayer_request") setIsPrayerRequest(false);
        if (iscurrentState !== "chat") setIsChat(false);
        if (iscurrentState !== "private_registration") setIsPrivateRegister(false);
        if (iscurrentState !== "private_registration") setIsDemographic(false);
        if (iscurrentState !== "Questionnaire_response")
            setIsQuestionnaireResponse(false);
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
        isBaseTemplate,
        isEmailTemplate,
        isContactForm,
        // isRefundTicket,
        isTickets,
        isReport,
        isChat,
        isDemographic,
        // isAssignTicket,
        // isUpgradeTicket
    ]);

    // Dynamic current date
    const currentDate = new Date();
    const eventStartDate = currentEvent?.dates[0]?.date
        ? new Date(currentEvent.dates[0].date)
        : null;
    const isEventStarted = eventStartDate && currentDate >= eventStartDate;

    const menuItems: any = [
        {
            id: "dashboard",
            label: "Dashboard",
            icon: "bx bxs-dashboard",
            link: route("organizer.events.dashboard"),
            stateVariables: isDashboard,
            click: function (e: any) {
                e.preventDefault();
                setIsDashboard(!isDashboard);
                setIscurrentState("Dashboard");
                updateIconSidebar(e);
            },
            hasPermissions: ["view_event_dashboard"],
        },
        {
            id: "demographic_detail",
            label: "DemoGraphic Detail",
            icon: "bx bxs-calendar-event",
            link: route("organizer.events.settings.event.index"),
            stateVariables: isDemographic,
            click: function (e: any) {
                e.preventDefault();
                setIsEvent(!isDemographic);
                setIscurrentState("Event");
                updateIconSidebar(e);
            },
            hasPermissions: ["edit_events"],
        },
        // {
        //     id: "demographic_detail",
        //     label: "DemoGraphic Detail",
        //     icon: "bx bxs-group",
        //     link: route("organizer.events.demographic-detail.index"),
        //     click: function (e: any) {
        //         e.preventDefault();
        //         setIscurrentState("demographic_detail");
        //         updateIconSidebar(e);
        //     },
        //     hasPermissions: ["view_demographic_detail"],
        // },
        {
            id: "attendees",
            label: "Event",
            icon: "bx bxs-calendar-event",
            link: route("organizer.events.settings.event.index"),
            stateVariables: isEvent,
            click: function (e: any) {
                e.preventDefault();
                setIsEvent(!isEvent);
                setIscurrentState("Event");
                updateIconSidebar(e);
            },
            hasPermissions: ["edit_events"],
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
                setIscurrentState("Content");
                updateIconSidebar(e);
            },
            hasAnyPermission: [
                "view_event_sessions",
                "view_speakers",
                "view_partner",
                "view_promo_code",
            ],
            subItems: [
                {
                    id: "schedule",
                    label: "Schedule",
                    link: route("organizer.events.schedule.index"),
                    parentId: "Content",
                    hasPermissions: ["view_event_sessions"],
                },
                {
                    id: "speakers",
                    label: "Speakers",
                    link: route("organizer.events.speaker.index"),
                    parentId: "Content",
                    hasPermissions: ["view_speakers"],
                },
                {
                    id: "partners",
                    label: "Partners",
                    link: route("organizer.events.partner.index"),
                    parentId: "Content",
                    hasPermissions: ["view_partner"],
                },
            ],
        },
        {
            id: "attendees",
            label: "Attendees",
            icon: "bx bxs-user-account",
            link: route("organizer.events.attendees.index"),
            stateVariables: isAttendees,
            click: function (e: any) {
                e.preventDefault();
                setIsAttendees(!isAttendees);
                setIscurrentState("users");
                updateIconSidebar(e);
            },
            hasPermissions: ["view_attendees"],
        },
        {
            id: "payments",
            label: "Payments",
            icon: "bx bxs-credit-card",
            link: route("organizer.events.payments"),
            stateVariables: isAttendees,
            click: function (e: any) {
                e.preventDefault();
                setIsTickets(!isTickets);
                setIscurrentState("payments");
                updateIconSidebar(e);
            },
            hasPermissions: ["view_payments"],
        },

        {
            id: "registrationForm",
            label: "Registration Form",
            icon: "bx bxs-user-plus",
            link: route("organizer.events.settings.registration-form.index"),
            stateVariables: isForm,
            click: function (e: any) {
                e.preventDefault();
                setIsForm(!isForm);
                setIscurrentState("registrationForm");
                updateIconSidebar(e);
            },
            hasPermissions: ["edit_registration_form"],
        },
        ...(isEventStarted
            ? [
                  {
                      id: "sessionAttendance",
                      label: "Sessions Attendance",
                      icon: "bx bx-calendar-check",
                      link: route("organizer.events.attendance.index"),
                      stateVariables: IsSessionAttendance,
                      click: function (e: any) {
                          e.preventDefault();
                          setIsSessionAttendance(!IsSessionAttendance);
                          setIscurrentState("sessionAttendance");
                          updateIconSidebar(e);
                      },
                      hasPermissions: ["view_session_attendence"],
                  },
              ]
            : []),
        {
            id: "website",
            label: "Website",
            icon: "bx bx-globe",
            link: route("organizer.events.settings.website.index"),
            stateVariables: IsWebsite,
            click: function (e: any) {
                e.preventDefault();
                setIsWebsite(!IsWebsite);
                setIscurrentState("website");
                updateIconSidebar(e);
            },
            hasPermissions: ["view_website"],
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
                setIscurrentState("Tickets");
                updateIconSidebar(e);
            },
            hasAnyPermission: [
                "view_tickets",
                "view_tickets",
                "view_add_on",
                "view_ticket_fee",
            ],
            subItems: [
                {
                    id: "tickets",
                    label: "Tickets",
                    link: route("organizer.events.tickets.index"),
                    parentId: "Content",
                    hasPermissions: ["view_tickets"],
                },
                {
                    id: "ticket-fees",
                    label: "Ticket Fees",
                    link: route("organizer.events.ticket-fees.index"),
                    parentId: "Content",
                    hasPermissions: [
                        "view_ticket_fee", //To be changed after permission added
                    ],
                },
                {
                    id: "ticket-addons",
                    label: "Ticket Add-ons",
                    link: route("organizer.events.addon.index"),
                    parentId: "Content",
                    hasPermissions: [
                        "view_add_on", //To be changed after permission added
                    ],
                },
                {
                    id: "promo-codes",
                    label: "Promo Codes",
                    link: route("organizer.events.promo-codes.index"),
                    parentId: "Content",
                    hasPermissions: ["view_promo_code"],
                },
                {
                    id: "assignTickets",
                    label: "Assign Tickets",
                    link: route(
                        "organizer.events.attendee.tickets.assign",
                        null
                    ),
                    parentId: "tickets",
                    hasPermissions: ["assign_tickets"],
                },
                {
                    id: "upgradeTicket",
                    label: "Upgrade Tickets",
                    link: route("organizer.events.tickets.upgrade"),
                    parentId: "tickets",
                    hasPermissions: ["refund_ticket"],
                },
                {
                    id: "refundTicket",
                    label: "Refund Tickets",
                    link: route("organizer.events.refund.tickets"),
                    parentId: "tickets",
                    hasPermissions: ["refund_ticket"],
                },
                {
                    id: "purchasedNotification",
                    label: "Purchased Notification",
                    link: route(
                        "organizer.events.purchased-ticket.notification"
                    ),
                    parentId: "tickets",
                },
            ],
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
            link: route("organizer.events.badge.print"),
            click: function (e: any) {
                e.preventDefault();
                updateIconSidebar(e);
            },
            hasPermissions: ["print_badges"],
        },
        // ...(isEventStarted ? [{

        {
            id: "chat",
            label: "Chat Room",
            icon: "bx bx-message-rounded-dots",
            link: route("organizer.events.chat.index"),
            stateVariables: isForm,
            click: function (e: any) {
                e.preventDefault();
                setIsChat(!isForm);
                setIscurrentState("chat");
                updateIconSidebar(e);
            },
            hasPermissions: ["view_chat"],
        },
        {
            id: "Questionnaire",
            label: "Questionnaire Form",
            icon: "bx bxs-notepad",
            link: route("organizer.events.settings.questionnaire-form.index"),
            stateVariables: isForm,
            click: function (e: any) {
                e.preventDefault();
                setIsQuestionnaireForm(!isForm);
                setIscurrentState("Questionnaire");
                updateIconSidebar(e);
            },
            hasPermissions: ["edit_questionnaire_form"],
        },
        {
            id: "Questionnaire_response",
            label: "Questionnaire Response",
            icon: "bx bxs-notepad",
            link: route(
                "organizer.events.settings.questionnaire-form.response"
            ),
            stateVariables: isForm,
            click: function (e: any) {
                e.preventDefault();
                setIsQuestionnaireResponse(!isForm);
                setIscurrentState("Questionnaire_response");
                updateIconSidebar(e);
            },
            hasPermissions: ["questionnaire_response"],
        },
        {
            id: "EmailCampaign",
            label: "Email Campaign",
            icon: "bx bxs-envelope",
            link: route("organizer.events.email-campaign.index"),
            click: function (e: any) {
                e.preventDefault();
                setIscurrentState("EmailCampaign");
                updateIconSidebar(e);
            },
            hasPermissions: ["view_email_campaign"],
        },
        {
            id: "BaseTemplate",
            label: "Default Email Template",
            icon: "bx bxs-envelope",
            link: route("organizer.events.base.template"),
            click: function (e: any) {
                e.preventDefault();
                setIscurrentState("BaseTemplate");
                updateIconSidebar(e);
            },
            hasPermissions: ["view_default_email_template"],
        },
        {
            id: "EmailTemplate",
            label: "Email Template",
            icon: "bx bxs-envelope",
            link: route("organizer.events.email-template.index"),
            click: function (e: any) {
                e.preventDefault();
                setIscurrentState("EmailTemplate");
                updateIconSidebar(e);
            },
            hasPermissions: ["view_email_template"],
        },
        {
            id: "ContactForm",
            label: "Contact Form",
            icon: "bx  bxs-contact",
            link: route("organizer.events.contact-forms.index"),
            click: function (e: any) {
                e.preventDefault();
                setIscurrentState("ContactForm");
                updateIconSidebar(e);
            },
            hasPermissions: ["view_contact_form"],
        },
        {
            id: "refferal_link",
            label: "Referral Link",
            icon: "bx bx-share-alt",
            link: route('organizer.events.refferal-link.index'),
            stateVariables: isRefferalLink,
            click: function (e: any) {
                e.preventDefault();
                setIsRefferalLink(!isRefferalLink);
                setIscurrentState('refferal-link');
                updateIconSidebar(e);
            },
            hasPermissions: [
                'view_referral_link'
            ],
        },
        {
            id: "event_badge",
            label: "Event Badges",
            icon: "bx bx-badge",
            link: route('organizer.events.badge.index'),
            stateVariables: isEventBadge,
            click: function (e: any) {
                e.preventDefault();
                setIsRefferalLink(!isEventBadge);
                setIscurrentState('event_badge');
                updateIconSidebar(e);
            },
            hasPermissions: [
                'view_event_badge'
            ],
        },{
            id: "Report",
            label: "Reports",
            icon: "bx bxs-report",
            link: "/#",
            stateVariables: isReport,
            click: function (e: any) {
                e.preventDefault();
                setIsReport(!isReport);
                setIscurrentState("Report");
                updateIconSidebar(e);
            },
            hasAnyPermission: [
                "view_attendee_report",
                "view_ticket_report",
                "view_session_report",
                "view_refund_ticket_report",
            ],
            subItems: [
                {
                    id: "attendeeReport",
                    label: "Attendee",
                    link: route("organizer.events.report.attendee.index"),
                    parentId: "Report",
                    hasPermissions: ["view_attendee_report"],
                },
                {
                    id: "sessionReport",
                    label: "Session",
                    link: route("organizer.events.report.session.index"),
                    parentId: "Report",
                    hasPermissions: ["view_session_report"],
                },
                {
                    id: "ticketReport",
                    label: "Ticket",
                    link: route("organizer.events.report.ticket.index"),
                    parentId: "Report",
                    hasPermissions: ["view_ticket_report"],
                },
                {
                    id: "refundTicketReport",
                    label: "Refund Ticket",
                    link: route("organizer.events.report.refund-ticket.index"),
                    parentId: "Report",
                    hasPermissions: ["view_refund_ticket_report"],
                },
            ],
        },
        // {
        //     id: "prayer_request",
        //     label: "Prayer Request Report",
        //     icon: "bx bx-donate-heart",
        //     link: route('organizer.prayer-requests.index'),
        //     stateVariables: isPrayerRequest,
        //     click: function (e: any) {
        //         e.preventDefault();
        //         setIsPrayerRequest(!isPrayerRequest);
        //         setIscurrentState('prayer_request');
        //         updateIconSidebar(e);
        //     },
        //     hasPermissions: [
        //         'view_prayer_request'
        //     ],
        // },

          {
            id: "private_registration",
            label: "Private Registration",
            icon: "bx bxs-notepad",
            link: route('organizer.private-registration.index'),
            stateVariables: isPrivateRegister,
            click: function (e: any) {
                e.preventDefault();
                setIsPrivateRegister(!isPrivateRegister);
                setIscurrentState('private_registration');
                updateIconSidebar(e);
            },
            hasPermissions: [
                'view_private_registration'
            ],
        },

        // }] : []),
    ];

    return <React.Fragment>{menuItems}</React.Fragment>;
};

export default Navdata;
