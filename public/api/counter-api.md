# Counter API

Простой эндпоинт для синхронизации глобального состояния счётчика между фронтендом и БД.

- **Base URL:** `https://dev.ghotep.ru`
- **Content-Type:** `application/json`
- **CORS:** Разрешён (`Access-Control-Allow-Origin: *`)

---

## Методы

### 1. Получить текущее значение
Возвращает актуальное число из таблицы `settings`.

- **Метод:** `GET`
- **Путь:** `/api/counter.php`
- **Тело запроса:** отсутствует

#### Успешный ответ (200 OK)
```json
{
  "count": 0
}
```

---

### 2. Обновить значение
Перезаписывает значение счётчика в базе данных.

- **Метод:** `POST`
- **Путь:** `/api/counter.php`
- **Headers:** `Content-Type: application/json`

#### Тело запроса (JSON)
```json
{
  "count": 1
}
```

#### Успешный ответ (200 OK)
```json
{
  "success": true,
  "count": 1
}
```

---

## Коды ошибок

| Код | Описание | Пример ответа |
| :--- | :--- | :--- |
| `400 Bad Request` | Не передан параметр `count` или невалидный JSON | `{"error": "Invalid data"}` |
| `500 Internal Server Error` | Ошибка подключения к MySQL / сбой запроса | `{"error": "Database connection failed"}` |