import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { BsSearch } from 'react-icons/bs';
import { AiFillLike } from 'react-icons/ai';
import FriendList from '@/components/FriendList';
import FriendItem from '@/components/FriendItem';
import MessageList from '@/components/MessageList';
import MessageItem from '@/components/MessageItem';
import SearchList from '@/components/SearchList';
import SearchItem from '@/components/SearchItem';
import { getUserDataStore, removeUserItemDataStore } from '@Utils/store';
import io from 'socket.io-client';
import request from '@Utils/httpRequest';
import api from '@Configs/api';
import { User } from '@Configs/types';
import { Message } from '@Configs/types';

function MessagePage() {
  const socket = useRef<any>();
  const scrollRef = useRef<any>();
  const [user, setUser] = useState(getUserDataStore());
  const [searchUsersData, setSearchUsersData] = useState([]);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState<Message[]>([]);
  const inputMessage = useRef<HTMLInputElement>(null);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    socket.current = io('ws://localhost:8321');
    socket.current.emit('add_user', user.id);
    socket.current.on('receive_message', (data: Message) => {
      console.log(data);
      console.log(selectedUser);
      if (data.sender_id === selectedUser?.id) {
        setMessageList((prev) => [...prev, data]);
      }
    });
    request.get(api.getFriends, { params: { id: user.id } }).then((res) => {
      if (res.data.status === 'success') {
        setFriends(res.data.data);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser]);

  useEffect(() => {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messageList.length]);

  const chooseUser = async (selected_user: User) => {
    if (selectedUser?.id !== selected_user.id) {
      setSelectedUser(selected_user);
      await request.post(api.getDialog, { sender_id: user.id, receiver_id: selected_user.id }).then((res) => {
        if (res.data.status === 'success') {
          setMessageList(res.data.data);
        }
      });
    }
  };

  const searchUsers = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      await request
        .get(api.searchUser, { params: { username: e.target.value, id: user.id } })
        .then((res) => {
          if (res.data.status === 'success') {
            setSearchUsersData(res.data.data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setSearchUsersData([]);
    }
  };

  const sendMessage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (message) {
      socket.current.emit('send_message', {
        sender_id: user.id,
        receiver_id: selectedUser?.id,
        group_id: null,
        content: message,
        type: 'text',
      });
      setMessage('');
      if (inputMessage && inputMessage.current) {
        inputMessage.current.focus();
      }
      setMessageList((prev) => {
        prev.push({
          sender_id: user.id,
          receiver_id: selectedUser?.id,
          group_id: null,
          content: message,
          type: 'text',
        });
        return prev;
      });
    }
  };

  const logout = () => {
    removeUserItemDataStore();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="flex">
        <div className="w-3/12 h-screen bg-white flex">
          <div className="flex-column w-1/4 h-screen bg-blue-400">
            <button className="text-center w-full p-2 bg-red-500" onClick={logout}>
              Out
            </button>
          </div>
          <div className="p-4 w-full flex flex-col">
            <h2 className="mb-4 font-bold text-xl">Message</h2>
            <div className="w-full flex items-center p-2 mb-2 border rounded-md bg-base-200">
              <div className=" text-slate-400">
                <BsSearch />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-2 outline-0 bg-base-200 text-slate-400 text-sm"
                onChange={searchUsers}
              />
            </div>
            {searchUsersData.length > 0 ? (
              <SearchList>
                {searchUsersData.map((user: User) => (
                  <SearchItem key={user.id} data={user} onClick={() => chooseUser(user)} />
                ))}
              </SearchList>
            ) : (
              <FriendList>
                {friends.map((friend: User) => (
                  <FriendItem key={friend.id} data={friend} onClick={() => chooseUser(friend)} />
                ))}
              </FriendList>
            )}
          </div>
        </div>
        {selectedUser ? (
          <div className="w-9/12 h-screen flex flex-col">
            <nav className="flex p-2 bg-white h-14">
              <div className="flex items-center">
                <Image
                  className="rounded-full h-8 w-8"
                  alt="T"
                  src={selectedUser ? selectedUser.avatar : ''}
                  width={32}
                  height={32}
                />
                <div className="px-2 py-1 flex flex-col justify-center">
                  <h1 className="text-sm">{selectedUser.name}</h1>
                  <h1 className="text-xs">Active</h1>
                </div>
              </div>
            </nav>
            <MessageList>
              {messageList.map((message, index) =>
                message.sender_id === user.id ? (
                  <MessageItem key={index} type="sending" ref={scrollRef as any} data={message} />
                ) : (
                  <MessageItem key={index} type="receive" ref={scrollRef as any} data={message} />
                )
              )}
            </MessageList>
            <form className="flex items-center p-4 h-18 bg-white">
              <div className="flex-1 py-2 px-4 bg-base-200 rounded-full ">
                <input
                  ref={inputMessage}
                  type="text"
                  className="w-full text-sm bg-inherit outline-none "
                  placeholder="Your messages..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <button className="text-blue-400 text-2xl px-2" onClick={sendMessage}>
                <AiFillLike />
              </button>
            </form>
          </div>
        ) : (
          <div className="w-9/12 h-screen flex flex-col"></div>
        )}
      </div>
    </div>
  );
}

export default MessagePage;
