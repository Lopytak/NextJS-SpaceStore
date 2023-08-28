import { Passion_One, } from "@next/font/google";
import localFont from "@next/font/local";

export const passionOne = Passion_One({
    weight: '400',
    subsets: ['latin']
});

export const helvetica = localFont({
    src: [
        {
            path: '../fonts/helveticaRegular.otf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../fonts/helveticaBold.otf',
            weight: '700',
            style: 'normal',
        },
    ]
});
