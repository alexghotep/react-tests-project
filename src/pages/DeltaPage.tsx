// src/pages/DeltaPage.tsx
import React, { useState } from 'react';
import { convertYoutubeToMp3 } from '../api/delta';

export const DeltaPage: React.FC = () => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<{ title: string; downloadUrl: string } | null>(null);

    const isValidYoutubeUrl = (testUrl: string) => {
        const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
        return pattern.test(testUrl.trim());
    };

    const handleConvert = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setResult(null);

        if (!isValidYoutubeUrl(url)) {
            setError('Пожалуйста, введи корректную ссылку на ролик YouTube');
            return;
        }

        try {
            setLoading(true);
            const data = await convertYoutubeToMp3(url.trim());
            setResult(data);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Неизвестная ошибка при обработке');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-4">
            <h2 className="mb-3">YouTube to MP3 Converter (Delta) не работает потому что Ютуб не разрешает (</h2>

            <form onSubmit={handleConvert} className="mb-4">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Вставь ссылку на видео (https://youtube.com/watch?v=...)"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading || !url.trim()}
                    >
                        {loading ? 'Конвертация...' : 'Скачать MP3'}
                    </button>
                </div>
            </form>

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            {result && (
                <div className="card shadow-sm mt-3">
                    <div className="card-body">
                        <h5 className="card-title">{result.title}</h5>
                        <p className="card-text text-muted">Аудиодорожка успешно извлечена.</p>
                        <a
                            href={result.downloadUrl}
                            className="btn btn-success"
                            download
                            target="_blank"
                            rel="noreferrer"
                        >
                            Скачать файл
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};
