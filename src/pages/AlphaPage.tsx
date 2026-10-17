import {useEffect} from 'react';
import {SITE_BRAND} from '../constants';
import {TasksCard} from '../components/TasksCard';
import {UserProfileCard} from '../components/UserProfileCard';
import {SpoilerCard} from '../components/SpoilerCard';
import {CounterCard} from '../components/CounterCard';

export default function AlphaPage() {
    useEffect(() => {
        document.title = `${SITE_BRAND} / Alpha Page`;
    }, []);

    return (
        <main className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="vstack gap-4">
                        <TasksCard/>
                        <UserProfileCard/>
                        <SpoilerCard/>
                        <CounterCard/>
                    </div>
                </div>
            </div>
        </main>
    );
}