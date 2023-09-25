import Image from 'next/image';
import images from '@/assets/images/images';

function MessengerItem({ type = 'sending' }: { type: string }) {
  return type === 'sending' ? (
    <div className="flex flex-row-reverse pl-2 py-4">
      <div className="px-2 flex flex-col justify-center max-w-[45%]">
        <div className="text-sm py-2 px-4 bg-blue-200 rounded-lg">
          Xin chao Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus expedita in dolorum cumque iure,
          unde quia quam? Ut, possimus officia eveniet repellendus cum, provident, corrupti modi aut excepturi est nemo.
        </div>
      </div>
    </div>
  ) : (
    <div className="flex pl-2 p-4">
      <Image className="rounded-full h-6 w-6" alt="T" src={images.avatar} />
      <div className="px-2 flex flex-col justify-center max-w-[45%]">
        <div className="text-sm py-2 px-4 bg-slate-200 rounded-lg">
          Xin chao Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus expedita in dolorum cumque iure,
          unde quia quam? Ut, possimus officia eveniet repellendus cum, provident, corrupti modi aut excepturi est nemo.
        </div>
      </div>
    </div>
  );
}

export default MessengerItem;
