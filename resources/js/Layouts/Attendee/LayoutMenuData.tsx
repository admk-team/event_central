import { usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { useLaravelReactI18n } from "laravel-react-i18n";
const Navdata = () => {
    const user: any = usePage().props.auth.user;
    const eventApp: any = usePage().props.eventApp;
    //state data
    const [isDashboard, setIsDashboard] = useState<boolean>(false);
    const [isProgram, setIsProgram] = useState<boolean>(false);
    const [isSpeakers, setIsSpeakers] = useState<boolean>(false);
    const [isPost, setIsPost] = useState<boolean>(false);
    const [isMore, setIsMore] = useState<boolean>(false);
    const [isUpgradeTicket, setIsUpgradeTicket] = useState<boolean>(false);
    const [isQr, setIsQr] = useState<boolean>(false);
    const [purchaseTickets, setPurchaseTickets] = useState<boolean>(false);
    const [questionnaire, setquestionnaire] = useState<boolean>(false);
    const [IsAchievement, setIsAchievement] = useState<boolean>(false);
    const [IsPrayerRequest, setIsPrayerRequest] = useState<boolean>(false);
    const [isChat, setIsChat] = useState<boolean>(false);
    const [isFriend, setIsFriend] = useState<boolean>(false);
    const [isEventStaff, setIsEventStaff] = useState<boolean>(false);
    const [isEventShop, setIsEventShop] = useState<boolean>(false);
    const [isEventBooth, setIsEventBooth] = useState<boolean>(false);
    const { t } = useLaravelReactI18n();
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
        if (iscurrentState !== "questionnaire") {
            setquestionnaire(false);
        }
        if (iscurrentState !== "upgradeTicket") {
            setIsUpgradeTicket(false);
        }
        if (iscurrentState !== "achievement") {
            setIsAchievement(false);
        }
        if (iscurrentState !== "chat") {
            setIsChat(false);
        }
        if (iscurrentState !== "friend") {
            setIsFriend(false);
        }
        if (iscurrentState !== "PrayerRequest") {
            setIsPrayerRequest(false);
        }
        if (iscurrentState !== "eventStaff") {
            setIsEventStaff(false);
        }
        if (iscurrentState !== "eventShop") {
            setIsEventShop(false);
        }
        if (iscurrentState !== "eventBooth") {
            setIsEventBooth(false);
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
        isChat,
        isFriend,
        isPost,
        purchaseTickets,
        questionnaire,
        isUpgradeTicket,
        IsAchievement,
        IsPrayerRequest,
        isEventStaff,
        isEventShop,
        isEventBooth,
    ]);

    const menuItems: any = [
        {
            label: t("🎛 Dashboard"),
            isHeader: true,
        },
        {
            id: "dashboard",
            label: t("Dashboard"),
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
            label: t("🛍 Event Shop & Sponsorships"),
            isHeader: true,
        },
        {
            id: "eventShop",
            label: t("Event Shop"),
            icon: "bx bx-store",
            link: route("attendee.event.products"),
            stateVariables: isDashboard,
            click: function (e: any) {
                e.preventDefault();
                setIsEventShop(!isEventShop);
                setIscurrentState("eventShop");
                updateIconSidebar(e);
            },
        },
        {
            id: "eventBooth",
            label: t("Sponsorship"),
            icon: "bx bx-gift",
            link: route("attendee.event.booths"),
            stateVariables: isDashboard,
            click: function (e: any) {
                e.preventDefault();
                setIsEventBooth(!isEventBooth);
                setIscurrentState("eventBooth");
                updateIconSidebar(e);
            },
        },

        {
            label: t("📅 Event Info & Participation"),
            isHeader: true,
        },
        {
            id: "program",
            label: t("Event Agenda"),
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
            label: t("Speakers"),
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
            id: "eventStaff",
            label: t("Event Staff"),
            icon: "bx bx-group",
            link: route("attendee.event.staff"),
            stateVariables: isMore,
            click: function (e: any) {
                e.preventDefault();
                setIsMore(!isMore);
                setIscurrentState("More");
                updateIconSidebar(e);
            },
        },
        {
            id: "eventCalendar",
            label: t("Event Calendar"),
            icon: "bx bxs-calendar",
            link: route("event.calendar"),
            stateVariables: isMore,
            click: function (e: any) {
                e.preventDefault();
                setIsMore(!isMore);
                setIscurrentState("More");
                updateIconSidebar(e);
            },
        },
        {
            id: "liveStream",
            label: t("Live Streams"),
            icon: "bx bx-broadcast",
            link: route("stream.index"),
            stateVariables: isMore,
            click: function (e: any) {
                e.preventDefault();
                setIsMore(!isMore);
                setIscurrentState("More");
                updateIconSidebar(e);
            },
        },

        {
            label: t("💬 Interaction & Networking"),
            isHeader: true,
        },
        {
            id: "chat",
            label: t("Chat Room"),
            icon: "bx bx-message-rounded-dots",
            link: route("attendee.event.chat"),
            stateVariables: isChat,
            click: function (e: any) {
                e.preventDefault();
                setIsChat(!isChat);
                setIscurrentState("chat");
                updateIconSidebar(e);
            },
        },
        {
            id: "friend",
            label: t("Friend System"),
            icon: "las la-user-friends",
            link: route("friend.index"),
            stateVariables: isFriend,
            click: function (e: any) {
                e.preventDefault();
                setIsFriend(!isFriend);
                setIscurrentState("friend");
                updateIconSidebar(e);
            },
        },
        {
            id: "more",
            label: t("Contact"),
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
            label: t("🎟 Tickets & Access"),
            isHeader: true,
        },
        {
            id: "tickets",
            label: t("Tickets"),
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
        {
            id: "purchasedtickets",
            label: t("Purchased Tickets"),
            icon: "bx bx-qr",
            link: route("attendee.tickets.purchased"),
            stateVariables: isMore,
            click: function (e: any) {
                e.preventDefault();
                setIsMore(!isMore);
                setIscurrentState("More");
                updateIconSidebar(e);
            },
        },
        // {
        //     id: "upgradeTicket",
        //     label: t("Upgrade Tickets Sessions"),
        //     icon: "bx bxs-credit-card",
        //     link: route("attendee.tickets.upgrade"),
        //     stateVariables: isUpgradeTicket,
        //     click: function (e: any) {
        //         e.preventDefault();
        //         setPurchaseTickets(!isUpgradeTicket);
        //         setIscurrentState("upgradeTicket");
        //         updateIconSidebar(e);
        //     },
        // },
        {
            id: "refundtickets",
            label: t("Refund Tickets"),
            icon: "bx bx-qr",
            link: route("attendee.tickets.refund"),
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
            label: t("Post Event Questionnaire"),
            icon: "bx bxs-notepad",
            link: route("attendee.event-questionnaire-form"),
            stateVariables: isMore,
            click: function (e: any) {
                e.preventDefault();
                setIsMore(!isMore);
                setIscurrentState("More");
                updateIconSidebar(e);
            },
        },

        {
            label: t("🏆 Engagement & Extras"),
            isHeader: true,
        },
        {
            id: "more",
            label: t("Favorites"),
            icon: "bx bxs-heart",
            link: route("all.fav.sessions"),
            stateVariables: isMore,
            click: function (e: any) {
                e.preventDefault();
                setIsMore(!isMore);
                setIscurrentState("More");
                updateIconSidebar(e);
            },
        },
        {
            id: "achievement",
            label: t("Achievements"),
            icon: "bx bxs-medal",
            link: route("attendee.achievement"),
            stateVariables: isMore,
            click: function (e: any) {
                e.preventDefault();
                setIsMore(!isMore);
                setIscurrentState("More");
                updateIconSidebar(e);
            },
        },

        // commented code preserved
        // {
        //     id: "PrayerRequest",
        //     label: "Prayer Request",
        //     icon: "bx bx-donate-heart",
        //     link: route("attendee.prayer"),
        //     stateVariables: isMore,
        //     click: function (e: any) {
        //         e.preventDefault();
        //         setIsMore(!isMore);
        //         setIscurrentState("More");
        //         updateIconSidebar(e);
        //     },
        // },
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
