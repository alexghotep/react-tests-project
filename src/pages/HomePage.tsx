import {useState, useEffect} from 'react';
import {SITE_BRAND, SITE_DESCRIPTION} from '../constants';

// 1. Строго задаём 3 статуса
type ProjectStatus = 'В работе' | 'Готов' | 'Запланирован';

interface Project {
    id: string;
    title: string;
    description: string;
    url: string;
    status: ProjectStatus;
    tags: string[];
    icon?: string;
    letter?: string;
}

// 2. Автоматическая привязка цвета бейджика к статусу
const STATUS_BADGE_CLASSES: Record<ProjectStatus, string> = {
    'В работе': 'text-bg-primary',
    'Готов': 'text-bg-success',
    'Запланирован': 'text-bg-secondary'
};

// 3. 1 в работе, остальные запланированы
const INITIAL_PROJECTS: Project[] = [
    {
        id: 'alpha',
        title: 'Project Alpha (α)',
        description: 'Тестирование базовой архитектуры, роутинга и работа с API.',
        url: '/alpha',
        status: 'Готов',
        tags: ['React 19', 'TypeScript', 'REST API'],
        letter: 'α', // или заглавная 'Α'
    },
    {
        id: 'beta',
        title: 'Project Beta (β)',
        description: 'Работа с различными применениями useState',
        url: '/beta',
        status: 'Готов',
        tags: ['React', 'TypeScript', 'useState'],
        letter: 'β',
    },
    {
        id: 'gamma',
        title: 'Project Gamma (γ)',
        description: 'Работа с различными применениями .map к массивам',
        url: '/gamma',
        status: 'Готов',
        tags: ['React', 'TypeScript', 'Arrays', '.map'],
        letter: 'γ',
    },
    {
        id: 'delta',
        title: 'Project Delta (δ)',
        description: 'Конвертация и скачивание аудиодорожки из YouTube в MP3. (не работает, потому что ютуб не разрешает)',
        url: '/delta',
        status: 'Готов',
        tags: ['React 19', 'TypeScript', 'Media API', 'Audio'],
        letter: 'δ',
    },
    {
        id: 'ui-lab',
        title: 'UI Components Lab',
        description: 'Сборка кастомных интерфейсных элементов, сложных форм и анимаций.',
        url: '/ui-lab',
        status: 'Запланирован',
        tags: ['Bootstrap 5', 'CSS3', 'JSX'],
        icon: 'bi-layers',
    },
    {
        id: 'parser',
        title: 'Data Parser',
        description: 'Скрипт для парсинга, фоновой обработки и выгрузки тестовых массивов данных.',
        url: '/parser',
        status: 'Запланирован',
        tags: ['PHP 8.4', 'cURL', 'JSON'],
        icon: 'bi-database-gear',
    },
    {
        id: 'legacy',
        title: 'Legacy Sandbox',
        description: 'Перенос старых наработок и архивных тестов в новый интерфейс.',
        url: '#',
        status: 'Запланирован',
        tags: ['Archive', 'Tests'],
        icon: 'bi-archive',
    },
];

// Кнопки фильтрации
const STATUS_FILTERS: ('Все' | ProjectStatus)[] = ['Все', 'В работе', 'Готов', 'Запланирован'];

