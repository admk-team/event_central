import React, { useEffect, useState } from "react";
import HasPermission from "../../Components/HasPermission";
import { useLaravelReactI18n } from "laravel-react-i18n";
const Navdata = () => {
    //state data
    const [isDashboard, setIsDashboard] = useState<boolean>(false);
    const [isEvents, setIsEvents] = useState<boolean>(false);
    const [isStaff, setIsStaff] = useState<boolean>(false);
    const [isPaymentSettings, setIsPaymentSettings] = useState<boolean>(false);
    const [isZohoSetting, setIsZohoSetting] = useState<boolean>(false);
    const [isLiveStreamSettings, setIsLiveStreamSettings] =
        useState<boolean>(false);
    const { t } = useLaravelReactI18n();

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
        if (iscurrentState !== "Dashboard") {
            setIsDashboard(false);
        }
        if (iscurrentState !== "Events") {
            setIsEvents(false);
        }
        if (iscurrentState !== "Staff") {
            setIsStaff(false);
        }
        if (iscurrentState !== "PaymentSettings") {
            setIsPaymentSettings(false);
        }
        if (iscurrentState !== "ZohoSettings") {
            setIsZohoSetting(false);
        }
        if (iscurrentState !== "LiveStreamSettings") {
            setIsLiveStreamSettings(false);
        }
    }, [
        history,
        iscurrentState,
        isDashboard,
        isEvents,
        isStaff,
        isPaymentSettings,
        isZohoSetting,
        isLiveStreamSettings,
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
            label: t('Events'),
            icon: "bx bxs-calendar-event",
            link: route("organizer.events.index"),
            stateVariables: isEvents,
            click: function (e: any) {
                e.preventDefault();
                setIsDashboard(!isEvents);
                setIscurrentState("Events");
                updateIconSidebar(e);
            },
            hasPermissions: ["view_events"],
        },
        {
            id: "Staff",
            label: t('Staff'),
            icon: "bx bxs-user",
            link: "/#",
            stateVariables: isStaff,
            click: function (e: any) {
                e.preventDefault();
                setIsStaff(!isStaff);
                setIscurrentState("Staff");
                updateIconSidebar(e);
            },
            hasAnyPermission: ["view_users", "view_roles"],
            subItems: [
                {
                    id: "Users",
                    label: t('Users'),
                    link: route("organizer.users.index"),
                    parentId: "Staff",
                    hasPermissions: ["view_users"],
                },
                {
                    id: "roles",
                    label: t('Roles'),
                    link: route("organizer.roles.index"),
                    parentId: "Staff",
                    hasPermissions: ["view_roles"],
                },
            ],
        },
        {
            id: "payment_settings",
            label: t('Payment Settings'),
            icon: "bx bxs-cog",
            link: route("organizer.settings.payment.index"),
            stateVariables: isPaymentSettings,
            click: function (e: any) {
                e.preventDefault();
                setIsDashboard(!isPaymentSettings);
                setIscurrentState("PaymentSettings");
                updateIconSidebar(e);
            },
            hasPermissions: ["edit_payment_settings"],
        },
        {
            id: "zoho_settings",
            label: t('Zoho Settings'),
            icon: "bx bxs-cog",
            link: "/#",
            stateVariables: isZohoSetting,
            click: function (e: any) {
                e.preventDefault();
                setIsZohoSetting(!isZohoSetting);
                setIscurrentState("ZohoSettings");
                updateIconSidebar(e);
            },
            subItems: [
                {
                    id: "keys_connect_zoho",
                    label: t('Zoho Keys & Connect'),
                    link: route("organizer.zoho.index"),
                    parentId: "zoho_settings",
                },
                {
                    id: "sync_page_zoho",
                    label: t('Zoho Sync Data'),
                    link: route("organizer.zoho.sync.page"),
                    parentId: "zoho_settings",
                },
            ],
        },
        // {
        //     id: "liveStreamSettings",
        //     label: "Live Stream Settings",
        //     icon: "bx bx-broadcast",
        //     link: route('organizer.settings.live-stream.index'),
        //     stateVariables: isLiveStreamSettings,
        //     click: function (e: any) {
        //         e.preventDefault();
        //         setIsDashboard(!isLiveStreamSettings);
        //         setIscurrentState('LiveStreamSettings');
        //         updateIconSidebar(e);
        //     },
        //     hasPermissions: [
        //         'edit_live_stream_settings',
        //     ]
        // },
    ];
    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
