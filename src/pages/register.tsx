import { useState } from 'react';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  return (
    <div>
      RegisterPage
      <div className="form flex flex-col gap-4 my-10 max-w-250">
        <input
          type="text"
          placeholder="email을 입력해주세요."
          onChange={e => setEmail(e.target.value)}
          className="border-2 border-black"
        />
        <input
          type="text"
          placeholder="비밀번호를 입력해주세요."
          onChange={e => setPassword(e.target.value)}
          className="border-2 border-black"
        />
        {confirm !== password ? (
          <input
            type="text"
            placeholder="비밀번호를 다시 한 번 입력해주세요."
            onChange={e => setConfirm(e.target.value)}
            className="border-2 border-[#cf0404]"
          />
        ) : (
          <input
            type="text"
            placeholder="비밀번호를 다시 한 번 입력해주세요."
            onChange={e => setConfirm(e.target.value)}
            className="border-2 border-black"
          />
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