export default function App() {
    useEffect(() => {
        document.title = SITE_BRAND + ' / Hub';
    })
    const [activeFilter, setActiveFilter] = useState<'Все' | ProjectStatus>('Все');

    const filteredProjects = activeFilter === 'Все'
        ? INITIAL_PROJECTS
        : INITIAL_PROJECTS.filter((project) => project.status === activeFilter);

    return (
        <>
            {/* Основной контент */}
            <main className="flex-grow-1">
                {/* Hero-секция */}
                <section className="py-5 text-center hero-glow">
                    <div className="container py-3">
                        <div
                            className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill border border-secondary border-opacity-25 bg-body-tertiary mb-3 font-mono small text-secondary">
                            <span className="p-1 bg-success rounded-circle"></span>
                            <span>Система готова к работе</span>
                        </div>
                        <h1 className="display-5 fw-bold mb-3">Рабочее пространство</h1>
                        <p className="lead text-secondary col-lg-6 mx-auto mb-0">
                            {SITE_DESCRIPTION}
                        </p>
                    </div>
                </section>

                {/* Сетка проектов */}
                <section className="pb-5">
                    <div className="container">
                        {/* Шапка секции + Кнопки фильтрации */}
                        <div
                            className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4 pb-3 border-bottom border-secondary border-opacity-25">
                            <div className="d-flex align-items-center gap-3">
                                <h2 className="h5 mb-0 fw-semibold">
                                    <i className="bi bi-grid-1x2 me-2 text-primary"></i>Список проектов
                                </h2>
                                <span className="font-mono small text-secondary">
                  Показано: {filteredProjects.length} из {INITIAL_PROJECTS.length}
                </span>
                            </div>

                            {/* Интерактивный фильтр */}
                            <div className="d-flex flex-wrap gap-2">
                                {STATUS_FILTERS.map((filter) => (
                                    <button
                                        key={filter}
                                        type="button"
                                        onClick={() => setActiveFilter(filter)}
                                        className={`btn btn-sm rounded-pill px-3 ${
                                            activeFilter === filter
                                                ? 'btn-primary'
                                                : 'btn-outline-secondary border-opacity-25'
                                        }`}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Карточки */}
                        <div className="row g-4">
                            {filteredProjects.length > 0 ? (
                                filteredProjects.map((project) => (
                                    <div key={project.id} className="col-12 col-md-6 col-lg-4">
                                        <div
                                            className="card project-card h-100 p-4 d-flex flex-column justify-content-between">
                                            <div>
                                                <div className="d-flex justify-content-between align-items-start mb-3">
                                                    <div className="icon-box font-mono fw-bold">
                                                        {project.letter ? (
                                                            <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>{project.letter}</span>
                                                        ) : (
                                                            <i className={`bi ${project.icon}`}></i>
                                                        )}
                                                    </div>
                                                    <span className={`badge ${STATUS_BADGE_CLASSES[project.status]} rounded-pill`}>{project.status}</span>
                                                </div>

                                                <h3 className="h5 fw-bold mb-2">
                                                    <a href={project.url}
                                                       className="text-decoration-none text-body stretched-link">
                                                        {project.title}
                                                    </a>
                                                </h3>

                                                <p className="text-secondary small mb-4">
                                                    {project.description}
                                                </p>
                                            </div>

                                            <div>
                                                <div
                                                    className="d-flex flex-wrap gap-2 pt-3 border-top border-secondary border-opacity-25">
                                                    {project.tags.map((tag) => (
                                                        <span key={tag} className="tag-badge">{tag}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                /* Пустое состояние (например, для фильтра "Готов") */
                                <div className="col-12 col-md-6 col-lg-8">
                                    <div
                                        className="p-5 rounded-3 border border-secondary border-opacity-25 text-center h-100 d-flex flex-column align-items-center justify-content-center">
                                        <i className="bi bi-inbox fs-1 text-secondary mb-2"></i>
                                        <h4 className="h6 text-body mb-1">Проектов со статусом «{activeFilter}» пока
                                            нет</h4>
                                        <p className="small text-secondary mb-3">Как только завершишь первый проект, он
                                            появится здесь.</p>
                                        <button
                                            type="button"
                                            onClick={() => setActiveFilter('Все')}
                                            className="btn btn-sm btn-outline-primary"
                                        >
                                            Показать все проекты
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Карточка-заглушка для быстрого добавления */}
                            <div className="col-12 col-md-6 col-lg-4">
                                <div
                                    className="card project-card project-card-dashed h-100 p-4 d-flex flex-column align-items-center justify-content-center text-center">
                                    <div className="text-secondary mb-2">
                                        <i className="bi bi-plus-circle fs-2"></i>
                                    </div>
                                    <h4 className="h6 fw-semibold text-secondary mb-1">Новый проект</h4>
                                    <p className="small text-secondary opacity-75 mb-0">
                                        Скоро оживим эту кнопку через форму!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
