import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AlphaPage from './pages/AlphaPage';

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          {/* Главная страница со списком проектов */}
          <Route path="/" element={<HomePage />} />

          {/* Страница Project Alpha */}
          <Route path="/alpha" element={<AlphaPage />} />

          {/* Если путь не найден — можно редиректить на главную */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
  );
}