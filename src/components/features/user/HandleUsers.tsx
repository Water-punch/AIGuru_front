const HandleUsers = () => {
  return (
    <>
      <div className="flex flex-col mt-[20vh] ml-[10vw] gap-3">
        <div className="mb-3 center-container">
          <div className="mb-3 username text-2xl font-bold">
            마이페이지
          </div>

          <div className="mt-3">
            <input
              className="border rounded p-2"
              type="text"
              placeholder="현재 비밀번호"
            ></input>
          </div>
          <div className="mt-3">
            <input
              className="border rounded p-2"
              type="text"
              placeholder="비밀번호입력"
            ></input>
          </div>
          <div className="mt-3">
            <input
              className="border rounded p-2"
              type="text"
              placeholder="비밀번호확인"
            ></input>
          </div>
          <div className="mt-3">비밀번호 변경</div>
          <div className="mt-3">회원탈퇴</div>
        </div>
      </div>
    </>
  );
};

export default HandleUsers;
