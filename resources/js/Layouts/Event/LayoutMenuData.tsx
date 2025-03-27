import React, { useEffect, useState } from "react";

const Navdata = () => {
    //state data
    const [isDashboard, setIsDashboard] = useState<boolean>(false);
    // const [IsQA, setIsQA] = useState<boolean>(false);
    const [isContent, setIsContent] = useState<boolean>(false);
    const [isEngagement, setIsEngagement] = useState<boolean>(false);
    const [isAttendees, setIsAttendees] = useState<boolean>(false);
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
        if (iscurrentState !== 'Dashboard') {
            setIsDashboard(false);
        }
        if (iscurrentState !== 'Content') {
            setIsContent(false);
        }
        if (iscurrentState !== 'users') {
            setIsAttendees(false);
        }
        if (iscurrentState !== 'Settings') {
            setIsSettingsMenu(false);
        }
        // if (iscurrentState !== 'Q&A') {
        //     setIsQA(false);
        // }
        // Add Here
    }, [
        iscurrentState,
        isDashboard,
        isAttendees,
        isSettingsMenu,
        // Add Here
    ]);

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
                {
                    id: "schedule",
                    label: "Schedule",
                    link: route('organizer.events.schedule.index'),
                    parentId: "Content",
                },
                {
                    id: "speakers",
                    label: "Speakers",
                    link: route('organizer.events.speaker.index'),
                    parentId: "Content",
                },
                {
                    id: "partners",
                    label: "Partners",
                    link: route('organizer.events.partner.index'),
                    parentId: "Content",
                },
                {
                    id: "tickets",
                    label: "Tickets",
                    link: route('organizer.events.tickets.index'),
                    parentId: "Content",
                },
                {
                    id: "addons",
                    label: "Ticket Add-ons",
                    link: route('organizer.events.addon.index'),
                    parentId: "Content",
                },
                {
                    id: "promo-codes",
                    label: "Promo Codes",
                    link: route('organizer.events.promo-codes.index'),
                    parentId: "Content",
                },
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
                {
                    id: "newsfeed",
                    label: "Posts",
                    link: route('organizer.events.engagement.newsfeed.index'),
                    parentId: "dashboard",
                }
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
            id: "settings",
            label: "Settings",
            icon: "bx bx-cog",
            link: "/#",
            stateVariables: isSettingsMenu,
            click: function (e: any) {
                e.preventDefault();
                setIsSettingsMenu(!isSettingsMenu);
                setIscurrentState('Settings');
                updateIconSidebar(e);
            },
            subItems: [
                {
                    id: "eventSettings",
                    label: "Event",
                    link: route('organizer.events.settings.event.index'),
                    parentId: "dashboard",
                },
                {
                    id: "payemntSettings",
                    label: "Payment Settings",
                    link: route('organizer.events.settings.payment.index'),
                    parentId: "dashboard",
                },
                {
                    id: "registrationForm",
                    label: "Registration Form",
                    link: route('organizer.events.settings.registration-form.index'),
                    parentId: "settings",
                },
                {
                    id: "website",
                    label: "Website",
                    link: route('organizer.events.settings.website.index'),
                    parentId: "settings",
                },
            ]
        },
        // {
        //     id: "qa",
        //     label: "Q&A",
        //     icon: "bx bxs-dashboard",
        //     link: route('organizer.events.qa.index'),
        //     stateVariables: IsQA,
        //     click: function (e: any) {
        //         e.preventDefault();
        //         setIsQA(!IsQA);
        //         setIscurrentState('Q&A');
        //         updateIconSidebar(e);
        //     }
        // },
    ];
    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
