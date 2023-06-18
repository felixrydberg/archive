import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Modal from "../../components/signup/modal";

const SignIn = (props) => {
  const navigation = useNavigate();
  const {setAuth} = useOutletContext();
  const {setUser} = useOutletContext();
  const [content, setContent] = useState({
    display: false,
    message: '',
  });
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  const login = (event) => {
    event.preventDefault();
    const users = JSON.parse(localStorage.getItem("users"));
    const user = users.find(user => user.email === email);
    if(user) {
      if(user.pwd === pwd) {
        setAuth(true);
        setUser(user)
        navigation('/')
      }else {
        setContent({display: true, message: 'Password incorrent'})
      }
    } else {
      setContent({display: true, message: 'User not found'})
    }
  }

  const emailOnchange = (event) => setEmail(event.target.value);

  const pwdOnchange = (event) =>  setPwd(event.target.value);

  const closeModal = () => setContent({display: false})

  return (
    <div className="sign-in-container form-container">
      <form onSubmit={login}>
        <input onChange={emailOnchange} type="email" placeholder="Email"></input>
        <input onChange={pwdOnchange} type="password" placeholder="Password"></input>
        <button type="submit">Login</button>
      </form>
      <Modal content={content} closeModal={closeModal}></Modal>
    </div>
  );
};

export default SignIn;
