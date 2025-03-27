import { usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

const Navdata = () => {
    const currentEvent = usePage().props.currentEvent as any;
    console.log("Event Start Date:", currentEvent?.dates[0]?.date);

    // State data
    const [isDashboard, setIsDashboard] = useState<boolean>(false);
    const [isContent, setIsContent] = useState<boolean>(false);
    const [isEngagement, setIsEngagement] = useState<boolean>(false);
    const [isAttendees, setIsAttendees] = useState<boolean>(false);
    const [isEvent, setIsEvent] = useState<boolean>(false);
    const [isForm, setIsForm] = useState<boolean>(false);
    const [IsWebsite, setIsWebsite] = useState<boolean>(false);
    const [IsSessionAttendance, setIsSessionAttendance] = useState<boolean>(false);
    const [IspayemntSettings, setIspayemntSettings] = useState<boolean>(false);
    const [isSettingsMenu, setIsSettingsMenu] = useState<boolean>(false);

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
    ]);

    // Dynamic current date
    const currentDate = new Date();
    const eventStartDate = currentEvent?.dates[0]?.date ? new Date(currentEvent.dates[0].date) : null;
    const isEventStarted = eventStartDate && currentDate >= eventStartDate;

    const menuItems: any = [
        {
            label: "Menu",
            isHeader: true,
        },
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
            }
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
            subItems: [
                { id: "schedule", label: "Schedule", link: route('organizer.events.schedule.index'), parentId: "Content" },
                { id: "speakers", label: "Speakers", link: route('organizer.events.speaker.index'), parentId: "Content" },
                { id: "partners", label: "Partners", link: route('organizer.events.partner.index'), parentId: "Content" },
                { id: "tickets", label: "Tickets", link: route('organizer.events.tickets.index'), parentId: "Content" },
                { id: "ticket-addons", label: "Ticket Add-ons", link: route('organizer.events.tickets-feature.index'), parentId: "Content" },
                { id: "promo-codes", label: "Promo Codes", link: route('organizer.events.promo-codes.index'), parentId: "Content" },
            ]
        },
        {
            id: "engagement",
            label: "Engagement",
            icon: "bx bx-share-alt",
            link: "/#",
            stateVariables: isEngagement,
            click: function (e: any) {
                e.preventDefault();
                setIsEngagement(!isEngagement);
                setIscurrentState('engagement');
                updateIconSidebar(e);
            },
            subItems: [
                { id: "newsfeed", label: "Posts", link: route('organizer.events.engagement.newsfeed.index'), parentId: "dashboard" }
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
        },
        {
            id: "payemntSettings",
            label: "Payment Settings",
            icon: "bx bx-cog",
            link: route('organizer.events.settings.payment.index'),
            stateVariables: IspayemntSettings,
            click: function (e: any) {
                e.preventDefault();
                setIspayemntSettings(!IspayemntSettings);
                setIscurrentState('payemntSettings');
                updateIconSidebar(e);
            },
        },
    ];

    return <React.Fragment>{menuItems}</React.Fragment>;
};

export default Navdata;