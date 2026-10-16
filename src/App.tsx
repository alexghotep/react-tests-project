import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import AlphaPage from './pages/AlphaPage';
import BetaPage from './pages/BetaPage';
import GammaPage from './pages/GammaPage';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Главная страница со списком проектов */}
                <Route path="/" element={<HomePage/>}/>

                {/* Страница Project Alpha */}
                <Route path="/alpha" element={<AlphaPage/>}/>
                {/* Страница Project Beta */}
                <Route path="/beta" element={<BetaPage/>}/>
                {/* Страница Project Beta */}
                <Route path="/gamma" element={<GammaPage/>}/>

                {/* Если путь не найден — можно редиректить на главную */}
                <Route path="*" element={<HomePage/>}/>
            </Routes>
        </BrowserRouter>
    );
}