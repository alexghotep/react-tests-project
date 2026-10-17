import { useState, useEffect, type SyntheticEvent } from 'react';
import { alphaApi } from '../api/alpha';

export function UserProfileCard() {
    const [savedName, setSavedName] = useState<string>('Гость');
    const [inputName, setInputName] = useState<string>('');
    const [isSaving, setIsSaving] = useState<boolean>(false);

    useEffect(() => {
        const controller = new AbortController();

        alphaApi.getUser(controller.signal)
            .then(data => {
                if (data.name) {
                    setSavedName(data.name);
                    setInputName(data.name);
                }
            })
            .catch((err: unknown) => {
                if (err instanceof Error && err.name === 'AbortError') return;
                console.error('Ошибка профиля:', err);
            });

        return () => controller.abort();
    }, []);

    const handleSave = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const nextName = inputName.trim() || 'Гость';
        if (nextName === savedName || isSaving) return;

        setIsSaving(true);
        try {
            const data = await alphaApi.saveUser(nextName);
            if (data.success) {
                setSavedName(data.name);
            }
        } catch (err: unknown) {
            console.error('Ошибка сохранения:', err);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="card project-card p-5">
            <div className="card-body p-0">
                <form onSubmit={handleSave}>
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
                        />
                        <button
                            className="btn btn-primary d-inline-flex align-items-center gap-2"
                            type="submit"
                            disabled={isSaving || inputName.trim() === savedName}
                        >
                            {isSaving ? (
                                <>
                                    <span className="spinner-border spinner-border-sm" role="status" />
                                    Сохранение...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-check2" /> Сохранить
                                </>
                            )}
                        </button>
                    </div>
                </form>
                <div className="form-text text-secondary small">
                    Здравствуйте, <span className="text-light fw-medium">{savedName}</span>
                </div>
            </div>
        </div>
    );
}