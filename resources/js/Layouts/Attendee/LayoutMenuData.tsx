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
    const [purchaseTickets, setPurchaseTickets] = useState<boolean>(false);

    const [iscurrentState, setIscurrentState] = useState<any>("Dashboard");
    // const [IsQA, setIsQA] = useState<boolean>(false);

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
        if (iscurrentState !== "Purchase") {
            setPurchaseTickets(false);
        }
        // if (iscurrentState !== "Q&A") {
        //     setIsQA(false);
        // }
    }, [
        history,
        iscurrentState,
        isDashboard,
        isProgram,
        isSpeakers,
        isMore,
        isQr,
        isPost,
        purchaseTickets
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
            link: route("attendee.event.detail.dashboard"),
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
            label: "Event Agenda",
            icon: "bx bx-heart",
            link: route("attendee.event.detail.agenda"),
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
            link: route("attendee.event.detail.speakers"),
            stateVariables: isSpeakers,
            click: function (e: any) {
                e.preventDefault();
                setIsSpeakers(!isSpeakers);
                setIscurrentState("Speakers");
                updateIconSidebar(e);
            },
        },
        {
            id: "more",
            label: "Contact",
            icon: "bx bx-info-circle",
            link: route("attendee.event.detail.more"),
            stateVariables: isMore,
            click: function (e: any) {
                e.preventDefault();
                setIsMore(!isMore);
                setIscurrentState("More");
                updateIconSidebar(e);
            },
        },
        {
            id: "purchase-tickets",
            label: "Purchase Tickets",
            icon: "bx bxs-credit-card",
            link: route("attendee.purchase.tickets"),
            stateVariables: purchaseTickets,
            click: function (e: any) {
                e.preventDefault();
                setPurchaseTickets(!purchaseTickets);
                setIscurrentState("Purchase");
                updateIconSidebar(e);
            },
        },
        {
            id: "tickets",
            label: "Tickets",
            icon: "bx bx-qr",
            link: route("attendee.tickets.get"),
            stateVariables: isMore,
            click: function (e: any) {
                e.preventDefault();
                setIsMore(!isMore);
                setIscurrentState("More");
                updateIconSidebar(e);
            },
        },
        // {
        //     id: "attendee-pass",
        //     label: "Attendee Pass",
        //     icon: "bx bx-qr",
        //     link: route("attendee.pass.get"),
        //     stateVariables: isMore,
        //     click: function (e: any) {
        //         e.preventDefault();
        //         setIsMore(!isMore);
        //         setIscurrentState("Pass");
        //         updateIconSidebar(e);
        //     },
        // },
        // {
        //     id: "qa",
        //     label: "Q&A",
        //     icon: "bx bxs-dashboard",
        //     link: route("attendee.events.qa.index"),
        //     stateVariables: IsQA,
        //     click: function (e: any) {
        //         e.preventDefault();
        //         setIsQA(!IsQA);
        //         setIscurrentState("Q&A");
        //         updateIconSidebar(e);
        //     },
        // },
    ];
    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
