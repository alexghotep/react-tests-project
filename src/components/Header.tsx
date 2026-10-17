import {Link, useLocation} from 'react-router-dom';
import {SITE_TITLE} from '../constants';
import {useTheme} from '../context/ThemeContext';

export function Header() {
    const location = useLocation();
    const {theme, toggleTheme} = useTheme();
    const isHomePage = location.pathname === '/';

    return (
        <nav className="navbar navbar-expand navbar-custom sticky-top py-3">
            <div className="container">
                <div className="d-flex align-items-center gap-3">
                    {!isHomePage ? (
                        <Link
                            to="/"
                            className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center gap-2 rounded-1 px-3"
                        >
                            <i className="bi bi-caret-left-fill"></i>
                            <span className="d-none d-sm-inline">На главную</span>
                        </Link>
                    ) : (
                        <Link
                            to="/"
                            className="navbar-brand fw-bold d-flex align-items-center gap-2 m-0 text-decoration-none"
                        >
                            <i className="bi bi-terminal-fill text-primary"></i>
                            <span>{SITE_TITLE}</span>
                        </Link>)}
                </div>

                {/* Правая часть: инфо-бейдж и переключатель темы */}
                <div className="ms-auto d-flex align-items-center gap-2">
                    <span className="font-mono small text-secondary d-none d-md-inline me-2">
                        <i className="bi bi-lightning-charge-fill text-info me-1"></i>
                        React + Vite
                    </span>

                    <button
                        type="button"
                        onClick={toggleTheme}
                        className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center justify-content-center rounded-circle"
                        style={{width: '36px', height: '36px'}}
                        title={theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'}
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? (
                            <i className="bi bi-sun-fill text-warning"></i>
                        ) : (
                            <i className="bi bi-moon-stars-fill text-primary"></i>
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
}
