import { usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

const Navdata = () => {

    const user: any = usePage().props.auth.user;
    const eventApp: any = usePage().props.eventApp;
    //state data
    const [isDashboard, setIsDashboard] = useState<boolean>(false);
    const [isProgram, setIsProgram] = useState<boolean>(false);
    const [isSpeakers, setIsSpeakers] = useState<boolean>(false);
    const [isPost, setIsPost] = useState<boolean>(false);
    const [isMore, setIsMore] = useState<boolean>(false);
    const [isQr, setIsQr] = useState<boolean>(false);

    const [iscurrentState, setIscurrentState] = useState<any>('Dashboard');
      const [IsQA, setIsQA] = useState<boolean>(false);

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
        if (iscurrentState !== 'Q&A') {
            setIsQA(false);
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
            link: route("attendee.event.detail.dashboard", user.event_app_id),
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
            link: route("attendee.event.detail.agenda", user.event_app_id),
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
            link: route("attendee.event.detail.speakers", user.event_app_id),
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
            link: route("attendee.posts.index", user.event_app_id),
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
            link: route("attendee.event.detail.more", user.event_app_id),
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
            link: route('attendee.tickets.get', user.event_app_id),
            stateVariables: isMore,
            click: function (e: any) {
                e.preventDefault();
                setIsMore(!isMore);
                setIscurrentState('More');
                updateIconSidebar(e);
            },
        },
        {
            id: "qa",
            label: "Q&A",
            icon: "bx bxs-dashboard",
            link: route('attendee.events.qa.index'),
            stateVariables: IsQA,
            click: function (e: any) {
                e.preventDefault();
                setIsQA(!IsQA);
                setIscurrentState('Q&A');
                updateIconSidebar(e);
            }
        },
    ];
    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
