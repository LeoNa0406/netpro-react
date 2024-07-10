import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Axios from "axios";
import { Button } from "@mui/material";

function App() {
  const [sample, setSample] = useState();

  useEffect(() => {
    Axios.get("https://netpro-express.onrender.com/").then((response) => {
      setSample(response.data);
    });
  }, []);
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <h1 className="text-4xl mb-4">予定共有アプリケーションへようこそ</h1>
        <RouterLink to="/login" className="no-underline">
          <Button
            variant="contained"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg text-lg hover:bg-blue-700"
          >
            ログインする
          </Button>
        </RouterLink>
      </div>
      {sample}
    </>
  );
}

export default App;
