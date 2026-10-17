import {useEffect, useState} from "react";
import {SITE_BRAND} from '../constants';

export default function BetaPage() {
    useEffect(() => {
        document.title = SITE_BRAND + ' / Beta Page';
    })
    const [color, setColor] = useState("green");
    const [clicks, setClicks] = useState<number>(0);
    const bsColors: Record<string, string> = {
        green: 'text-success',
        yellow: 'text-warning',
        blue: 'text-primary',
    };

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');

    const roles: Record<string, string> = {
        dev: 'Разработчик',
        qa: 'Тестировщик',
        design: 'Дизайнер'
    };

    const [role, setRole] = useState<string>(roles.dev);

    // Состояния для редактирования профиля
    const [name, setName] = useState<string>('Алексей');
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [tempName, setTempName] = useState<string>('Алексей');

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="vstack gap-4">

                        {/* Карточка: Цвета и клики */}
                        <div className="card project-card p-4">
                            <h2 className="h5 fw-bold mb-3">Управление цветом и кликами</h2>
                            <div className="d-flex gap-2 mb-3">
                                <button
                                    className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center gap-2"
                                    onClick={() => {
                                        setColor("green");
                                        setClicks(clicks + 1);
                                    }}>
                                    Set Green
                                </button>
                                <button
                                    className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center gap-2"
                                    onClick={() => {
                                        setColor("yellow");
                                        setClicks(clicks + 1);
                                    }}>
                                    Set Yellow
                                </button>
                                <button
                                    className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center gap-2"
                                    onClick={() => {
                                        setColor("blue");
                                        setClicks(clicks + 1);
                                    }}>
                                    Set Blue
                                </button>
                            </div>

                            <div className={`fw-semibold mb-3 font-mono ${bsColors[color]}`}>
                                clicks: {clicks}
                            </div>

                            <div>
                                <button
                                    className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center gap-2"
                                    onClick={() => {
                                        setClicks(0);
                                    }}>
                                    RESET CLICKS
                                </button>
                            </div>
                        </div>

                        {/* Карточка: Пароль */}
                        <div className="card project-card p-4">
                            <label htmlFor="passwordInput" className="form-label fw-semibold">Пароль</label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    id="passwordInput"
                                    placeholder="Введите пароль..."
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                </button>
                            </div>
                        </div>

                        {/* Карточка: Роль */}
                        <div className="card project-card p-4">
                            <h2 className="h5 fw-bold mb-3">Выбор роли</h2>
                            <p className="text-secondary small mb-3">
                                Выберите вашу специализацию из списка ниже:
                            </p>

                            <div className="d-flex flex-wrap gap-2 mb-3">
                                {Object.entries(roles).map(([key, roleName]) => (
                                    <button
                                        key={key}
                                        type="button"
                                        className={`btn btn-sm ${
                                            role === roleName ? 'btn-primary' : 'btn-outline-secondary'
                                        }`}
                                        onClick={() => setRole(roleName)}
                                    >
                                        {roleName}
                                    </button>
                                ))}
                            </div>

                            <div className="form-text text-secondary small">
                                Текущая роль: <span className="text-body fw-medium">{role}</span>
                            </div>
                        </div>

                        {/* Карточка: Редактирование профиля */}
                        <div className="card project-card p-4">
                            <h2 className="h5 fw-bold mb-3">Редактирование профиля</h2>

                            {!isEditing ? (
                                <div className="d-flex align-items-center justify-content-between">
                                    <div>
                                        <span className="text-secondary small d-block">Имя пользователя:</span>
                                        <span className="text-body fw-medium fs-5">{name}</span>
                                    </div>
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-secondary"
                                        onClick={() => {
                                            setTempName(name);
                                            setIsEditing(true);
                                        }}
                                    >
                                        Редактировать
                                    </button>
                                </div>
                            ) : (
                                <div className="vstack gap-3">
                                    <div>
                                        <label htmlFor="nameInput" className="form-label text-secondary small">
                                            Новое имя:
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="nameInput"
                                            value={tempName}
                                            onChange={(e) => setTempName(e.target.value)}
                                            placeholder="Введите имя..."
                                        />
                                    </div>
                                    <div className="d-flex gap-2">
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-primary"
                                            onClick={() => {
                                                setName(tempName); // Сохраняем временное значение в боевое
                                                setIsEditing(false); // Выходим из режима редактирования
                                            }}
                                        >
                                            Сохранить
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() => setIsEditing(false)} // Просто отменяем без сохранения
                                        >
                                            Отмена
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
