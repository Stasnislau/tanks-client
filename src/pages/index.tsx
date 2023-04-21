import { Context } from "../pages/_app";
import Header from "../Components/Header";
import { useContext } from "react";

const MainPage = () => {
  const context = useContext(Context);
  return (
    <div>
      <Header />
      <button onClick={() => context.updateKills(context.kills + 1)}>
        Start Game
      </button>
    </div>
  );
};

export default MainPage;
