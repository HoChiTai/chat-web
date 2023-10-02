import Image from 'next/image';
import { User } from '@Configs/types';

function SearchItem({ data, onClick }: { data: User; onClick: () => void }) {
  return (
    <div className="flex py-2" onClick={onClick}>
      <Image className="rounded-full h-12 w-12" alt={data.name} src={data.avatar} width={100} height={100} />
      <div className="px-2 py-1 flex flex-col justify-center">
        <h1 className="text-sm">{data.name}</h1>
      </div>
    </div>
  );
}

export default SearchItem;
