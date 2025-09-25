import React, { useEffect, useState, useRef } from "react";
import {
    Container,
    Button,
    Tooltip,
    Dropdown,
    Row,
    Col,
    Card,
    Nav,
    Alert,
    OverlayTrigger,
    Tab,
    Form,
    Modal
} from "react-bootstrap";
import SimpleBar from "simplebar-react";
import EmojiPicker from 'emoji-picker-react';
//redux
import { useSelector, useDispatch } from "react-redux";
import avatar2 from "../../../../../images/users/avatar-2.jpg";
import userDummayImage from "../../../../../images/users/user-dummy-img.jpg";

//Import Scrollbar
import "react-perfect-scrollbar/dist/css/styles.css";
import { createSelector } from "reselect";
import Spinners from "../../../../Components/Common/Spinner";
import { Head, Link, useForm } from "@inertiajs/react";
import Layout from "../../../../Layouts/Event";
import { onGetMessages } from "../../../../slices/thunk";
import axios from 'axios';
import { useEchoPublic } from '@laravel/echo-react';
import Attachments from "./Components/Attachments";
import ChatAttachments from "./Components/ChatAttachments";
import ChatRoomModal from "./Components/ChatRoomModal";
import { useLaravelReactI18n } from "laravel-react-i18n";
import HasPermission from "../../../../Components/HasPermission";

