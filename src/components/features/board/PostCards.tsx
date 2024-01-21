import Link from 'next/link';
import PostCard from './PostCard';

const PostCards = ({ dummyData }: PostCardsProps) => {
  console.log('dummyData 1111111111111', dummyData);
  return (
    <div className="flex flex-col gap-5">
      {dummyData.map((data: BoardDataType, idx: number) => (
        <PostCard key={idx} {...data} />
      ))}
    </div>
  );
};

export default PostCards;
