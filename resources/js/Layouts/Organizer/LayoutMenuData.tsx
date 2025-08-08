import React, { useEffect, useState } from "react";
import HasPermission from "../../Components/HasPermission";

const Navdata = () => {
    //state data
    const [isDashboard, setIsDashboard] = useState<boolean>(false);
    const [isEvents, setIsEvents] = useState<boolean>(false);
    const [isStaff, setIsStaff] = useState<boolean>(false);
    const [isPaymentSettings, setIsPaymentSettings] = useState<boolean>(false);
    const [isZohoSetting, setIsZohoSetting] = useState<boolean>(false);


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
        if (iscurrentState !== 'Events') {
            setIsEvents(false);
        }
        if (iscurrentState !== 'Staff') {
            setIsStaff(false);
        }
        if (iscurrentState !== 'PaymentSettings') {
            setIsPaymentSettings(false);
        }
        if (iscurrentState !== 'ZohoSettings') {
            setIsZohoSetting(false);
        }
    }, [
        history,
        iscurrentState,
        isDashboard,
        isEvents,
        isStaff,
        isPaymentSettings,
        isZohoSetting
    ]);

    const menuItems: any = [
        // {
        //     id: "dashboard",
        //     label: "Dashboards",
        //     icon: "bx bxs-dashboard",
        //     link: route('admin.dashboard'),
        //     stateVariables: isDashboard,
        //     click: function (e: any) {
        //         e.preventDefault();
        //         setIsDashboard(!isDashboard);
        //         setIscurrentState('Dashboard');
        //         updateIconSidebar(e);
        //     },
        // },
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
            },
            hasPermissions: [
                'view_events',
            ]
        },
        {
            id: "Staff",
            label: "Staff",
            icon: "bx bxs-user",
            link: "/#",
            stateVariables: isStaff,
            click: function (e: any) {
                e.preventDefault();
                setIsStaff(!isStaff);
                setIscurrentState('Staff');
                updateIconSidebar(e);
            },
            hasAnyPermission: [
                'view_users',
                'view_roles',
            ],
            subItems: [
                {
                    id: "Users",
                    label: "Users",
                    link: route('organizer.users.index'),
                    parentId: "Staff",
                    hasPermissions: [
                        'view_users',
                    ],
                },
                {
                    id: "roles",
                    label: "Roles",
                    link: route('organizer.roles.index'),
                    parentId: "Staff",
                    hasPermissions: [
                        'view_roles',
                    ],
                },
            ],
        },
        {
            id: "payment_settings",
            label: "Payment Settings",
            icon: "bx bxs-cog",
            link: route('organizer.settings.payment.index'),
            stateVariables: isPaymentSettings,
            click: function (e: any) {
                e.preventDefault();
                setIsDashboard(!isPaymentSettings);
                setIscurrentState('PaymentSettings');
                updateIconSidebar(e);
            },
            hasPermissions: [
                'edit_payment_settings',
            ]
        },
        {
            id: "zoho_settings",
            label: "Zoho Settings",
            icon: "bx bxs-cog",
            link: "/#",
            stateVariables: isZohoSetting,
            click: function (e: any) {
                e.preventDefault();
                setIsZohoSetting(!isZohoSetting);
                setIscurrentState('ZohoSettings');
                updateIconSidebar(e);
            },
            subItems: [
                {
                    id: "keys_connect_zoho",
                    label: "Zoho Keys & Connect",
                    link: route('organizer.zoho.index'),
                    parentId: "zoho_settings",
                },
                {
                    id: "sync_page_zoho",
                    label: "Zoho Sync Data",
                    link: route('organizer.zoho.sync.page'),
                    parentId: "zoho_settings",
                },
            ],
        },
    ];
    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
