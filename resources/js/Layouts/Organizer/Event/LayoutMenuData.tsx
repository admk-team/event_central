import React, { useEffect, useState } from "react";

const Navdata = () => {
    //state data
    const [isDashboard, setIsDashboard] = useState<boolean>(false);
    const [isContent, setIsContent] = useState<boolean>(false);
    const [isEngagement, setIsEngagement] = useState<boolean>(false);
    const [isUsers, setIsUsers] = useState<boolean>(false);
    const [isSettings, setIsSettings] = useState<boolean>(false);

    const [isApps, setIsApps] = useState<boolean>(false);
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [isPages, setIsPages] = useState<boolean>(false);
    const [isBaseUi, setIsBaseUi] = useState<boolean>(false);
    const [isAdvanceUi, setIsAdvanceUi] = useState<boolean>(false);
    const [isForms, setIsForms] = useState<boolean>(false);
    const [isTables, setIsTables] = useState<boolean>(false);
    const [isCharts, setIsCharts] = useState<boolean>(false);
    const [isIcons, setIsIcons] = useState<boolean>(false);
    const [isMaps, setIsMaps] = useState<boolean>(false);
    const [isMultiLevel, setIsMultiLevel] = useState<boolean>(false);

    // Apps
    const [isCalendar, setCalendar] = useState<boolean>(false);
    const [isEmail, setEmail] = useState<boolean>(false);
    const [isSubEmail, setSubEmail] = useState<boolean>(false);
    const [isEcommerce, setIsEcommerce] = useState<boolean>(false);
    const [isProjects, setIsProjects] = useState<boolean>(false);
    const [isTasks, setIsTasks] = useState<boolean>(false);
    const [isCRM, setIsCRM] = useState<boolean>(false);
    const [isCrypto, setIsCrypto] = useState<boolean>(false);
    const [isInvoices, setIsInvoices] = useState<boolean>(false);
    const [isSupportTickets, setIsSupportTickets] = useState<boolean>(false);
    const [isNFTMarketplace, setIsNFTMarketplace] = useState<boolean>(false);
    const [isJobs, setIsJobs] = useState<boolean>(false);
    const [isJobList, setIsJobList] = useState<boolean>(false);
    const [isCandidateList, setIsCandidateList] = useState<boolean>(false);


    // Authentication
    const [isSignIn, setIsSignIn] = useState<boolean>(false);
    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const [isPasswordReset, setIsPasswordReset] = useState<boolean>(false);
    const [isPasswordCreate, setIsPasswordCreate] = useState<boolean>(false);
    const [isLockScreen, setIsLockScreen] = useState<boolean>(false);
    const [isLogout, setIsLogout] = useState<boolean>(false);
    const [isSuccessMessage, setIsSuccessMessage] = useState<boolean>(false);
    const [isVerification, setIsVerification] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    // Pages
    const [isProfile, setIsProfile] = useState<boolean>(false);
    const [isLanding, setIsLanding] = useState<boolean>(false);
    const [isBlog, setIsBlog] = useState<boolean>(false);

    // Charts
    const [isApex, setIsApex] = useState<boolean>(false);

    // Multi Level
    const [isLevel1, setIsLevel1] = useState<boolean>(false);
    const [isLevel2, setIsLevel2] = useState<boolean>(false);
    const [isUserManagement, setisUserManagement] = useState<boolean>(false);

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
            setisUserManagement(false);
        }
        if (iscurrentState !== 'content') {
            setIsContent(false);
        }
    }, [
        history,
        iscurrentState,
        isDashboard,
        isApps,
        isAuth,
        isPages,
        isBaseUi,
        isAdvanceUi,
        isForms,
        isTables,
        isCharts,
        isIcons,
        isMaps,
        isMultiLevel
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
        },
        {
            id: "settings",
            label: "Settings",
            icon: "bx bx-cog",
            link: "/#",
            stateVariables: isSettings,
            click: function (e: any) {
                e.preventDefault();
                setIsSettings(!isSettings);
                setIscurrentState('settings');
                updateIconSidebar(e);
            },
        }

    ];
    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
