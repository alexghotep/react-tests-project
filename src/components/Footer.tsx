import {useState} from 'react';
import {SITE_TITLE} from '../constants';

interface FooterVibe {
    icon: string;
    color: string;
    title: string;
}

const VIBES: FooterVibe[] = [
    {icon: 'bi-heart-fill', color: 'text-danger', title: 'душой'},
    {icon: 'bi-fire', color: 'text-danger', title: 'огоньком'},
    {icon: 'bi-lightning-charge-fill', color: 'text-warning', title: 'энергией'},
    {icon: 'bi-stars', color: 'text-warning', title: 'вдохновением'},
    {icon: 'bi-magic', color: 'text-warning', title: 'магией'},
    {icon: 'bi-emoji-smile', color: 'text-warning', title: 'улыбкой'},
    {icon: 'bi-crosshair', color: 'text-danger', title: 'фокусом'},
    {icon: 'bi-shield-check', color: 'text-success', title: 'надежностью'},
    {icon: 'bi-bullseye', color: 'text-danger', title: 'азартом'},
    {icon: 'bi-check2-all', color: 'text-success', title: 'вниманием к деталям'},
    {icon: 'bi-patch-check-fill', color: 'text-primary', title: 'заботой'},
    {icon: 'bi-compass', color: 'text-info', title: 'четким планом'},
    {icon: 'bi-cup-hot', color: 'text-warning', title: 'кофе'},
    {icon: 'bi-cup-straw', color: 'text-success', title: 'чаем'},
    {icon: 'bi-moon-stars', color: 'text-info', title: 'ночным драйвом'},
    {icon: 'bi-headphones', color: 'text-primary', title: 'музыкой'},
    {icon: 'bi-sun', color: 'text-warning', title: 'утренней бодростью'},
    {icon: 'bi-lamp', color: 'text-warning', title: 'ламповым уютом'},
    {icon: 'bi-hourglass-split', color: 'text-secondary', title: 'терпением'},
    {icon: 'bi-gem', color: 'text-info', title: 'перфекционизмом'},
    {icon: 'bi-lightbulb', color: 'text-warning', title: 'энтузиазмом'},
    {icon: 'bi-search', color: 'text-info', title: 'любопытством'},
    {icon: 'bi-award', color: 'text-warning', title: 'упорством'},
    {icon: 'bi-feather', color: 'text-secondary', title: 'легкостью'},
    {icon: 'bi-music-note-beamed', color: 'text-info', title: 'ритмом'},
    {icon: 'bi-palette', color: 'text-primary', title: 'вкусом'},
    {icon: 'bi-infinity', color: 'text-primary', title: 'неугасающим интересом'},
    {icon: 'bi-bookmark-heart', color: 'text-danger', title: 'любовью к делу'},
    {icon: 'bi-brightness-high', color: 'text-warning', title: 'позитивом'},
    {icon: 'bi-peace', color: 'text-success', title: 'спокойствием'},
];

// Определение предлога по фонетическим правилам русского языка
function getPreposition(word: string): 'со' | 'с' {
    const cleanWord = word.trim().toLowerCase();

    // Стечения согласных на с/з/ш/ж или в/ф + согласная (со спокойствием, со вкусом)
    if (/^[сзшжвф][бвгджзклмнпрстфхцчшщ]/iu.test(cleanWord)) {
        return 'со';
    }

    return 'с';
}

export function Footer() {
    const [vibe, setVibe] = useState<FooterVibe>(() => {
        const randomIndex = Math.floor(Math.random() * VIBES.length);
        return VIBES[randomIndex];
    });

    const handleNextVibe = () => {
        setVibe((current) => {
            const availableVibes = VIBES.filter((item) => item.title !== current.title);
            const nextIndex = Math.floor(Math.random() * availableVibes.length);
            return availableVibes[nextIndex];
        });
    };

    const preposition = getPreposition(vibe.title);

    return (
        <footer className="py-4 border-top border-secondary border-opacity-25 mt-auto">
            <div
                className="container d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2 small text-secondary">
                <div className="d-flex align-items-center gap-1">
                    <span>
                        &copy; {new Date().getFullYear()} {SITE_TITLE}. Сделано {preposition}
                    </span>
                    <button
                        type="button"
                        onClick={handleNextVibe}
                        className="btn btn-link p-0 border-0 text-decoration-none d-inline-flex align-items-center"
                        title={vibe.title}
                        aria-label={`Текущий статус: сделано ${preposition} ${vibe.title}.`}
                    >
                        <i className={`bi ${vibe.icon} ${vibe.color} mx-1`}/>
                    </button>
                </div>

                <div className="d-flex align-items-center gap-3 font-mono">
                    <span className="d-inline-flex align-items-center gap-1">
                        <span
                            className="bg-success rounded-circle d-inline-block"
                            style={{width: '7px', height: '7px'}}
                        />
                        <span className="text-secondary-emphasis">dev mode</span>
                    </span>
                    <span className="opacity-25">|</span>
                    <span>v0.1.0</span>
                    <span className="opacity-25">|</span>
                    <span>{window.location.host}</span>
                </div>
            </div>
        </footer>
    );
}