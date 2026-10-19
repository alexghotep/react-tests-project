// src/pages/GammaPage.tsx
import { useEffect, useMemo } from 'react';
import { SITE_BRAND } from '../constants';
import { initialGoods, type DisplayGoods } from '../data/goods';
import { formatCurrency, toTitleCase } from '../utils/formatters';

export default function GammaPage() {
    useEffect(() => {
        document.title = `${SITE_BRAND} / Gamma Page`;
    }, []);

    // Мемоизируем подготовку данных для витрины
    const showGoods: DisplayGoods[] = useMemo(() => {
        return initialGoods.map((item) => ({
            ...item,
            title: toTitleCase(item.title),
            formattedPrice: formatCurrency(item.price),
        }));
    }, []);

    return (
        <div className="container py-4">
            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3">
                {showGoods.map((good) => (
                    <div key={good.id} className="col">
                        <div className="h-100 p-3 bg-body-tertiary border rounded-3 d-flex flex-column justify-content-between gap-2 shadow-sm">
                            <div>
                                <div className="d-flex justify-content-between align-items-start gap-2 mb-1">
                                    <span className="fw-semibold text-truncate" title={good.title}>
                                        {good.title}
                                    </span>
                                    <span
                                        className={`badge border flex-shrink-0 ${
                                            good.inStock
                                                ? 'bg-body-secondary text-body'
                                                : 'bg-danger-subtle text-danger border-danger-subtle'
                                        }`}
                                    >
                                        {good.inStock ? 'В наличии' : 'Нет на складе'}
                                    </span>
                                </div>
                                <p className="small text-secondary mb-0" title={good.description}>
                                    {good.description}
                                </p>
                            </div>

                            <div className="d-flex justify-content-between align-items-center pt-2 border-top">
                                <span className="fw-bold">{good.formattedPrice}</span>

                                {good.inStock && (
                                    <button type="button" className="btn btn-sm btn-outline-secondary">
                                        Купить
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
