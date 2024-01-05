import Link from "next/link"

const CounselingResult = () => {

    return (
        <div>
            <div>출력되는 답변</div>
            <Link href='/login'>
                로그인
            </Link>
            <Link href='/write'>
                추가 질문하기
            </Link>
            <Link href='/board/write'>
                제자들에게 질문하기
            </Link>
            <Link href='/counseling'>
                새 질문
            </Link>
        </div>
        
    )
}

export default CounselingResult