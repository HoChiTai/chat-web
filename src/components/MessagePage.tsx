import Image from 'next/image';
import { BsSearch } from 'react-icons/bs';
import { AiFillLike } from 'react-icons/ai';
import FriendList from '@/components/FriendList';
import FriendItem from '@/components/FriendItem';
import MessageList from '@/components/MessageList';
import MessageItem from '@/components/MessageItem';
import avatar from '@Images/avatar.png';

function MessagePage() {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="flex">
        <div className="w-3/12 h-screen bg-white flex">
          <div className="flex-column w-1/4 h-screen bg-blue-400"></div>
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
              />
            </div>
            <FriendList>
              <FriendItem />
              <FriendItem />
              <FriendItem />
            </FriendList>
          </div>
        </div>
        <div className="w-9/12 h-screen flex flex-col">
          <nav className="flex p-2 bg-white h-14">
            <div className="flex items-center">
              <Image className="rounded-full h-8 w-8" alt="T" src={avatar} />
              <div className="px-2 py-1 flex flex-col justify-center">
                <h1 className="text-sm">Teo</h1>
                <h1 className="text-xs">Active</h1>
              </div>
            </div>
          </nav>
          <MessageList>
            <MessageItem type="sending" />
            <MessageItem type="sending" />
            <MessageItem type="receive" />
            <MessageItem type="sending" />
            <MessageItem type="receive" />
            <MessageItem type="sending" />
            <MessageItem type="receive" />
            <MessageItem type="sending" />
          </MessageList>
          <div className="flex items-center p-4 h-18 bg-white">
            <div className="flex-1 py-2 px-4 bg-base-200 rounded-full ">
              <input type="text" className="w-full text-sm bg-inherit outline-none " placeholder="Your messages..." />
            </div>
            <div className="text-blue-400 text-2xl px-2">
              <AiFillLike />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessagePage;
