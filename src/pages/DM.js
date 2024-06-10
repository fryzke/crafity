import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderComponent1 from "../components/HeaderComponent1";
import PageFooter from "../components/PageFooter";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import styles from "./DM.module.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  Sidebar,
  ConversationList,
  Conversation,
  ConversationHeader,
  MessageSeparator
} from "@chatscope/chat-ui-kit-react";

const DM = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [unreadCounts, setUnreadCounts] = useState({});
  const [show, setShow] = useState(false);
  const [isLogined, setIsLogined] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentUserName = JSON.parse(sessionStorage.getItem('user'))?.id;
  const auth = sessionStorage.getItem('token');

  useEffect(() => {
    if (!currentUserName) {
      setIsLogined(false);
      alert("로그인 후 이용해주세요.");
      navigate("/log-in");
    } else {
      setIsLogined(true);
    }

    if (location.state != null) {
      setConversations(preConversations => [...location.state, ...preConversations]);
      setMessages([]);
    }
  }, [currentUserName, location.state, navigate]);

  useEffect(() => {
    if (conversations.length === 0) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [conversations]);

  const getConversation = async () => {
    setLoading(true);
    try {
      const data = { recipientId: currentUserName };
      const response = await axios.post('http://154.12.55.105:8081/message/getMessageUserList', data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": auth,
        }
      });

      setConversations(response.data.data);
      setUnreadCounts({});
      if (response.data.data.length > 0) {
        setCurrentConversation(response.data.data[0].user.id);
      }
    } catch (error) {
      setError('Error fetching conversations');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getConversation();
  }, [currentUserName]);

  const getMessages = async () => {
    if (currentConversation !== null) {
      try {
        const data = { recipientId: currentConversation };
        const response = await axios.post('http://154.12.55.105:8081/message/getUserMessageList', data, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": auth,
          }
        });
        setMessages(response.data.data);
      } catch (error) {
        setError('Error fetching messages');
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getMessages();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentConversation]);

  const handleSend = async (message) => {
    try {
      const newMessage = {
        sendMessage: message,
        recipientId: 'User',
      };

      const response = await axios.post('http://154.12.55.105:8081/message/send', newMessage, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": auth,
        }
      });

      setMessages(prevMessages => [...prevMessages, ...response.data.data]);
    } catch (error) {
      setError('Error sending message');
      console.error(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.main}>
      <header>
        <HeaderComponent1 isLogined={isLogined}/>
      </header>
      <main className={styles.BodyContents}>
        <MainContainer className={styles.MainContainer}>
          <Sidebar position="left" className={styles.Sidebar}>
            <ConversationList className={styles.ConversationList}>
              {conversations.map(conv => (
                <Conversation
                  className={currentConversation === conv.user.id ? styles.ConversationActive : styles.Conversation}
                  key={conv.user?.id}
                  name={conv.user?.username}
                  info={conv.lastMessage}
                  onClick={() => setCurrentConversation(conv.user?.id)}
                  unreadCnt={unreadCounts[conv.user?.id]}
                >
                  <Avatar src={conv.user?.pic} name={conv.user?.username} className={styles.Avatar}/>
                  {unreadCounts[conv.user?.id] > 0 && (
                    <div className="unread-count">
                      {unreadCounts[conv.user.id]}
                    </div>
                  )}
                </Conversation>
              ))}
            </ConversationList>
          </Sidebar>
          {show ? (
            <ChatContainer>
              <ConversationHeader className={styles.ConversationHeader}>
                <Avatar src={conversations[0].user.pic} />
                <ConversationHeader.Content userName={conversations[0].user.username} />
              </ConversationHeader>
              <MessageList>
                <MessageSeparator content="Saturday, 30 November 2019" />
                {messages.map((msg, index) => (
                  <Message
                    className={styles.Message}
                    key={index}
                    model={{
                      message: msg.sendMessage,
                      sentTime: msg.sendTime,
                      sender: msg.sendUser.username,
                      direction: msg.sendUser.username === currentUserName ? 'outgoing' : 'incoming'
                    }}
                  />
                ))}
              </MessageList>
              <MessageInput placeholder="Type message here" onSend={handleSend} attachButton={false} className={styles.MessageInput}/>
            </ChatContainer>
          ) : (
            <div>
              <p>No message!</p>
            </div>
          )}
        </MainContainer>
      </main>
      <footer>
        <PageFooter />
      </footer>
    </div>
  );
};

export default DM;
