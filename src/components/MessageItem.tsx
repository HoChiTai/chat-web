import { forwardRef } from 'react';
import Image from 'next/image';
import { Message } from '@Configs/types';

function MessageItem({ type = 'sending', data }: { type: string; data: Message }, ref: any) {
  return type === 'sending' ? (
    <div className="flex flex-row-reverse pl-2 py-4" ref={ref}>
      <div className="px-2 flex flex-col justify-center max-w-[45%]">
        <div className="text-sm py-2 px-4 bg-blue-200 rounded-lg">{data.content}</div>
      </div>
    </div>
  ) : (
    <div className="flex pl-2 p-4" ref={ref}>
      {/* <Image className="rounded-full h-6 w-6" alt="T" src={data.avatar} /> */}
      <div className="px-2 flex flex-col justify-center max-w-[45%]">
        <div className="text-sm py-2 px-4 bg-slate-200 rounded-lg">{data.content}</div>
      </div>
    </div>
  );
}

export default forwardRef(MessageItem);
