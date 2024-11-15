'use client'

import { useEffect, useState } from 'react';

export default function Countdown() {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const targetDate = new Date('2024-12-12T00:00:00').getTime(); // leftTime

    useEffect(() => {
        const countdown = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(countdown);
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);

        return () => clearInterval(countdown);
    }, [targetDate]);

    return (
        <div>
            <div className="countdown-wrap flex flex-col" style={{ alignItems: 'center' }}>
                <h1 className='text-2xl mb-3'>My Birth Day</h1>
                <div className="time flex gap-4">
                    <div className='flex flex-col text-center w-20'>
                        <span className='text-3xl font-normal rounded-sm mb-3  bg-black py-5 text-white'>{timeLeft.days}</span>
                        <span className='font-semibold'>Days</span>
                    </div>
                    <div className='flex flex-col text-center w-20'>
                        <span className='text-3xl font-normal rounded-sm mb-3  bg-black py-5 text-white'>{timeLeft.hours}</span>
                        <span className='font-semibold'>Hours</span>
                    </div>
                    <div className='flex flex-col text-center w-20'>
                        <span className='text-3xl font-normal rounded-sm mb-3  bg-black py-5 text-white'>{timeLeft.minutes}</span>
                        <span className='font-semibold'>Minutes</span>
                    </div>
                    <div className='flex flex-col text-center w-20'>
                        <span className='text-3xl font-normal rounded-sm mb-3  bg-black py-5 text-red-700'>{timeLeft.seconds}</span>
                        <span className='font-semibold'>Seconds</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
