import React, { useEffect, useState } from "react";

const Navdata = () => {
    //state data
    const [isDashboard, setIsDashboard] = useState<boolean>(false);
    const [isContent, setIsContent] = useState<boolean>(false);
    const [isEngagement, setIsEngagement] = useState<boolean>(false);
    const [isUsers, setIsUsers] = useState<boolean>(false);
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
            setIsUsers(false);
        }
        if (iscurrentState !== 'Settings') {
            setIsSettingsMenu(false);
        }
        // Add Here
    }, [
        iscurrentState,
        isDashboard,
        isUsers,
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
                    parentId: "dashboard",
                },
                {
                    id: "speakers",
                    label: "Speakers",
                    link: route('organizer.events.speaker.index'),
                    parentId: "dashboard",
                },
                {
                    id: "workShops",
                    label: "WorkShops",
                    link: route('organizer.events.workshop.index'),
                    parentId: "dashboard",
                },
                {
                    id: "custom_menu",
                    label: "Custom menu",
                    link: route('organizer.events.custom-menu.index'),
                    parentId: "dashboard",
                },
                {
                    id: "partners",
                    label: "Partners",
                    link: route('organizer.events.partner.index'),
                    parentId: "dashboard",
                },
                {
                    id: "passes",
                    label: "Passes",
                    link: route('organizer.events.passes.index'),
                    parentId: "dashboard",
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
                    label: "Newsfeed",
                    link: route('organizer.events.engagement.newsfeed.index'),
                    parentId: "dashboard",
                }
            ]
        },
        {
            id: "users",
            label: "Users",
            icon: "bx bxs-user-account",
            link: "/#",
            stateVariables: isUsers,
            click: function (e: any) {
                e.preventDefault();
                setIsUsers(!isUsers);
                setIscurrentState('users');
                updateIconSidebar(e);
            },
            subItems: [
                {
                    id: "attendees",
                    label: "Attendees",
                    link: route('organizer.events.attendees.index'),
                    parentId: "dashboard",
                },
                {
                    id: "team",
                    label: "Team",
                    link: '/events/teams',
                    parentId: "dashboard",
                }
            ]
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
                    id: "website",
                    label: "Website",
                    link: route('organizer.events.settings.website.index'),
                    parentId: "settings",
                },
            ]
        },
    ];
    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
