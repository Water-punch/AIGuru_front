import Link from "next/link"

const BoardPage = () => {

    return (
        <div>
            <div>BoardPage</div>
            <Link href='/login'>
                로그인
            </Link>
            <Link href='/mypage'>
                마이페이지
            </Link> 
        </div>

    )
}

export default BoardPage