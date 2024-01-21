import { RootState } from '@/src/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/src/store/user';

const EmailLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const givenUserId = useSelector((state: RootState) => state.user.userId);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    // API call
    // 성공할 경우: dispatch(login(받아온 userData))
  };

  useEffect(() => {
    if (givenUserId !== '') {
      // 로그인 성공 로직
    }
  }, [givenUserId]);

  return (
    <div className="form">
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
      </div>
      <button onClick={handleSubmit}>로그인</button>
    </div>
  );
};

export default EmailLoginPage;
