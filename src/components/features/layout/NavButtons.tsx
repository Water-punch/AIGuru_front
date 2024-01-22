import Link from 'next/link';
import { useRouter } from 'next/router';
import MyPageButton from './MyPageButton';

const NavButtons = () => {
  const router = useRouter();
  const position = router.pathname;
  console.log(position);

  return (
    <div className="absolute top-0 right-0 m-6">
      {router.pathname.includes('write') ? (
        <div className="flex flex-row gap-6">
          <Link href="/board">
            <img
              src="/images/parthenon.png"
              className="rounded-full h-[30px] w-[30px]"
            ></img>
          </Link>
          <Link href="/">
            <img
              src="/images/guru.png"
              className="rounded-full h-[33px] w-[33px]"
            ></img>
          </Link>
          <MyPageButton />
        </div>
      ) : router.pathname.includes('board') ? (
        <div className="flex flex-row gap-6">
          <Link href="/board">
            <img
              src="/images/parthenon.png"
              className="rounded-full h-[30px] w-[30px]"
            ></img>
          </Link>
          <Link href="/board/write">
            <img
              src="/images/writing.png"
              className="rounded-full h-[30px] w-[30px]"
            ></img>
          </Link>
          <Link href="/">
            <img
              src="/images/guru.png"
              className="rounded-full h-[33px] w-[33px]"
            ></img>
          </Link>
          <MyPageButton />
        </div>
      ) : (
        <div className="flex flex-row gap-6">
          <Link href="/board">
            <img
              src="/images/parthenon.png"
              className="rounded-full h-[30px] w-[30px]"
            ></img>
          </Link>
          <MyPageButton />
        </div>
      )}
    </div>
  );
};

export default NavButtons;
