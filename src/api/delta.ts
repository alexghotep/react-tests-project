export interface DownloadResponse {
    downloadUrl: string;
    title: string;
    duration?: string;
}

export async function convertYoutubeToMp3(videoUrl: string): Promise<DownloadResponse> {
    const instances = [
        'https://api.cobalt.tools',
        'https://cobalt-api.kwiatekm.tokyo',
        'https://co.wuk.sh'
    ];

    let lastError: Error | null = null;

    for (const instance of instances) {
        try {
            const response = await fetch(`${instance}/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    url: videoUrl,
                    downloadMode: 'audio',
                    audioFormat: 'mp3'
                })
            });

            if (!response.ok) {
                continue;
            }

            const data = await response.json();

            // Формат ответа Cobalt v10 / v7
            if (data.url || data.audio) {
                const targetUrl = data.url || data.audio;
                return {
                    title: data.filename || 'YouTube Audio Track',
                    downloadUrl: targetUrl
                };
            }

            if (data.status === 'stream' || data.status === 'redirect' || data.status === 'tunnel') {
                return {
                    title: data.filename || 'YouTube Audio Track',
                    downloadUrl: data.url
                };
            }
        } catch (err) {
            lastError = err instanceof Error ? err : new Error('Не удалось подключиться к сервису обработки');
        }
    }

    throw lastError || new Error('Сервис временно недоступен. Попробуй позже или проверь ссылку.');
}
