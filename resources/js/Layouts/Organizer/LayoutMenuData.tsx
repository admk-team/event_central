import React, { useEffect, useState } from "react";
import HasPermission from "../../Components/HasPermission";

const Navdata = () => {
    //state data
    const [isDashboard, setIsDashboard] = useState<boolean>(false);
    const [isEvents, setIsEvents] = useState<boolean>(false);
    const [isUserManagement, setIsUserManagement] = useState<boolean>(false);


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
        if (iscurrentState !== 'Events') {
            setIsEvents(false);
        }
        if (iscurrentState !== 'UserManagement') {
            setIsUserManagement(false);
        }
    }, [
        history,
        iscurrentState,
        isDashboard,
        isEvents,
        isUserManagement,
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
            link: route('admin.dashboard'),
            stateVariables: isDashboard,
            click: function (e: any) {
                e.preventDefault();
                setIsDashboard(!isDashboard);
                setIscurrentState('Dashboard');
                updateIconSidebar(e);
            }
        },
        {
            id: "events",
            label: "Events",
            icon: "bx bxs-calendar-event",
            link: route('organizer.events.index'),
            stateVariables: isEvents,
            click: function (e: any) {
                e.preventDefault();
                setIsDashboard(!isEvents);
                setIscurrentState('Events');
                updateIconSidebar(e);
            }
        },
        {
            id: "UserManagement",
            label: "User Management",
            icon: "bx bxs-user",
            link: "/#",
            stateVariables: isUserManagement,
            click: function (e: any) {
                e.preventDefault();
                setIsUserManagement(!isUserManagement);
                setIscurrentState('UserManagement');
                updateIconSidebar(e);
            },
            subItems: [
                {
                    id: "Users",
                    label: "Users",
                    link: route('organizer.users.index'),
                    parentId: "UserManagement",
                },
                {
                    id: "roles",
                    label: "Roles",
                    link: route('organizer.roles.index'),
                    parentId: "UserManagement",
                },
            ],
        },
    ];
    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
