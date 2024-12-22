import { useTheme } from "../Hooks/useTheme";

import iconMoon from "../assets/icon-moon.svg";
import iconSon from "../assets/icon-sun.svg";

const Header = () => {
  const { theme, handleTheme } = useTheme();

  return (
    <header className="flex justify-between items-center w-[450px] max-sm:w-[90%] py-2">
      <h1 className={`text-white text-4xl tracking-[1rem] font-bold`}>TODO</h1>
      {theme === "LightTheme" && (
        <img
          onClick={() => handleTheme("DarkTheme")}
          src={iconMoon}
          className="cursor-pointer hover:scale-110"
        />
      )}
      {theme === "DarkTheme" && (
        <img
          onClick={() => handleTheme("LightTheme")}
          src={iconSon}
          className="cursor-pointer hover:scale-110"
        />
      )}
    </header>
  );
};

export default Header;
