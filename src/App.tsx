import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {ThemeProvider} from './context/ThemeContext';
import {Header} from './components/Header';
import {Footer} from './components/Footer';
import HomePage from './pages/HomePage';
import AlphaPage from './pages/AlphaPage';
import BetaPage from './pages/BetaPage';
import GammaPage from './pages/GammaPage';

export default function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <Header/>
                <div className="flex-grow-1 d-flex flex-column">
                    <Routes>
                        {/* Главная страница со списком проектов */}
                        <Route path="/" element={<HomePage/>}/>

                        {/* Страница Project Alpha */}
                        <Route path="/alpha" element={<AlphaPage/>}/>

                        {/* Страница Project Beta */}
                        <Route path="/beta" element={<BetaPage/>}/>

                        {/* Страница Project Gamma */}
                        <Route path="/gamma" element={<GammaPage/>}/>

                        {/* Редирект на главную */}
                        <Route path="*" element={<HomePage/>}/>
                    </Routes>
                </div>
                <Footer/>
            </BrowserRouter>
        </ThemeProvider>
    );
}
