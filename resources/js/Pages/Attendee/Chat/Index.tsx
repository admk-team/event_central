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
  Form
} from "react-bootstrap";
import SimpleBar from "simplebar-react";
import EmojiPicker from 'emoji-picker-react';

//Import Icons
import FeatherIcon from "feather-icons-react";

import { chatContactData } from "../../../common/data";

//redux
import { useSelector, useDispatch } from "react-redux";

import avatar2 from "../../../../images/users/avatar-2.jpg";
import userDummayImage from "../../../../images/users/user-dummy-img.jpg";

//Import Scrollbar
import "react-perfect-scrollbar/dist/css/styles.css";
import { createSelector } from "reselect";
import Spinners from "../../../Components/Common/Spinner";
import { Head, Link } from "@inertiajs/react";
import AttendeeLayout from "../../../Layouts/Attendee";
import { onAddMessage, onDeleteMessage, onGetDirectContact, onGetMessages } from "../../../slices/thunk";
import axios from 'axios';
import { useEchoPublic } from '@laravel/echo-react';

interface DirectContact {
  id: number,
  roomId: number,
  status: string,
  name: string,
  image: string,
  number: string,
  email: string,
  bgColor: string,
  badge: string | number,
  location: string
}
interface channelsListType {
  id: number,
  name: string,
  unReadMessage?: number,
  image: string,
}
interface chatContactType {
  direactContact?: DirectContact[];
  channelsList?: channelsListType[];
}
interface contact {
  id: number,
  name: string,
  status: string,
  roomId: number,
  image?: string
}
interface chatContactDataTye {
  id: number,
  title: string,
  contacts?: contact[],
  image?: string,
  name: string,
}
type UserMessage = {
  id: number;
  from_id: number;
  to_id: number;
  msg: string | null;
  reply: { sender: string, msg: string, id: number },
  isImages: boolean;
  has_images: { id: number; image: string }[];
  datetime: string;
};

type userMessagesType = {
  id: number;
  roomId: number;
  sender: string;
  createdAt: string;
  usermessages: UserMessage[];
};

