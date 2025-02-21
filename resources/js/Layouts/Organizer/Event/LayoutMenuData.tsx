import React, { useEffect, useState } from "react";

const Navdata = () => {
    //state data
    const [isDashboard, setIsDashboard] = useState<boolean>(false);
    const [isContent, setIsContent] = useState<boolean>(false);
    const [isUsers, setIsUsers] = useState<boolean>(false);
    const [isSettings, setIsSettings] = useState<boolean>(false);
    // Add Here

    const [iscurrentState, setIscurrentState] = useState<any>('Dashboard');

    function updateIconSidebar(e: any) {
        if (e && e.target && e.target.getAttribute("sub-items")) {
            const ul : any = document.getElementById("two-column-menu");
            const iconItems : any = ul.querySelectorAll(".nav-icon.active");
            let activeIconItems = [...iconItems];
            activeIconItems.forEach((item) => {
                item.classList.remove("active");
                var id = item.getAttribute("sub-items");
                const getID : any = document.getElementById(id) as HTMLElement;
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
        if (iscurrentState !== 'Settings') {
            setIsSettings(false);
        }
        if (iscurrentState !== 'users') {
            setIsUsers(false);
        }

        // Add Here
    }, [
        history,
        iscurrentState,
        isDashboard,
        isUsers,
        isSettings,
        
        // Add Here
    ]);

    const menuItems: any = [
        {
            label: "Menu",
            isHeader: true,
        },
        {
            id: "dashboard",
            label: "Dashboards",
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
            id: "content",
            label: "Content",
            icon: "bx bxs-user",
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
            ]

        },
        {
            id: "settings",
            label: "Settings",
            icon: "bx bxs-cog",
            link: "/#",
            stateVariables: isSettings,
            click: function (e: any) {
                e.preventDefault();
                setIsSettings(!isSettings);
                setIscurrentState('Settings');
            },
            subItems: [
                {
                    id: "eventSettings",
                    label: "Event",
                    link: route('organizer.events.settings.event.index'),
                    parentId: "settings",
                },
                {
                    id: "payemntSettings",
                    label: "Payment Settings",
                    link: route('organizer.events.settings.payment.index'),
                    parentId: "settings",
                },
            ]
        },
        {
            id: "users",
            label: "Users",
            icon: "bx bxs-user",
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
                    link: '#',
                    parentId: "dashboard",
                }
            ]

        }
    ];
    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