const Chat = ({ member, event_data, loged_user ,staff,attendees,rooms,openrooms}: any) => {
    const { t } = useLaravelReactI18n();
    const userChatShow: any = useRef();
    const { post, processing } = useForm({});
    const [publicChatMessages, setPublicChatMessages] = useState<any[]>([]);
    const [privateChatMessages, setPrivateChatMessages] = useState<any[]>([]);
    const [groupChatMessages, setGroupChatMessages] = useState<any[]>([]);
    const [customActiveTab, setcustomActiveTab] = useState<any>("1");
    const [membersList, setMembersList] = useState(member || []);
    const [eventPreview, setEventPreview] = useState(event_data || {});
    const [groupsList, setGroupsList] = useState(rooms || []);
    const [openRooms, setOpenRooms] = useState(openrooms || []);
    const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
    const [roomGroupId,setRoomGroupId] = useState(0);
    const [roomOpenType,setRoomOpenType] = useState('');


    const [showJoinModal, setShowJoinModal] = useState(false);
    const [selectedOpenRoom, setSelectedOpenRoom] = useState<any>(null);
    
    const handleJoinClick = (room: any) => {
        setSelectedOpenRoom(room);
        setShowJoinModal(true);
    };

    const confirmJoinRoom = () => {
        if (!selectedOpenRoom) return;
        post(route('organizer.events.join.group',selectedOpenRoom.id), {
            preserveScroll: true,
            onSuccess: () => {
                // Close modal after successful join
                setOpenRooms((prev: any) => prev.filter((g: any) => g.id !== selectedOpenRoom.id) );
                setShowJoinModal(false);
                setSelectedOpenRoom(null);
            },
            onError: (errors) => {
                console.error("Join group failed:", errors);
            },
        });
    };

    const toggleCustom = (tab: any) => {
        if (customActiveTab !== tab) {
            setcustomActiveTab(tab);
        }
    };
    const dispatch = useDispatch<any>();
    const [Chat_Box_Username, setChat_Box_Username] = useState<any>("Lisa Parker");
    const [user_Status, setUser_Status] = useState<string | null>("online");
    const [Chat_Box_Image, setChat_Box_Image] = useState<any>(avatar2);
    const [currentRoomId, setCurrentRoomId] = useState<any>(1);
    const [curMessage, setcurMessage] = useState<string>("");
    const [reply, setReply] = useState<any>(null);
    const [emojiPicker, setemojiPicker] = useState<boolean>(false);

    // hide the chat open section on reload or open
    useEffect(() => {
        if (userChatShow.current) {
            userChatShow.current.classList.add("d-none");
        }
    }, []);

    useEffect(() => {
        setEventPreview(event_data || {});
        setGroupsList(rooms || []);
        setMembersList(member || []);
    }, [event_data, rooms, member]);

    // file attachments in chat
    const [showFileModal, setShowFileModal] = useState(false);
    const sendFiles = (files: File[]) => {
        addMessage(files);
    };

    //Real-time subscription to public channel like "event-app-[12]"
    const eventChannelName = `event-app-${event_data.id}`;

    useEchoPublic(eventChannelName, "EventGroupChat", (e: any) => {
        const newMessage = e.message;
        setPublicChatMessages((prev) => [...prev, newMessage]);
        setEventPreview((prev:any) => ({...prev,
            last_message: newMessage.message == null ? '' : newMessage.message === 'media' ? 'Media' : newMessage.message,
            last_message_created_at: newMessage.created_at,
            // Increment unread if not current chat
            // unread_count: roomOpenType === 'Event_chat' ? (prev.unread_count || 0) : (prev.unread_count || 0) + 1
        }));
    });

    // for private chat
    useEffect(() => {
        const channelName = `attendee-chat-${loged_user}`;
        const channel = window.Echo.private(channelName)
            .listen('AttendeeChatMessage', (e: any) => {
                if (e.message.sender_id == currentRoomId) {
                    setPrivateChatMessages((prev) => [...prev, e.message]);
                    axios.post(`/organizer/events/chat/mark-as-read/${currentRoomId}`);
                } else {
                    // Message from another chat → increment unread count
                    setMembersList((prevMembers: any) =>
                        prevMembers.map((user: any) => {
                            if (user.participant?.id === e.message.sender_id) {
                                return {
                                    ...user,
                                    unread_count: (user.unread_count || 0) + 1,
                                    last_message: e.message.message == null ? '' : e.message.message == 'media' ? 'Media' : e.message.message,
                                    last_message_created_at: e.message.created_at,
                                };
                            }
                            return user;
                        })
                    );
                }
            })
            .error((error: any) => {
                console.error('CHANNEL ERROR:', error);
            });

        return () => {
            // Cleanup — leave channel on unmount
            window.Echo.leave(`private-${channelName}`);
        };
    }, [loged_user, currentRoomId]);

    // for group chat 
    useEffect(() => {
        const subscriptions:any = [];

        groupsList.forEach((group:any) => {
            const channelName = `group-chat-${group.id}`;
            const channel = window.Echo.private(channelName)
                .listen('GroupChat', (e: any) => {
                    const newMessage = e.message;
                    // Assume newMessage has group_id or receiver_id to confirm (if not, infer from channel)
                    const targetGroupId = newMessage.receiver_id || newMessage.group_id || group.id;
                    if (targetGroupId === roomGroupId && roomOpenType === 'Group_chat') {
                        // Current open group: Add to messages (with duplicate check)
                        setGroupChatMessages((prev) => {
                            const exists = prev.some((msg) => msg.id === newMessage.id);
                            return exists ? prev : [...prev, newMessage];
                        });
                    } else {
                        // Other group: Update preview in list
                        setGroupsList((prev:any) =>
                            prev.map((g:any) => g.id === targetGroupId ? { ...g,
                                        last_message: newMessage.message == null ? '' : newMessage.message === 'media' ? 'Media' : newMessage.message,
                                        last_message_created_at: newMessage.created_at,
                                        // Optional: Increment unread
                                        // unread_count: (g.unread_count || 0) + 1
                                    }
                                    : g
                            )
                        );
                    }
                })
                .error((error: any) => {
                    console.error('CHANNEL ERROR:', error);
                });

            subscriptions.push(channelName);
        });

        return () => {
            // Cleanup: Leave all group channels
            subscriptions.forEach((name:any) => window.Echo.leave(`private-${name}`));
        };
    }, [groupsList, roomGroupId, roomOpenType]);

    const selectChatState = (state: any) => state.Chat;
    const chatProperties = createSelector(
        selectChatState,
        (state: any) => ({
            chats: state.chats,
            messages: state.messages,
            loading: state.loading
        })
    );
    // Inside your component
    const {
        chats, messages, loading
    }: any = useSelector(chatProperties);


    const [isLoading, setLoading] = useState<any>(loading);

    //Use For Chat Box
    const userChatOpen = async (chats: any, reciever_id: any, spaceType:string) => {
        setRoomOpenType(spaceType);
        try {
            let response: any;
            if(spaceType == 'Event_chat'){
                response = await axios.get(`/organizer/events/get-chat/${event_data.id}`);
                setPublicChatMessages(response.data.messages);
            }else if(spaceType == 'Group_chat'){
                setRoomGroupId(chats.id);
                response = await axios.get(`/organizer/events/group-chat/${chats.id}`);
                setGroupChatMessages(response.data.messages);
            }else if(spaceType == 'Private_chat'){
                response = await axios.get(`/organizer/events/private-chat/${reciever_id}`);
                setPrivateChatMessages(response.data.messages);
                // Reset unread count for the opened private chat
                setMembersList((prevMembers: any) =>
                    prevMembers.map((user: any) => {
                        if (user.participant.id === reciever_id) {
                            return { ...user, unread_count: 0 };
                        }
                        return user;
                    })
                );
            }

            userChatShow.current.classList.remove("d-none");
            setChat_Box_Username(chats?.name ?? chats.participant?.name);
            setChat_Box_Image(chats.image ?? chats.logo_img);
            setUser_Status(chats.status)
            dispatch(onGetMessages());
            setCurrentRoomId(reciever_id);

            // Restore visibility for all chats in both event and user sections
            const userLists = document.getElementsByClassName("chat-user-list");
            Array.from(userLists).forEach((userList: any) => {
                const listItems = userList.getElementsByTagName("li");
                Array.from(listItems).forEach((li: any) => {
                    const id = li.querySelector("a")?.id?.replace("msgUser", "");
                    const unreadMessage = document.getElementById("unread-msg-user" + id);
                    const lastMessage = document.getElementById("last-msg-user" + id);
                    const msgUser = document.getElementById("msgUser" + id);
                    if (unreadMessage && lastMessage && msgUser) {
                        // Show last message and unread count for all chats
                        lastMessage.style.display = "";
                        unreadMessage.style.display = "";
                        msgUser.classList.add("unread-msg-user");
                    }
                });
            });

        } catch (error) {
            console.error("Failed to fetch chat messages", error);
        }
        if (window.innerWidth < 892) {
            userChatShow.current.classList.add("user-chat-show");
        }

        let idSuffix = reciever_id ?? chats.id;
        if (reciever_id) {
            idSuffix = chats.participant.id ?? chats.id;
        }
        // remove unread msg on read in chat
        var unreadMessage: any = document.getElementById("unread-msg-user" + idSuffix);
        var lastMessage: any = document.getElementById("last-msg-user" + idSuffix);
        var msgUser: any = document.getElementById("msgUser" + idSuffix);
        if (unreadMessage) {
            unreadMessage.style.display = "none";
            lastMessage.style.display = "none";
        }
        if (msgUser) {
            msgUser.classList.remove("unread-msg-user");
        }
    };
    
    // on mobile responsive
    const backToUserChat = () => {
        userChatShow.current.classList.remove("user-chat-show");
    }

    // add message
    const addMessage = async (files?: File[]) => {
        try {
            const selectedFilesData = files ?? [];
            const receiver_id = roomOpenType === "Event_chat" ? event_data.id : roomOpenType === "Group_chat" ? roomGroupId : currentRoomId;
            if (!receiver_id) {
                console.warn("No receiver_id found for", roomOpenType);
                return;
            }
            if (!curMessage.trim() && selectedFilesData.length === 0) {
                return;
            }
            const formData = new FormData();
            formData.append("room_type", roomOpenType);
            formData.append("receiver_id", receiver_id);
            if (reply?.msg_id) {
                formData.append("reply_to", reply.msg_id);
            }
            if (selectedFilesData && selectedFilesData.length > 0) {
                Array.from(selectedFilesData).forEach((file) => {
                    formData.append("files[]", file);
                });
            }
            if (curMessage && curMessage.trim() !== "") {
                formData.append("message", curMessage);
            } else {
                formData.append("message", "media");
            }
            // Send request with multipart/form-data
            const response = await axios.post("/organizer/events/send-message", formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );
            // Append to appropriate message state
            const newMessage = response.data.message;
            if (roomOpenType == 'Private_chat') {
                setPrivateChatMessages((prev: any) => [...prev, newMessage]);
            }
            else if(roomOpenType == 'Group_chat'){
                setGroupChatMessages((prev: any) => [...prev, newMessage]);
            }
            setcurMessage('');
            setReply(null);
            setemojiPicker(false);
            setemojiArray('');

        } catch (error) {
            console.error('Message sending failed:', error);
        }
    };

    const chatRef = useRef<any>(null);
    useEffect(() => {
        if (chatRef.current?.el) {
            chatRef.current.getScrollElement().scrollTop = chatRef.current.getScrollElement().scrollHeight;
        }
    }, [publicChatMessages, privateChatMessages,groupChatMessages])

    const onKeyPress = (e: any) => {
        const { key, value } = e;
        if (key === "Enter") {
            e.preventDefault();
            setcurMessage(value);
            addMessage();
        }
    };

    //serach recent user

    const searchUsers = () => {
        const input = document.getElementById("search-user") as HTMLInputElement;
        const filter = input.value.toUpperCase();
        const userList = document.getElementsByClassName("users-list");

        Array.prototype.forEach.call(userList, (el: HTMLElement) => {
            const li = el.getElementsByTagName("li");

            for (let i = 0; i < li.length; i++) {
                const a = li[i].getElementsByTagName("a")[0];
                const txtValue = a.textContent || a.innerText;

                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    li[i].style.display = "";
                } else {
                    li[i].style.display = "none";
                }
            }
        });
    };

    // emoji
    const [emojiArray, setemojiArray] = useState<any>([]);
    const onEmojiClick = (event: any, emojiObject: any) => {
        setemojiArray([...emojiArray, event.emoji]);
        setcurMessage(curMessage + event.emoji);
    };
    // Determine which messages to display based on currentRoomId
    const currentMessages = roomOpenType === "Event_chat" ? publicChatMessages : roomOpenType === "Group_chat" ? groupChatMessages : privateChatMessages;

    return (
        <React.Fragment>
            <Head title="Chat " />
            <div className="page-content">
                <Container fluid>
                    <div className="chat-wrapper d-lg-flex gap-1 mx-n4 mt-n4 p-1">
                        <div className="chat-leftsidebar">
                            <div className="px-4 pt-4 mb-3">
                                <div className="d-flex align-items-start">
                                    <div className="flex-grow-1">
                                        <div className="d-flex align-items-center justify-content-between mb-4">
                                            <h5 className="">{t("Chats")}</h5>
                                            <HasPermission permission="create_chat_room">
                                                <button
                                                    type="button"
                                                    onClick={() => setShowCreateRoomModal(true)}
                                                    className="btn btn-success "
                                                >
                                                    Create Room
                                                </button>
                                            </HasPermission>
                                        </div>
                                    </div>
                                </div>
                                <HasPermission permission="create_chat_room">
                                    <ChatRoomModal
                                        showModal={showCreateRoomModal}
                                        hideModal={setShowCreateRoomModal}
                                        staff={staff}
                                        attendees={attendees}
                                    />
                                </HasPermission>
                                <div className="search-box">
                                    <input
                                        onKeyUp={searchUsers}
                                        id="search-user"
                                        type="text"
                                        className="form-control bg-light border-light"
                                        placeholder={t("Search here...")} 
                                    />
                                    <i className="ri-search-2-line search-icon"></i>
                                </div>
                            </div>

                            <SimpleBar className="chat-room-list pt-3" style={{ margin: "-16px 0px 0px" }}>

                                {/* EVENT SECTION */}
                                <div className="chat-message-list">
                                    <ul className="list-unstyled chat-list chat-user-list users-list" id="eventList">
                                        <li key={"event-" + eventPreview.id} className={Chat_Box_Username === eventPreview?.name ? "active" : ""}>
                                            <Link href="#!" onClick={(event) => { event.preventDefault();userChatOpen(eventPreview, null,'Event_chat') }} className={"unread-msg-user border-bottom"} id={"msgUser" + eventPreview.id}>
                                                <div className="d-flex align-items-center">
                                                    <div className={'flex-shrink-0 chat-user-img align-self-center me-2 ms-0'}>
                                                        <div className="avatar-xxs">
                                                            {eventPreview.logo_img ? (
                                                                <img src={eventPreview.logo_img} className="rounded-circle img-fluid userprofile" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                            ) : (
                                                                <div className={"avatar-title rounded-circle bg-dark userprofile"}>
                                                                    {eventPreview?.name.charAt(0)}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow-1 overflow-hidden">
                                                        <p className="text-truncate mb-0">{eventPreview?.name}</p>
                                                        <small className="text-truncate mb-0" id={"last-msg-user" + eventPreview.id}>{eventPreview?.last_message ?? ''}</small>
                                                    </div>
                                                    <div className="flex-shrink-0" id={"unread-msg-user" + eventPreview.id}>
                                                        <span className="badge bg-dark-subtle text-body rounded p-1">
                                                            {(() => {
                                                                if (!eventPreview?.last_message_created_at) return null;
                                                                const messageDate = new Date(eventPreview.last_message_created_at);
                                                                const now = new Date();

                                                                const isToday =
                                                                    messageDate.getDate() === now.getDate() &&
                                                                    messageDate.getMonth() === now.getMonth() &&
                                                                    messageDate.getFullYear() === now.getFullYear();

                                                                return isToday
                                                                    ? messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) // e.g., 10:15 AM
                                                                    : messageDate.toLocaleDateString(); // e.g., 7/25/2025
                                                            })()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                {/* Groups SECTION */}
                                <div className="chat-message-list">
                                    <ul className="list-unstyled chat-list chat-user-list users-list" id="groupList">
                                        {(groupsList || []).map((chat: any) => (
                                            <li key={"group-" + chat?.id} className={Chat_Box_Username === chat?.name ? "active" : ""}>
                                                <Link href="#!" onClick={(event) => { event.preventDefault(); userChatOpen(chat, chat.id,'Group_chat'); }} className="unread-msg-user border-bottom" id={"msgUser" + chat?.id}>
                                                    <div className="d-flex align-items-center">
                                                        <div className={`flex-shrink-0 chat-user-img align-self-center me-2 ms-0`}>
                                                            <div className="avatar-xxs">
                                                                {chat.image ? (
                                                                    <img src={chat.image} className="rounded-circle img-fluid userprofile" alt="" />
                                                                ) : (
                                                                    <div className={"avatar-title rounded-circle bg-dark userprofile"}>
                                                                        {chat.participant?.name?.charAt(0)}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="flex-grow-1 overflow-hidden">
                                                            <p className="text-truncate mb-0">{chat?.name}</p>
                                                            <small className="text-truncate mb-0" id={"last-msg-group" + chat?.id}>{chat.last_message == null ? '' : chat.last_message == 'media' ? 'Media' : chat.last_message}</small>
                                                        </div>
                                                        <div className="flex-shrink-0" id={"unread-msg-group" + chat?.id}>
                                                            <div>
                                                                <span className="badge bg-dark-subtle text-body rounded p-1">
                                                                    {(() => {
                                                                        if (!chat?.last_message_created_at) return null;
                                                                        const messageDate = new Date(chat.last_message_created_at);
                                                                        const now = new Date();

                                                                        const isToday =
                                                                            messageDate.getDate() === now.getDate() &&
                                                                            messageDate.getMonth() === now.getMonth() &&
                                                                            messageDate.getFullYear() === now.getFullYear();

                                                                        return isToday
                                                                            ? messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) // e.g., 10:15 AM
                                                                            : messageDate.toLocaleDateString(); // e.g., 7/25/2025
                                                                    })()}
                                                                </span>
                                                            </div>
                                                            {/* <div className="text-end">
                                                                {chat.unread_count != 0 ? (<span className="badge bg-dark-subtle text-body rounded p-1">{chat.unread_count}</span>) : ("")}
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {/* user SECTION */}
                                <div className="chat-message-list">
                                    <ul className="list-unstyled chat-list chat-user-list users-list" id="userList">
                                        {(membersList || []).map((chat: any) => (
                                            <li key={"user-" + chat?.id} className={Chat_Box_Username === chat.participant?.name ? "active" : ""}>
                                                <Link href="#!" onClick={(event) => { event.preventDefault(); userChatOpen(chat, chat.participant?.id,'Private_chat'); }} className="unread-msg-user border-bottom" id={"msgUser" + chat.participant?.id}>
                                                    <div className="d-flex align-items-center">
                                                        <div className={`flex-shrink-0 chat-user-img align-self-center me-2 ms-0`}>
                                                            <div className="avatar-xxs">
                                                                {chat.participant?.avatar_img ? (
                                                                    <img src={chat.participant?.avatar_img} className="rounded-circle img-fluid userprofile" alt="" />
                                                                ) : (
                                                                    <div className={"avatar-title rounded-circle bg-dark userprofile"}>
                                                                        {chat.participant?.name?.charAt(0)}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="flex-grow-1 overflow-hidden">
                                                            <p className="text-truncate mb-0">{chat.participant?.name}</p>
                                                            <small className="text-truncate mb-0" id={"last-msg-user" + chat.participant?.id}>{chat.last_message == null ? '' : chat.last_message == 'media' ? 'Media' : chat.last_message}</small>
                                                        </div>
                                                        <div className="flex-shrink-0" id={"unread-msg-user" + chat.participant?.id}>
                                                            <div>
                                                                <span className="badge bg-dark-subtle text-body rounded p-1">
                                                                    {(() => {
                                                                        if (!chat?.last_message_created_at) return null;
                                                                        const messageDate = new Date(chat.last_message_created_at);
                                                                        const now = new Date();

                                                                        const isToday =
                                                                            messageDate.getDate() === now.getDate() &&
                                                                            messageDate.getMonth() === now.getMonth() &&
                                                                            messageDate.getFullYear() === now.getFullYear();

                                                                        return isToday
                                                                            ? messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) // e.g., 10:15 AM
                                                                            : messageDate.toLocaleDateString(); // e.g., 7/25/2025
                                                                    })()}
                                                                </span>
                                                            </div>
                                                            {/* <div className="text-end">
                                                                {chat.unread_count != 0 ? (<span className="badge bg-dark-subtle text-body rounded p-1">{chat.unread_count}</span>) : ("")}
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Open Groups SECTION */}
                                {openRooms && openRooms.length > 0 && (
                                    <div className="chat-message-list">
                                        <h6 className="px-3 text-muted">
                                            Open Groups
                                        </h6>
                                        <ul
                                            className="list-unstyled chat-list chat-user-list users-list"
                                            id="openGroupList"
                                        >
                                            {(openRooms || []).map((chat: any) => (
                                                <li key={"open-group-" + chat.id}>
                                                    <Link
                                                        href="#!"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleJoinClick(chat);
                                                        }}
                                                    >
                                                        <div className="d-flex align-items-center">
                                                            <div className="flex-shrink-0 chat-user-img me-2">
                                                                <div className="avatar-xxs">
                                                                    {chat.image ? (
                                                                        <img
                                                                            src={
                                                                                chat.image
                                                                            }
                                                                            className="rounded-circle img-fluid userprofile"
                                                                            alt=""
                                                                        />
                                                                    ) : (
                                                                        <div className="avatar-title rounded-circle bg-dark userprofile">
                                                                            {chat.name?.charAt(
                                                                                0
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="flex-grow-1 overflow-hidden">
                                                                <p className="text-truncate mb-0">
                                                                    {chat.name}
                                                                </p>
                                                                <small className="text-muted">
                                                                    Click to join
                                                                </small>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </SimpleBar>
                        </div>

                        <div className="user-chat w-100 overflow-hidden" ref={userChatShow}>
                            <div className="chat-content d-lg-flex">
                                <div className="w-100 overflow-hidden position-relative">
                                    <div className="position-relative">
                                        <div className="p-3 user-chat-topbar">
                                            <Row className="align-items-center">
                                                <Col sm={4} xs={8}>
                                                    <div className="d-flex align-items-center">
                                                        <div className="flex-shrink-0 d-block d-lg-none me-3">
                                                            <Link href="#" onClick={backToUserChat} className="user-chat-remove fs-18 p-1"                              >
                                                                <i className="ri-arrow-left-s-line align-bottom"></i>
                                                            </Link>
                                                        </div>
                                                        <div className="flex-grow-1 overflow-hidden">
                                                            <div className="d-flex align-items-center">
                                                                <div className="flex-shrink-0 chat-user-img online user-own-img align-self-center me-3 ms-0">
                                                                    {Chat_Box_Image === undefined ? (
                                                                        <img src={userDummayImage} className="rounded-circle avatar-xs" alt="" />
                                                                    ) : (
                                                                        <img src={Chat_Box_Image} className="rounded-circle avatar-xs" alt="" />
                                                                    )}
                                                                    <span className="user-status"></span>
                                                                </div>
                                                                <div className="flex-grow-1 overflow-hidden">
                                                                    <h5 className="text-truncate mb-0 fs-16">
                                                                        <a
                                                                            className="text-reset username"
                                                                            data-bs-toggle="offcanvas"
                                                                            href="#userProfileCanvasExample"
                                                                            aria-controls="userProfileCanvasExample"
                                                                        >
                                                                            {Chat_Box_Username}
                                                                        </a>
                                                                    </h5>
                                                                    <p className="text-truncate text-muted fs-14 mb-0 userStatus">
                                                                        <small>{user_Status === null ? "24 Members" : user_Status}</small>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>

                                        <div className="position-relative" id="users-chat">
                                            <div className="chat-conversation p-3 p-lg-4 simplebar-scrollable-y" id="chat-conversation">
                                                {
                                                    isLoading ? <Spinners setLoading={setLoading} />
                                                        :
                                                        <SimpleBar ref={chatRef} style={{ height: "100%" }}>
                                                            <ul className="list-unstyled chat-conversation-list" id="users-conversation">
                                                                {(currentMessages || []).map((msg: any, index: number) => (
                                                                    <li
                                                                        className={msg.sender_id === loged_user ? "chat-list right" : "chat-list left"}
                                                                        key={index}
                                                                    >
                                                                        <div className="conversation-list">
                                                                            <div className="user-chat-content">
                                                                                <div className="ctext-wrap">
                                                                                    <div className="ctext-wrap-content">
                                                                                        {/* Show reply block if this message is replying to another */}
                                                                                        {msg.reply && (
                                                                                            <div className="replymessage-block mb-1 p-2 rounded bg-light">
                                                                                                <strong>{msg.reply.sender?.name}</strong>
                                                                                                <p className="mb-0 small">{msg.reply.message}</p>
                                                                                            </div>
                                                                                        )}
                                                                                        {/* Show text message */}
                                                                                        <p className="mb-0 ctext-content">{msg.message == 'media' ? '' : msg.message}</p>

                                                                                        {/* Show attachments */}
                                                                                        {msg.files && msg.files.length > 0 && (
                                                                                            <ChatAttachments files={msg.files} />
                                                                                        )}
                                                                                    </div>
                                                                                    {/* Three-dot dropdown menu */}
                                                                                    {msg.files && msg.files.length > 0 ? ("") : (
                                                                                        <Dropdown className="align-self-start message-box-drop ms-2">
                                                                                            <Dropdown.Toggle
                                                                                                href="#"
                                                                                                className="btn nav-btn arrow-none p-0"
                                                                                                as="a"
                                                                                            >
                                                                                                <i className="ri-more-2-fill"></i>
                                                                                            </Dropdown.Toggle>
                                                                                            <Dropdown.Menu>
                                                                                                <Dropdown.Item
                                                                                                    href="#"
                                                                                                    className="reply-message"
                                                                                                    onClick={() => setReply({
                                                                                                        sender: msg.sender?.name || "Unknown",
                                                                                                        msg: msg.message,
                                                                                                        msg_id: msg.id
                                                                                                    })}
                                                                                                >
                                                                                                    <i className="ri-reply-line me-2 text-muted align-bottom"></i>
                                                                                                    {t("Reply")}
                                                                                                </Dropdown.Item>
                                                                                                <Dropdown.Item href="#" onClick={() => navigator.clipboard.writeText(msg.message)}>
                                                                                                    <i className="ri-file-copy-line me-2 text-muted align-bottom"></i>
                                                                                                    {t("Copy")}
                                                                                                </Dropdown.Item>
                                                                                            </Dropdown.Menu>
                                                                                        </Dropdown>
                                                                                    )}
                                                                                </div>
                                                                                <div className="conversation-name">
                                                                                    <span className="text-muted">{msg.sender_id != loged_user ? msg.sender?.name : 'You'}</span>
                                                                                    <small className="text-muted time">
                                                                                        {new Date(msg.created_at).toLocaleTimeString()}
                                                                                    </small>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </SimpleBar>
                                                }
                                            </div>
                                            {/* emoji picker */}
                                            {emojiPicker && <EmojiPicker onEmojiClick={onEmojiClick} width={250} height={382} />}
                                        </div>

                                        <div className="chat-input-section p-3 p-lg-4">
                                            <form id="chatinput-form">
                                                <Row className="g-0 align-items-center">
                                                    <div className="col-auto">
                                                        <div className="chat-input-links me-2">
                                                            <div className="links-list-item">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-link text-decoration-none emoji-btn"
                                                                    id="emoji-btn"
                                                                    onClick={() => setemojiPicker(!emojiPicker)}
                                                                >
                                                                    <i className="bx bx-smile align-middle"></i>
                                                                </button>
                                                            </div>
                                                            <div className="links-list-item">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-link text-decoration-none file-attach-btn"
                                                                    onClick={() => setShowFileModal(true)}
                                                                >
                                                                    <i className="bx bx-paperclip align-middle"
                                                                        style={{ transform: "rotate(90deg)", display: "inline-block" }}
                                                                    ></i>
                                                                </button>
                                                                <Attachments
                                                                    showFileModal={showFileModal}
                                                                    setShowFileModal={setShowFileModal}
                                                                    sendFiles={sendFiles}
                                                                />
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="chat-input-feedback">
                                                            {t("Please Enter a Message")}
                                                        </div>
                                                        <input
                                                            type="text"
                                                            value={curMessage}
                                                            onKeyDown={onKeyPress}
                                                            onChange={e => setcurMessage(e.target.value)}
                                                            className="form-control chat-input bg-light border-light"
                                                            id="chat-input"
                                                            placeholder={t("Type your message...")} 
                                                        />
                                                    </div>
                                                    <div className="col-auto">
                                                        <div className="chat-input-links ms-2">
                                                            <div className="links-list-item">
                                                                <button
                                                                    type="button"
                                                                    // disabled={curMessage === ""}
                                                                    onClick={() => { addMessage(); setemojiPicker(false); setemojiArray(''); }}
                                                                    className="btn btn-success chat-send waves-effect waves-light"
                                                                >
                                                                    <i className="ri-send-plane-2-fill align-bottom"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Row>
                                            </form>
                                        </div>
                                        <div className={reply ? "replyCard show" : "replyCard"}>
                                            <Card className="mb-0">
                                                <Card.Body className="py-3">
                                                    <div className="replymessage-block mb-0 d-flex align-items-start">
                                                        <div className="flex-grow-1">
                                                            <h5 className="conversation-name">{reply?.sender || "Unknown"}</h5>
                                                            <p className="mb-0">{reply?.msg || ""}</p>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <button
                                                                type="button"
                                                                id="close_toggle"
                                                                className="btn btn-sm btn-link mt-n2 me-n3 fs-18"
                                                                onClick={() => setReply(null)}
                                                            >
                                                                <i className="bx bx-x align-middle"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Join Group Modal */}
                    <Modal
                        show={showJoinModal}
                        onHide={() => setShowJoinModal(false)}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Join Group</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are you sure you want to join{" "}
                            <strong>{selectedOpenRoom?.name}</strong>?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant="secondary"
                                onClick={() => setShowJoinModal(false)}
                            >
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={confirmJoinRoom}>
                                Join
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
            </div >
        </React.Fragment >
    );
};
Chat.layout = (page: any) => <Layout children={page} />

export default Chat;