const Chat = ({member,event_data,loged_user}:any) => {
  
  const userChatShow: any = useRef();

  // hide the chat open section on reload or open 
  useEffect(() => {
    if (userChatShow.current) {
      userChatShow.current.classList.add("d-none");
    }
  }, []);

  const [chatmessages, setChatMessages] = useState<any[]>([]);
  const [customActiveTab, setcustomActiveTab] = useState<any>("1");
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
  const [reply, setreply] = useState<any>("");
  const [emojiPicker, setemojiPicker] = useState<boolean>(false);

  // Real-time subscription to public channel like "event-app-[id]"
  const eventChannelName = `event-app-${event_data.id}`;
  console.log(eventChannelName);
  useEchoPublic(eventChannelName, "EventGroupChat", (e: any) => {
    console.log("New message via Echo:", e);
    const newMessage = e.message;
    setChatMessages(prev  => [...prev , newMessage]);
  });


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
  const userChatOpen = async (chats: any) => {
    try {
      const response = await axios.get(`/attendee/get-chat`);
      userChatShow.current.classList.remove("d-none");
      setChat_Box_Username(chats.name);
      setCurrentRoomId(chats.id);
      setChat_Box_Image(chats.image ?? chats.logo_img);
      setUser_Status(chats.status)
      dispatch(onGetMessages());
      setChatMessages(response.data.messages);

    } catch (error) {
      console.error("Failed to fetch chat messages", error);
    }
    if (window.innerWidth < 892) {
      userChatShow.current.classList.add("user-chat-show");
    }
    // remove unread msg on read in chat
    var unreadMessage: any = document.getElementById("unread-msg-user" + chats.id);
    var msgUser: any = document.getElementById("msgUser" + chats.id);
    if (unreadMessage) {
      unreadMessage.style.display = "none";
    }
    if (msgUser) {
      msgUser.classList.remove("unread-msg-user");
    }
  };

  const backToUserChat = () => {
    userChatShow.current.classList.remove("user-chat-show");
  }

  // add message
  const addMessage = async () => {
    try {
      const response = await axios.post('/attendee/send-message', {
        message: curMessage,
      });
      const newMessage = response.data.message;
      setChatMessages(prev  => [...prev , newMessage]);
      setcurMessage('');
      setreply('');
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
  }, [messages])

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
                    <h5 className="mb-4">Chats</h5>
                  </div>
                </div>
                <div className="search-box">
                  <input
                    onKeyUp={searchUsers}
                    id="search-user"
                    type="text"
                    className="form-control bg-light border-light"
                    placeholder="Search here..."
                  />
                  <i className="ri-search-2-line search-icon"></i>
                </div>
              </div>

              <SimpleBar className="chat-room-list pt-3" style={{ margin: "-16px 0px 0px" }}>
    
                {/* EVENT SECTION */}
                <div className="chat-message-list">
                  <ul className="list-unstyled chat-list chat-user-list users-list" id="userList">
                    <li key={event_data.id} className={Chat_Box_Username === event_data.name ? "active" : ""}>
                      <Link href="#!" onClick={(event) => {event.preventDefault();userChatOpen(event_data)}} className={"unread-msg-user"} id={"msgUser" + event_data.id}>
                        <div className="d-flex align-items-center">
                          <div className={'flex-shrink-0 chat-user-img align-self-center me-2 ms-0'}>
                            <div className="avatar-xxs">
                              {event_data.logo_img? (
                                <img src={event_data.logo_img} className="rounded-circle img-fluid userprofile" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                              ) : (
                                <div className={"avatar-title rounded-circle bg-dark userprofile"}>
                                  {event_data.name.charAt(0)}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="text-truncate mb-0">{event_data.name}</p>
                          </div>
                          <div className="flex-shrink-0" id={"unread-msg-user" + event_data.id}>
                            <span className="badge bg-dark-subtle text-body rounded p-1">1</span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
                {/* user SECTION */}
                {/* <div className="chat-message-list">
                  <ul className="list-unstyled chat-list chat-user-list users-list" id="userList">
                    {(chats || []).map((chatContact: chatContactType) => (
                      chatContact.direactContact && (chatContact.direactContact || [])?.map((chat) => (
                        <li key={chat.id + chat.status} className={Chat_Box_Username === chat.name ? "active" : ""}>
                          <Link href="#!" onClick={(event) => {event.preventDefault();userChatOpen(chat)}} className={chat.badge && chat.badge !== 0 ? "unread-msg-user" : ''} id={"msgUser" + chat.id}>
                            <div className="d-flex align-items-center">
                              <div className={`flex-shrink-0 chat-user-img ${chat.status === 'Online' ? "online" : "away"} align-self-center me-2 ms-0`}>
                                <div className="avatar-xxs">
                                  {chat.image ? (
                                    <img src={chat.image} className="rounded-circle img-fluid userprofile" alt="" />
                                  ) : (
                                    <div className={"avatar-title rounded-circle bg-" + chat.bgColor + " userprofile"}>
                                      {chat.name.charAt(0)}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="flex-grow-1 overflow-hidden">
                                <p className="text-truncate mb-0">{chat.name}</p>
                              </div>
                              {chat.badge &&
                                <div className="flex-shrink-0" id={"unread-msg-user" + chat.id}>
                                  <span className="badge bg-dark-subtle text-body rounded p-1">{chat.badge}</span>
                                </div>
                              }
                            </div>
                          </Link>
                        </li>
                      )))
                    )}
                  </ul>
                </div> */}
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
                              {(chatmessages || []).map((msg: any, index: number) => (
                                <li
                                  className={msg.sender_id === loged_user ? "chat-list right" : "chat-list left"}
                                  key={index}
                                >
                                  <div className="conversation-list">
                                    {/* Avatar if sender is the current user */}
                                    {msg.sender?.first_name === Chat_Box_Username && (
                                      msg.sender_id === 1 && (
                                        <div className="chat-avatar">
                                          {Chat_Box_Image === undefined ? (
                                            <img src={userDummayImage} alt="" />
                                          ) : (
                                            <img src={Chat_Box_Image} alt="" />
                                          )}
                                        </div>
                                      )
                                    )}
                                    <div className="user-chat-content">
                                      <div className="ctext-wrap">
                                        <div className="ctext-wrap-content">
                                          <p className="mb-0 ctext-content">{msg.message}</p>
                                        </div>
                                      </div>
                                      <div className="conversation-name">
                                        <span className="text-muted">{msg.sender_id != loged_user ? msg.sender?.name : 'You'}</span>
                                        <small className="text-muted time">
                                          {new Date(msg.created_at).toLocaleTimeString()}
                                        </small>
                                        {/* <span className="text-success check-message-icon">
                                          <i className="ri-check-double-line align-bottom"></i>
                                        </span> */}
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
                            </div>
                          </div>

                          <div className="col">
                            <div className="chat-input-feedback">
                              Please Enter a Message
                            </div>
                            <input
                              type="text"
                              value={curMessage}
                              onKeyDown={onKeyPress}
                              onChange={e => setcurMessage(e.target.value)}
                              className="form-control chat-input bg-light border-light"
                              id="chat-input"
                              placeholder="Type your message..."
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div >
    </React.Fragment >
  );
};
Chat.layout = (page: any) => <AttendeeLayout children={page} />

export default Chat;
