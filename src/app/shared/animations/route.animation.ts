import { trigger, animate, style, query as q, transition } from '@angular/animations';
// const query = (s, a, o = { optional: true }) => q(s, a, o);

export const routeAnimation = trigger('routeAnimation', [
    transition('* => *', [
        q(
            ':enter, :leave',
            style({ position: 'fixed', width: 'calc(100% - 250px)', height: 'calc(100% - 60px)' }),
            { optional: true }
        ),
        q(':enter', style({ opacity: 0 }), { optional: true }),
        q(':leave', [style({ opacity: 1 }), animate('0.15s', style({ opacity: 0 }))], {
            optional: true
        }),
        q(':enter', [animate('0.15s', style({ opacity: 1 }))], { optional: true })
    ])
]);
