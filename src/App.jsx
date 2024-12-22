import { useTheme } from "./Hooks/useTheme";
import { settings } from "./Constants/ThemeConstants";
import { Route, Routes } from "react-router-dom";

import Header from "./Components/Header";
import TodoMain from "./Components/TodoMain";

function App() {
  const { theme } = useTheme();

  const currentTheme = settings[theme] || settings.LightTheme;

  return (
    <div className={`flex flex-col w-full h-screen ${currentTheme.bg}`}>
      <div className="w-full h-72 hero flex items-center justify-center">
        <Header />
      </div>
      <Routes>
        <Route path="/" element={<TodoMain />}></Route>
      </Routes>
    </div>
  );
}

export default App;
