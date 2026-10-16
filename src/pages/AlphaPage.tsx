import { useState, useEffect } from 'react';

// Интерфейс задачи
interface Task {
    id: number;
    text: string;
}

export default function AlphaPage() {
    // -------------------------------------------------------------------------
    // 1. СОСТОЯНИЯ (STATE)
    // -------------------------------------------------------------------------

    // Счётчик
    const [count, setCount] = useState<number>(0);

    // Имя пользователя
    const [savedName, setSavedName] = useState<string>('Гость');
    const [inputName, setInputName] = useState<string>('');
    const [isSavingName, setIsSavingName] = useState<boolean>(false);

    // Спойлер
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // Список задач
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskText, setNewTaskText] = useState<string>('');
    const [isLoadingTasks, setIsLoadingTasks] = useState<boolean>(true);
    const [isAddingTask, setIsAddingTask] = useState<boolean>(false);

    // -------------------------------------------------------------------------
    // 2. ЗАГРУЗКА ДАННЫХ ПРИ СТАРТЕ (EFFECTS)
    // -------------------------------------------------------------------------
    useEffect(() => {
        // 1. Загрузка счётчика
        fetch('https://dev.ghotep.ru/api/counter.php')
            .then(res => res.json())
            .then(data => {
                if (data.count !== undefined) {
                    setCount(data.count);
                }
            })
            .catch(err => console.error('Ошибка загрузки счётчика:', err));

        // 2. Загрузка имени
        fetch('https://dev.ghotep.ru/api/user.php')
            .then(res => res.json())
            .then(data => {
                if (data.name) {
                    setSavedName(data.name);
                    setInputName(data.name);
                }
            })
            .catch(err => console.error('Ошибка загрузки имени:', err));

        // 3. Загрузка задач из БД
        fetch('https://dev.ghotep.ru/api/tasks.php')
            .then(res => res.json())
            .then(data => {
                if (data.tasks) {
                    setTasks(data.tasks);
                }
            })
            .catch(err => console.error('Ошибка загрузки задач:', err))
            .finally(() => setIsLoadingTasks(false));
    }, []);

    // -------------------------------------------------------------------------
    // 3. ОБРАБОТЧИКИ СОБЫТИЙ (HANDLERS)
    // -------------------------------------------------------------------------

    // Счётчик
    const updateServerCounter = (newCount: number) => {
        fetch('https://dev.ghotep.ru/api/counter.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ count: newCount }),
        }).catch(err => console.error('Ошибка сохранения счётчика:', err));
    };

    const handleDecrement = () => {
        if (count > 0) {
            const newCount = count - 1;
            setCount(newCount);
            updateServerCounter(newCount);
        }
    };

    const handleIncrement = () => {
        if (count < 10) {
            const newCount = count + 1;
            setCount(newCount);
            updateServerCounter(newCount);
        }
    };

    // Имя пользователя
    const handleSaveName = () => {
        const nameToSend = inputName.trim() || 'Гость';
        setIsSavingName(true);

        fetch('https://dev.ghotep.ru/api/user.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: nameToSend }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setSavedName(data.name);
                }
            })
            .catch(err => console.error('Ошибка сохранения имени:', err))
            .finally(() => setIsSavingName(false));
    };

    // Задачи: Добавление в БД
    const handleAddTask = () => {
        const text = newTaskText.trim();
        if (text === '') return;

        setIsAddingTask(true);

        fetch('https://dev.ghotep.ru/api/tasks.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.success && data.task) {
                    // Добавляем свежесозданную задачу из БД в локальный стейт
                    setTasks([...tasks, data.task]);
                    setNewTaskText('');
                }
            })
            .catch(err => console.error('Ошибка добавления задачи:', err))
            .finally(() => setIsAddingTask(false));
    };

    // Задачи: Удаление из БД
    const handleDeleteTask = (id: number) => {
        fetch(`https://dev.ghotep.ru/api/tasks.php?id=${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    // Удаляем задачу из локального массива
                    setTasks(tasks.filter(task => task.id !== id));
                }
            })
            .catch(err => console.error('Ошибка удаления задачи:', err));
    };

    // -------------------------------------------------------------------------
    // 4. РЕНДЕРИНГ (JSX)
    // -------------------------------------------------------------------------
    return (
        <div className="container py-5">
            {/* Кнопка возврата на главную */}
            <div className="mb-4">
                <a href="/" className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center gap-2">
                    <i className="bi bi-arrow-left"></i> На главную
                </a>
            </div>

            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="vstack gap-4">

                        {/* Карточка 0: ToDo лист / Список */}
                        <div className="card project-card p-5">
                            <h2 className="h4 fw-bold mb-3 text-center">Мой список задач</h2>
                            <p className="text-secondary small text-center mb-4">
                                Данные синхронизируются с базой MySQL в реальном времени.
                            </p>

                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Новая задача..."
                                    value={newTaskText}
                                    onChange={(e) => setNewTaskText(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleAddTask();
                                    }}
                                    disabled={isAddingTask}
                                />
                                <button
                                    className="btn btn-primary d-inline-flex align-items-center gap-2"
                                    type="button"
                                    onClick={handleAddTask}
                                    disabled={isAddingTask || newTaskText.trim() === ''}
                                >
                                    {isAddingTask ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            Добавление...
                                        </>
                                    ) : (
                                        'Добавить'
                                    )}
                                </button>
                            </div>

                            <ul className="list-group list-group-flush bg-transparent">
                                {isLoadingTasks ? (
                                    <li className="list-group-item bg-transparent text-secondary text-center small border-0 py-3">
                                        <div className="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
                                        Загрузка задач из базы...
                                    </li>
                                ) : tasks.length > 0 ? (
                                    tasks.map((task) => (
                                        <li
                                            key={task.id}
                                            className="list-group-item bg-transparent text-light d-flex justify-content-between align-items-center border-secondary"
                                        >
                                            <span>{task.text}</span>
                                            <button
                                                className="btn btn-sm btn-outline-danger border-0"
                                                onClick={() => handleDeleteTask(task.id)}
                                                title="Удалить задачу"
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </li>
                                    ))
                                ) : (
                                    <li className="list-group-item bg-transparent text-secondary text-center small border-0 py-3">
                                        Список задач пуст
                                    </li>
                                )}
                            </ul>
                        </div>

                        {/* Карточка 1: Приветствие с кнопкой сохранения */}
                        <div className="card project-card p-5">
                            <div className="card-body p-0">
                                <label htmlFor="customInput" className="form-label fw-semibold">
                                    Ваше имя
                                </label>

                                <div className="input-group mb-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="customInput"
                                        placeholder="Введите имя..."
                                        value={inputName}
                                        onChange={(e) => setInputName(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleSaveName();
                                        }}
                                    />
                                    <button
                                        className="btn btn-primary d-inline-flex align-items-center gap-2"
                                        type="button"
                                        onClick={handleSaveName}
                                        disabled={isSavingName || inputName.trim() === savedName}
                                    >
                                        {isSavingName ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                Сохранение...
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-check2"></i> Сохранить
                                            </>
                                        )}
                                    </button>
                                </div>

                                <div className="form-text text-secondary small">
                                    Здравствуйте, <span className="text-light fw-medium">{savedName}</span>
                                </div>
                            </div>
                        </div>

                        {/* Карточка 2: Спойлер */}
                        <div className="card project-card p-5 text-center">
                            <h1 className="h3 fw-bold mb-3">Интерактивный спойлер</h1>
                            <p className="text-secondary small mb-4">
                                Нажми на кнопку ниже, чтобы изменить состояние видимости блока.
                            </p>

                            <button
                                type="button"
                                className="btn btn-outline-primary mb-3"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                {isOpen ? 'Скрыть детали' : 'Показать детали'}
                            </button>

                            {isOpen && (
                                <div className="p-3 rounded bg-dark border border-secondary text-secondary small animate-fade mt-2">
                                    🎉 Секретный блок открыт! Появление верстки на переменную из <code className="font-mono text-info">useState</code>.
                                </div>
                            )}
                        </div>

                        {/* Карточка 3: Счётчик */}
                        <div className="card project-card p-5 text-center">
                            <h1 className="h3 fw-bold mb-3">Мой первый счётчик</h1>

                            <div className="display-4 font-mono text-primary mb-4 user-select-none">
                                {count} / 10
                            </div>

                            <div className="d-flex justify-content-center gap-3">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary px-4"
                                    onClick={handleDecrement}
                                    disabled={count === 0}
                                >
                                    -1
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-primary px-4"
                                    onClick={handleIncrement}
                                    disabled={count === 10}
                                >
                                    +1
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}