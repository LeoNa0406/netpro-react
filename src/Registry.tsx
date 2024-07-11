import { Button, TextField } from "@mui/material";
import axios from "axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import {
  User, createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FormEvent, useState } from "react";
import { auth } from "./firebase";

function Registry() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let userCredential = null;
      userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await axios.post('http://localhost:3000/api/signup', {
          firebase_uid: userCredential.user.uid,
          email:email,
          name:username
        }); 
      userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      console.log(user);
      navigate("/select");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-[#212A30] min-h-screen justify-center flex flex-col items-center">
      <div className="flex flex-col items-center mt-24">
        <form className="mt-5 space-y-6" onSubmit={handleSubmit}>
          <div className="mt-4">
            <TextField
              required
              margin="normal"
              id="username"
              variant="outlined"
              label="ユーザー名"
              type="text"
              fullWidth
              aria-required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <TextField
              required
              margin="normal"
              id="email"
              variant="outlined"
              label="メールアドレス"
              type="email"
              fullWidth
              aria-required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-1 relative">
            <TextField
              margin="normal"
              required
              id="password"
              variant="outlined"
              label="パスワード"
              type="password"
              autoComplete="current-password"
              aria-required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <Button
              fullWidth
              variant="contained"
              type="submit"
              className="mt-5 bg-blue-500 text-white py-2 px-4 rounded-lg text-lg hover:bg-blue-700"
            >
              新規登録
            </Button>
            <RouterLink to="/login" className="no-underline">
          <div className="flex flex-col">
            <Button
           sx={{ mt: 3, mb: 2 }}
              variant="contained"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg text-lg hover:bg-blue-700"
            >
              ログイン
            </Button>
          </div>
        </RouterLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registry;
