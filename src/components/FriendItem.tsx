import Image from 'next/image';
import images from '@/assets/images/images';

function MessengerItem() {
  return (
    <div className="flex py-2">
      <Image className="rounded-full h-12 w-12" alt="T" src={images.avatar} />
      <div className="px-2 py-1 flex flex-col justify-center">
        <h1 className="text-sm">Teo</h1>
        <h1 className="text-xs">Xin chao</h1>
      </div>
    </div>
  );
}

export default MessengerItem;
