import {useState, useEffect, type SyntheticEvent} from 'react';
import {alphaApi, type Task} from '../api/alpha';

export function TasksCard() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        alphaApi.getTasks(controller.signal)
            .then(data => setTasks(data.tasks || []))
            .catch((err: unknown) => {
                if (err instanceof Error && err.name === 'AbortError') return;
                console.error('Ошибка загрузки задач:', err);
            })
            .finally(() => setIsLoading(false));

        return () => controller.abort();
    }, []);

    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmed = text.trim();
        if (!trimmed || isSubmitting) return;

        setIsSubmitting(true);
        try {
            const data = await alphaApi.addTask(trimmed);
            if (data.success && data.task) {
                setTasks(prev => [...prev, data.task]);
                setText('');
            }
        } catch (err: unknown) {
            console.error('Ошибка создания задачи:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const res = await alphaApi.deleteTask(id);
            if (res.success) {
                setTasks(prev => prev.filter(t => t.id !== id));
            }
        } catch (err: unknown) {
            console.error('Ошибка удаления:', err);
        }
    };

    return (
        <div className="card project-card p-5">
            <h2 className="h4 fw-bold mb-2 text-center">Мой список задач</h2>
            <h3 className="h6 mb-3 text-center">Сейчас задач: {tasks.length}</h3>
            <p className="text-secondary small text-center mb-4">
                Данные синхронизируются с базой MySQL в реальном времени.
            </p>

            <form onSubmit={handleSubmit} className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Новая задача..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    disabled={isSubmitting}
                />
                <button
                    className="btn btn-primary d-inline-flex align-items-center gap-2"
                    type="submit"
                    disabled={isSubmitting || !text.trim()}
                >
                    {isSubmitting ? (
                        <>
                            <span className="spinner-border spinner-border-sm" role="status"/>
                            Добавление...
                        </>
                    ) : (
                        'Добавить'
                    )}
                </button>
            </form>

            <ul className="list-group list-group-flush bg-transparent">
                {isLoading ? (
                    <li className="list-group-item bg-transparent text-secondary text-center small border-0 py-3">
                        <span className="spinner-border spinner-border-sm text-primary me-2" role="status"/>
                        Загрузка задач из базы...
                    </li>
                ) : tasks.length > 0 ? (
                    tasks.map(task => (
                        <li
                            key={task.id}
                            className="list-group-item bg-transparent text-body d-flex justify-content-between align-items-center border-secondary border-opacity-25"
                        >
                            <span>{task.text}</span>
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-danger border-0"
                                onClick={() => handleDelete(task.id)}
                                title="Удалить задачу"
                            >
                                <i className="bi bi-trash"/>
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
    );
}