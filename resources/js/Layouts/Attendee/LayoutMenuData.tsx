import { usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

const Navdata = () => {
    const eventApp: any = usePage().props.eventApp;
    //state data
    const [isDashboard, setIsDashboard] = useState<boolean>(false);
    const [isProgram, setIsProgram] = useState<boolean>(false);
    const [isSpeakers, setIsSpeakers] = useState<boolean>(false);
    const [isPost, setIsPost] = useState<boolean>(false);
    const [isMore, setIsMore] = useState<boolean>(false);
    const [isQr, setIsQr] = useState<boolean>(false);

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
                if (getID) getID?.parentElement.classList.remove("show");
            });
        }
    }

    useEffect(() => {
        document.body.classList.remove("twocolumn-panel");
        if (iscurrentState !== "Dashboard") {
            setIsDashboard(false);
        }
        if (iscurrentState !== "Program") {
            setIsProgram(false);
        }
        if (iscurrentState !== "Speaker") {
            setIsSpeakers(false);
        }
        if (iscurrentState !== "More") {
            setIsMore(false);
        }
        if (iscurrentState !== 'Qr') {
            setIsQr(false);
        }
        if (iscurrentState !== "Posts") {
            setIsPost(false);
        }
    }, [
        history,
        iscurrentState,
        isDashboard,
        isProgram,
        isSpeakers,
        isMore,
        isQr,
        isPost,
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
            link: route("attendee.event.detail.dashboard", eventApp.id),
            stateVariables: isDashboard,
            click: function (e: any) {
                e.preventDefault();
                setIsDashboard(!isDashboard);
                setIscurrentState("Dashboard");
                updateIconSidebar(e);
            },
        },
        {
            id: "program",
            label: "Program",
            icon: "bx bx-heart",
            link: route("attendee.event.detail.agenda", eventApp.id),
            stateVariables: isProgram,
            click: function (e: any) {
                e.preventDefault();
                setIsProgram(!isProgram);
                setIscurrentState("Program");
                updateIconSidebar(e);
            },
        },
        {
            id: "speaker",
            label: "Speaker",
            icon: "bx bx-group",
            link: route("attendee.event.detail.speakers", eventApp.id),
            stateVariables: isSpeakers,
            click: function (e: any) {
                e.preventDefault();
                setIsSpeakers(!isSpeakers);
                setIscurrentState("Speakers");
                updateIconSidebar(e);
            },
        },
        {
            id: "posts",
            label: "Posts",
            icon: "bx bx-group",
            link: route("attendee.posts.index", eventApp.id),
            stateVariables: isPost,
            click: function (e: any) {
                e.preventDefault();
                setIsPost(!isPost);
                setIscurrentState("Posts");
                updateIconSidebar(e);
            },
        },
        {
            id: "more",
            label: "More",
            icon: "bx bx-info-circle",
            link: route("attendee.event.detail.more", eventApp.id),
            stateVariables: isMore,
            click: function (e: any) {
                e.preventDefault();
                setIsMore(!isMore);
                setIscurrentState("More");
                updateIconSidebar(e);
            },
        },
        {
            id: "tickets",
            label: "Tickets",
            icon: "bx bx-qr",
            link: route('attendee.tickets.get', eventApp.id),
            stateVariables: isMore,
            click: function (e: any) {
                e.preventDefault();
                setIsMore(!isMore);
                setIscurrentState('More');
                updateIconSidebar(e);
            },
        },
        // {
        //     id: "checkout",
        //     label: "Checkout",
        //     icon: "bx bx-qr",
        //     link: route('attendee.checkout.get', eventApp.id),
        //     stateVariables: isMore,
        //     click: function (e: any) {
        //         e.preventDefault();
        //         setIsMore(!isMore);
        //         setIscurrentState('More');
        //         updateIconSidebar(e);
        //     },
        // },
        // {
        //     id: "qr-code",
        //     label: "QR Code",
        //     icon: "bx bx-qr",
        //     link: route('attendee.qr-code.get', eventApp.id),
        //     stateVariables: isMore,
        //     click: function (e: any) {
        //         e.preventDefault();
        //         setIsMore(!isMore);
        //         setIscurrentState('More');
        //         updateIconSidebar(e);
        //     },
        // },
    ];
    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
