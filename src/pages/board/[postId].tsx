// 상세조회
import Link from "next/link"

const BoardDetailPage = () => {

    return (
        <div>
            <div>BoardDetailPage</div>
            <Link href='/board'>
                게시판 목록
            </Link>
            <Link href='/login'>
                로그인
            </Link>
            <Link href='/mypage'>
                마이페이지
            </Link>      
        </div>
        
    )
}

export default BoardDetailPage