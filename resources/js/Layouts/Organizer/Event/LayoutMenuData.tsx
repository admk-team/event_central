import React, { useEffect, useState } from "react";

const Navdata = () => {
    //state data
    const [isDashboard, setIsDashboard] = useState<boolean>(false);
    const [isContent, setIsContent] = useState<boolean>(false);
    const [isSettings, setIsSettings] = useState<boolean>(false);

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
    }, [
        history,
        iscurrentState,
        isDashboard,
        isSettings
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
                updateIconSidebar(e);
            },
            subItems: [
                {
                    id: "eventSettings",
                    label: "Event",
                    link: route('organizer.events.settings.event.index'),
                    parentId: "settings",
                },
            ]

        }
    ];
    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
