import {useEffect} from "react";
import {SITE_BRAND} from "../constants.ts";

export default function GammaPage() {
    useEffect(() => {
        document.title = SITE_BRAND + ' / Gamma Page';
    })
    return (
        <div className="container py-5">
            {/* Кнопка возврата на главную */}
            <div className="mb-4">
                <a href="/" className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center gap-2">
                    <i className="bi bi-arrow-left"></i> На главную
                </a>
            </div>

            text
        </div>
    )
}