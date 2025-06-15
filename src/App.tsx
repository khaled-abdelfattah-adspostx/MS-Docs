import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useStore } from './store';
import HomePage from './pages/HomePage';
import ApiExplorerPage from './pages/ApiExplorerPage';
import MomentsShowcasePage from './pages/MomentsShowcasePage';

function App() {
  const { isDarkMode } = useStore();

  // Apply theme on mount and when changed
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  return (
    <Router basename="/MS-Docs">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/api-explorer" element={<ApiExplorerPage />} />
        <Route path="/moments-showcase" element={<MomentsShowcasePage />} />
      </Routes>
    </Router>
  );
}

export default App;
