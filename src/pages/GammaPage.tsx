import { useEffect } from 'react';
import { SITE_BRAND } from '../constants';

export default function GammaPage() {
    useEffect(() => {
        document.title = `${SITE_BRAND} / Gamma Page`;
    }, []);

    const products: [string, number][] = [
        ['Кофе', 320],
        ['Сыр', 450],
        ['Хлеб', 60],
    ];

    const pricedItems = products.map(([title, price]) => {
        return `${title} for ${price}`;
    });

    return (
        <div className="container py-5">
            {/* Навигация */}
            <div className="mb-4">
                <a
                    href="/"
                    className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center gap-2 rounded-pill px-3 shadow-sm"
                >
                    <i className="bi bi-arrow-left"></i> На главную
                </a>
            </div>

            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    {/* Карточка 1: Простые строки */}
                    <div className="card bg-dark text-light border border-secondary border-opacity-25 shadow-sm mb-4 rounded-4 overflow-hidden">
                        <div className="card-header bg-transparent py-3 border-bottom-0">
                            <h6 className="card-subtitle text-uppercase text-secondary fw-semibold small">
                                Список 1
                            </h6>
                            <h5 className="card-title fw-bold mb-0 text-light">
                                Массив форматированных строк
                            </h5>
                        </div>
                        <div className="card-body pt-0">
                            <div className="d-flex flex-column gap-2">
                                {pricedItems.map((item, i) => (
                                    <div
                                        key={i}
                                        className="p-2 px-3 bg-body-tertiary border border-secondary border-opacity-25 rounded-3 text-light-emphasis font-monospace small"
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Карточка 2: Двумерный массив с бейджами цен */}
                    <div className="card bg-dark text-light border border-secondary border-opacity-25 shadow-sm rounded-4 overflow-hidden">
                        <div className="card-header bg-transparent py-3 border-bottom-0 d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="card-subtitle text-uppercase text-secondary fw-semibold small">
                                    Список 2
                                </h6>
                                <h5 className="card-title fw-bold mb-0 text-light">
                                    Прайс-лист товаров
                                </h5>
                            </div>
                            <span className="badge bg-primary bg-opacity-25 text-primary border border-primary border-opacity-50 rounded-pill px-3 py-2">
                                {products.length} позиции
                            </span>
                        </div>
                        <div className="card-body pt-0">
                            <ul className="list-group list-group-flush border-top border-secondary border-opacity-25">
                                {products.map(([title, price]) => {
                                    return (
                                        <li
                                            key={title}
                                            className="list-group-item bg-transparent text-light border-secondary border-opacity-25 d-flex justify-content-between align-items-center px-2 py-3"
                                        >
                                            <div className="d-flex align-items-center gap-3">
                                                <div
                                                    className="bg-body-tertiary border border-secondary border-opacity-25 rounded-circle d-flex align-items-center justify-content-center text-primary"
                                                    style={{ width: '38px', height: '38px' }}
                                                >
                                                    <i className="bi bi-bag-check"></i>
                                                </div>
                                                <span className="fw-medium text-light">{title}</span>
                                            </div>
                                            <span className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-50 fs-6 fw-semibold rounded-pill px-3 py-2">
                                                {price} ₽
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}