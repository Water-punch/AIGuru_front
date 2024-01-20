import Link from "next/link"
import ConversationBox from "../components/common/ConversationBox"

const firstMessage = '연애에 대한 고민이 있는자 나에게로..'

const HomePage = (props: any) => {

    return (
        <div className="flex flex-col items-center min-h-screen bg-cover bg-[url('/images/background-home.jpg')]" >
            <img src="/images/title.png" className="title-resizing mt-4"></img>
            <img src="/images/guru.png" className="quarter-size mt-4"></img>

            <div>
                <ConversationBox text={firstMessage}/>
            </div>

            <div className="flex flex-row gap-20 mt-10">
                <Link href='/counseling'>
                    <div className="min-w-12 h-6 border-2 border-white bg-[#b91c1c]">👉구루에게 상담받기</div>
                </Link>
            </div>

            <div className="flex flex-row gap-20 mt-10 mb-12">
                <Link href='/login'>
                    <div className="min-w-12 h-6 border-2 border-white bg-white/50">SNS 간편로그인</div>
                </Link>
                <Link href='/board'>
                    <div className="min-w-12 h-6 border-2 border-white bg-white/50">구루의 제자들</div>
                </Link>
            </div>
        </div>
    )
}

export default HomePage

// -- 서버에서만 실행되는 코드 --
// static props와 serversideprops 선택 기준: 자주 렌더링 되냐? 자주변한다면 serverside를..

// SSG - 처음에 소실될 데이터를 보충하기 위해서?(데이터를 사전 렌더링 전에 빌드 프로세스에서 받을 수 있음) 근데 우리는 필요없을듯.
// export function getStaticProps() {
//     // fetch data from an API

//     return {
//         props: {},
//         //만약 데이터가 자주 변한다면? 예전 데이터를 보여주지 않으려면 변할 때마다 빌드해줘야 함
//         revalidate: 10
//         //서버에서 설정한 초마다 페이지를 재생성!
//     }
// }

// 요청이 있을 때만 다시 빌드하려면? 
// export function getServerSideProps(context: any) {
//     const req = context.req;
//     const res = context.res;

//     // fetch data from an API

//     return {
//         props: {},
//     }
// }