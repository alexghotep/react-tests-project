// src/data/goods.ts

export interface Goods {
    id: string;
    title: string;
    description: string;
    price: number;
    inStock: boolean;
}

export interface DisplayGoods extends Goods {
    formattedPrice: string;
}

export const initialGoods: Goods[] = [
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
