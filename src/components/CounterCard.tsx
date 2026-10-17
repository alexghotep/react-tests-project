import { useState, useEffect, useRef } from 'react';
import { alphaApi } from '../api/alpha';

const MIN_COUNT = 0;
const MAX_COUNT = 10;
const DEBOUNCE_MS = 1000;

export function CounterCard() {
    const [count, setCount] = useState<number>(0);
    const [isSyncing, setIsSyncing] = useState<boolean>(false);
    const isInitialMount = useRef(true);

    // Первичная загрузка
    useEffect(() => {
        const controller = new AbortController();

        alphaApi.getCounter(controller.signal)
            .then(data => {
                if (typeof data.count === 'number') {
                    setCount(data.count);
                }
            })
            .catch((err: unknown) => {
                if (err instanceof Error && err.name === 'AbortError') return;
                console.error('Ошибка счётчика:', err);
            });

        return () => controller.abort();
    }, []);

    // Автоматический Debounce-эффект при изменении count
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        setIsSyncing(true);
        const controller = new AbortController();

        const timer = setTimeout(async () => {
            try {
                await alphaApi.updateCounter(count, controller.signal);
            } catch (err: unknown) {
                if (err instanceof Error && err.name === 'AbortError') return;
                console.error('Ошибка синхронизации счётчика:', err);
            } finally {
                setIsSyncing(false);
            }
        }, DEBOUNCE_MS);

        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    }, [count]);

    return (
        <div className="card project-card p-5 text-center">
            <h2 className="h3 fw-bold mb-3">Счётчик</h2>

            <div className="display-4 font-mono text-primary mb-2 user-select-none">
                {count} / {MAX_COUNT}
            </div>

            <div className="small mb-4 text-secondary" style={{ minHeight: '1.25rem' }}>
                {isSyncing ? (
                    <span className="text-warning">
                        <span className="spinner-border spinner-border-sm me-1" role="status" />
                        Синхронизация...
                    </span>
                ) : (
                    <span className="text-success">
                        <i className="bi bi-check2" /> Сохранено
                    </span>
                )}
            </div>

            <div className="d-flex justify-content-center gap-3">
                <button
                    type="button"
                    className="btn btn-outline-secondary px-4"
                    onClick={() => setCount(prev => Math.max(MIN_COUNT, prev - 1))}
                    disabled={count <= MIN_COUNT}
                >
                    -1
                </button>
                <button
                    type="button"
                    className="btn btn-primary px-4"
                    onClick={() => setCount(prev => Math.min(MAX_COUNT, prev + 1))}
                    disabled={count >= MAX_COUNT}
                >
                    +1
                </button>
            </div>
        </div>
    );
}