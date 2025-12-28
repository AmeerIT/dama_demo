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
            weight: '400',
            style: 'italic',
        },
        {
            path: './efbd.ttf',
            weight: '700',
            style: 'normal',
        },
    ],
})
