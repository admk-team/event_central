import React, { useEffect, useState } from "react";

const Navdata = () => {
    //state data
    const [isDashboard, setIsDashboard] = useState<boolean>(false);
    const [isProgram, setIsProgram] = useState<boolean>(false);
    const [isSpeaker, setIsSpeaker] = useState<boolean>(false);
    const [isMore, setIsMore] = useState<boolean>(false);


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
        if (iscurrentState !== 'Program') {
            setIsProgram(false);
        }
        if (iscurrentState !== 'Speaker') {
            setIsSpeaker(false);
        }
        if (iscurrentState !== 'More') {
            setIsMore(false);
        }
    }, [
        history,
        iscurrentState,
        isDashboard,
        isProgram,
        isSpeaker,
        isMore
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
            link: "/#",
            stateVariables: isDashboard,
            click: function (e: any) {
                e.preventDefault();
                setIsDashboard(!isDashboard);
                setIscurrentState('Dashboard');
                updateIconSidebar(e);
            },
        },
        {
            id: "program",
            label: "Program",
            icon: "bx bx-heart",
            link: "/#",
            stateVariables: isProgram,
            click: function (e: any) {
                e.preventDefault();
                setIsProgram(!isProgram);
                setIscurrentState('Program');
                updateIconSidebar(e);
            },
        },
        {
            id: "speaker",
            label: "Speaker",
            icon: "bx bx-group",
            link: "/#",
            stateVariables: isSpeaker,
            click: function (e: any) {
                e.preventDefault();
                setIsSpeaker(!isSpeaker);
                setIscurrentState('Speaker');
                updateIconSidebar(e);
            },
        },
        {
            id: "more",
            label: "More",
            icon: "bx bx-info-circle",
            link: "/#",
            stateVariables: isMore,
            click: function (e: any) {
                e.preventDefault();
                setIsMore(!isMore);
                setIscurrentState('More');
                updateIconSidebar(e);
            },
        },
    ];
    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
