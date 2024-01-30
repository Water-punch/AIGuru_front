import Link from 'next/link';
import { useRouter } from 'next/router';
import MyPageButton from './MyPageButton';
import { useValidation } from '@/src/hooks/api/user';
import { useDispatch } from 'react-redux';
import { login } from '@/src/store/user';

const NavButtons = () => {
  const router = useRouter();
  const position = router.pathname;
  const validation = useValidation();
  const dispatch = useDispatch();
  
  const handleNavigation = (path: string) => {
    validation.executeQuery();
    
    if (validation.error) {
      alert('로그인이 필요한 기능입니다.');
      router.push('/login');
    } else {
      dispatch(login({ user: validation.data?.data }));
      router.push(path);
    }
  };

  return (
    <div className="absolute top-0 right-0 m-6">
      {
      position.includes('write' || 'edit') &&
        <div className="flex flex-row gap-6">
          <Link href="/board">
            <button>
              <img
                src="/images/parthenon.png"
                className="rounded-full h-[30px] w-[30px]"
              ></img>
            </button>
          </Link>
          <Link href="/">
            <button>
              <img
                src="/images/guru.png"
                className="rounded-full h-[33px] w-[33px]"
              ></img>
            </button>
          </Link>
          <MyPageButton />
        </div>
      } 

      {
      position.includes('/board') && !position.includes('write' || 'edit') &&
        <div className="flex flex-row gap-6">
          <Link href="/board">
            <button>
              <img
                src="/images/parthenon.png"
                className="rounded-full h-[30px] w-[30px]"
              ></img>
            </button>
          </Link>

          <button 
            className="flex items-start" 
            onClick={() => handleNavigation('/board/write')}
          >
            <img
              src="/images/writing.png"
              className="rounded-full h-[30px] w-[30px]"
            ></img>
          </button>

          <Link href="/">
            <button>
              <img
                src="/images/guru.png"
                className="rounded-full h-[33px] w-[33px]"
              ></img>
            </button>
          </Link>
          <MyPageButton />
        </div>
      } 
    
      {(!position.includes("write") && !position.includes("board")) &&
        <div className="flex flex-row gap-6">
          <Link href="/board">
            <button>
              <img
                src="/images/parthenon.png"
                className="rounded-full h-[30px] w-[30px]"
              ></img>
            </button>
          </Link>
          <MyPageButton />
        </div>
      }
      
    </div>
  );
};

export default NavButtons;
