import Link from "next/link"

const HomePage = () => {

    return (
        <>
            <div>HomePage</div>
            <Link href='/counseling'>
                구루와 상담하기
            </Link>
            <br></br>
            <Link href='/login'>
                로그인
            </Link>
            <br></br>
            <Link href='/board'>
                구루의 제자들
            </Link>
        </>
    )
}

export default HomePage