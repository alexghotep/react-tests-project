import { useState } from 'react';

export function SpoilerCard() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleOpen = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className="card project-card p-5 text-center">
            <h2 className="h3 fw-bold mb-3">Интерактивный спойлер</h2>
            <p className="text-secondary small mb-4">
                Нажми на кнопку ниже, чтобы изменить состояние видимости блока.
            </p>

            <button
                type="button"
                className="btn btn-outline-primary mb-3"
                onClick={toggleOpen}
                aria-expanded={isOpen}
                aria-controls="spoiler-content"
            >
                {isOpen ? 'Скрыть детали' : 'Показать детали'}
            </button>

            {isOpen && (
                <div
                    id="spoiler-content"
                    role="region"
                    className="p-3 rounded bg-dark border border-secondary text-secondary small animate-fade mt-2"
                >
                    🎉 Секретный блок открыт! Появление верстки на переменную из{' '}
                    <code className="font-mono text-info">useState</code>.
                </div>
            )}
        </div>
    );
}