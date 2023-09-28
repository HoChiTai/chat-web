import Image from 'next/image';
import avatar from '@Images/avatar.png';

function MessageItem() {
  return (
    <div className="flex py-2">
      <Image
        className="rounded-full h-12 w-12"
        alt="T"
        src="https://atg-prod-scalar.s3.amazonaws.com/studentpower/media/user%20avatar.png"
        width={100}
        height={100}
      />
      <div className="px-2 py-1 flex flex-col justify-center">
        <h1 className="text-sm">Teo</h1>
        <h1 className="text-xs">Xin chao</h1>
      </div>
    </div>
  );
}

export default MessageItem;
