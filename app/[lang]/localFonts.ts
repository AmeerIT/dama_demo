import localFont from 'next/font/local'

export const Effra = localFont({
    src: [
        {
            path: './efrg.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: './efmd.ttf',
            weight: '500',
            style: 'normal',
        },
        {
            path: './efbd.ttf',
            weight: '700',
            style: 'normal',
        },
    ],
})
