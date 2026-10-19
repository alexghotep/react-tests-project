import {useEffect} from 'react';
import {SITE_BRAND} from '../constants';

// Интерфейс исходных данных товара
interface Goods {
    id: string;
    title: string;
    description: string;
    price: number;
    inStock: boolean;
}

// Интерфейс адаптированных данных для отображения
interface DisplayGoods extends Goods {
    formattedPrice: string;
}

// Примечание: для ESLint (react-refresh/only-export-components)
// массив и интерфейсы лучше держать в отдельном файле (например, src/data/goods.ts)
const initialGoods: Goods[] = [
    {
        id: "prod-1",
        title: "wireless mouse",
        description: "Compact ergonomic optical mouse with 2.4GHz USB receiver.",
        price: 25,
        inStock: true
    },
    {
        id: "prod-2",
        title: "mechanical keyboard",
        description: "RGB backlit tactile mechanical keyboard with hot-swappable switches.",
        price: 89.99,
        inStock: true
    },
    {
        id: "prod-3",
        title: "gaming headset",
        description: "Over-ear noise-canceling headset with detachable boom microphone.",
        price: 54.5,
        inStock: false
    },
    {
        id: "prod-4",
        title: "usb-c docking station",
        description: "Multiport adapter featuring 4K HDMI, gigabit Ethernet, and power delivery.",
        price: 65,
        inStock: true
    },
    {
        id: "prod-5",
        title: "ultra-wide monitor",
        description: "34-inch curved IPS display with 144Hz refresh rate and HDR support.",
        price: 420,
        inStock: false
    },
    {
        id: "prod-6",
        title: "portable ssd",
        description: "Fast 1TB external solid-state drive with read speeds up to 1050 MB/s.",
        price: 110,
        inStock: true
    },
    {
        id: "prod-7",
        title: "desk mat",
        description: "Water-resistant extended non-slip stitched rubber gaming pad.",
        price: 18.25,
        inStock: true
    },
    {
        id: "prod-8",
        title: "webcam pro",
        description: "Full HD 1080p streaming camera with dual stereo microphones.",
        price: 49.9,
        inStock: true
    },
    {
        id: "prod-9",
        title: "laptop cooling pad",
        description: "Slim stand with dual silent LED fans and adjustable height angles.",
        price: 29.99,
        inStock: false
    },
    {
        id: "prod-10",
        title: "cable management clip",
        description: "Self-adhesive silicone wire organizer pack for desktop clutter.",
        price: 9.99,
        inStock: true
    },
    {
        id: "prod-11",
        title: "bluetooth speaker",
        description: "Rugged waterproof outdoor speaker with deep bass and 12-hour battery life.",
        price: 45,
        inStock: true
    },
    {
        id: "prod-12",
        title: "ergonomic office chair",
        description: "Breathable mesh task chair with adjustable lumbar and 3D armrests.",
        price: 210,
        inStock: false
    },
    {
        id: "prod-13",
        title: "monitor light bar",
        description: "Space-saving screen hanging lamp with auto-dimming touch sensor.",
        price: 38.5,
        inStock: true
    },
    {
        id: "prod-14",
        title: "magnetic phone mount",
        description: "Strong MagSafe compatible car vent holder with 360-degree rotation.",
        price: 16,
        inStock: true
    },
    {
        id: "prod-15",
        title: "graphics tablet",
        description: "Digital drawing pad with battery-free stylus and 8192 pressure levels.",
        price: 75,
        inStock: false
    },
    {
        id: "prod-16",
        title: "smart power strip",
        description: "Wi-Fi enabled surge protector with 4 independent outlets and fast USB ports.",
        price: 32,
        inStock: true
    },
    {
        id: "prod-17",
        title: "wireless earbuds",
        description: "True wireless in-ear earphones with active noise cancellation and case.",
        price: 59.99,
        inStock: true
    },
    {
        id: "prod-18",
        title: "aluminum laptop stand",
        description: "Foldable ventilated riser supporting up to 17-inch notebooks.",
        price: 24.5,
        inStock: true
    },
    {
        id: "prod-19",
        title: "external sound card",
        description: "Compact USB audio interface with dedicated volume knob and headphone out.",
        price: 28,
        inStock: false
    },
    {
        id: "prod-20",
        title: "screen cleaning kit",
        description: "Anti-static microfiber cloth set with streak-free cleaning spray.",
        price: 12,
        inStock: true
    }
];

// Хелпер: делает каждое слово в строке с заглавной буквы
function toTitleCase(text: string): string {
    return text
        .split(' ')
        .map(word => word ? word[0].toUpperCase() + word.slice(1).toLowerCase() : '')
        .join(' ');
}

// Экземпляр форматирования валюты выносим за пределы компонента,
// чтобы не создавать объект заново на каждом рендере
const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export default function GammaPage() {
    useEffect(() => {
        document.title = `${SITE_BRAND} / Gamma Page`;
    }, []);

    // Трансформируем исходный массив под нужды отображения:
    // 1. Форматируем заголовок (Каждое Слово С Заглавной)
    // 2. Заранее подготавливаем строку с отформатированной ценой
    const showGoods: DisplayGoods[] = initialGoods.map((item) => ({
        ...item,
        title: toTitleCase(item.title),
        formattedPrice: currencyFormatter.format(item.price)
    }));

    return (
        <div className="container py-4">
            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3">
                {showGoods.map((good) => (
                    <div key={good.id} className="col">
                        <div
                            className="h-100 p-3 bg-body-tertiary border rounded-3 d-flex flex-column justify-content-between gap-2 shadow-sm">
                            <div>
                                <div className="d-flex justify-content-between align-items-start gap-2 mb-1">
                                    <span className="fw-semibold text-truncate" title={good.title}>
                                        {good.title}
                                    </span>
                                    {/* Бейдж статуса: мягкий серый/зеленый для наличия, мягкий красный если нет */}
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
                                {/* Выводим уже готовое значение без лишнего знака доллара */}
                                <span className="fw-bold">{good.formattedPrice}</span>

                                {/* Кнопку рендерим только если товар в наличии, без пустого фрагмента */}
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
