import React, { useEffect, useState } from "react";
import HasPermission from "../../Components/HasPermission";

const Navdata = () => {
    //state data
    const [isDashboard, setIsDashboard] = useState<boolean>(false);
    const [isUserManagement, setIsUserManagement] = useState<boolean>(false);
    const [isOrganizers, setIsOrganizers] = useState<boolean>(false);
    const [isPlatforms, setIsPlatforms] = useState<boolean>(false);
    const [isEventCategory, setIsEventCategory] = useState<boolean>(false);


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
        if (iscurrentState !== 'UserManagement') {
            setIsUserManagement(false);
        }
        if (iscurrentState !== 'Organizers') {
            setIsOrganizers(false);
        }
        if (iscurrentState !== 'Platforms') {
            setIsPlatforms(false);
        }
        if (iscurrentState !== 'Event Category') {
            setIsEventCategory(false);
        }
    }, [
        history,
        iscurrentState,
        isDashboard,
        isUserManagement,
        isOrganizers,
        isPlatforms,
        isEventCategory
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
                    link: route('admin.users.index'),
                    parentId: "dashboard",
                    hasAnyPermission: [
                        'view_users',
                        'create_users',
                        'edit_users',
                        'delete_users',
                    ]
                },
                {
                    id: "roles",
                    label: "Roles",
                    link: route('admin.roles.index'),
                    parentId: "dashboard",
                    hasAnyPermission: [
                        'view_roles',
                        'create_roles',
                        'edit_roles',
                        'delete_roles',
                    ]
                },
            ],
        },
        {
            id: "organizers",
            label: "Organizers",
            icon: "ri-group-fill",
            link: route('admin.organizers.index'),
            stateVariables: isOrganizers,
            click: function (e: any) {
                e.preventDefault();
                setIsOrganizers(!isOrganizers);
                setIscurrentState('Organizers');
                updateIconSidebar(e);
            }
        },
        {
            id: "platforms",
            label: "Platforms",
            icon: "ri-group-fill",
            link: route('admin.platforms.index'),
            stateVariables: isOrganizers,
            click: function (e: any) {
                e.preventDefault();
                setIsPlatforms(!isPlatforms);
                setIscurrentState('Platforms');
                updateIconSidebar(e);
            }
        },
        {
            id: "eventcategory",
            label: "Event Category",
            icon: "bx bx-category",
            link: route('admin.event-category.index'),
            stateVariables: isOrganizers,
            click: function (e: any) {
                e.preventDefault();
                setIsEventCategory(!isEventCategory);
                setIscurrentState('Event Category');
                updateIconSidebar(e);
            }
        },
    ];
    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
