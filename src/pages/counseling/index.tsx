import Link from "next/link"

const AIcounselingPage = () => {

    return (
        <div>
            <div>상담페이지</div>
            <Link href='/login'>
                로그인
            </Link>
            <Link href='/mypage'>
                마이페이지
            </Link> 
        </div>
    )
}

export default AIcounselingPage