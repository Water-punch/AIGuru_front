import Link from 'next/link';
import PostCard from './PostCard';

const PostCards = ({ dummyData }: PostCardsProps) => {
  return (
    <div className="flex flex-col gap-5">
      {dummyData.map((data: PostDataType, idx: number) => (
        <PostCard key={idx} {...data} />
      ))}
    </div>
  );
};

export default PostCards;
