import React from 'react';

export const OuterWear = ({
                              color = 'currentColor',
                              width = '18px',
                              height = '18px',
                          }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width={width}
            height={height}
            viewBox='0 0 18 18'
        >
            <g data-name='Group 29' fill={color}>
                <path
                    data-name='Path 99'
                    d='M15.643 5.659a1.993 1.993 0 00.453-.062c-.224-1.2-.4-1.9-.4-1.9a5.546 5.546 0 00-1.713-1.068 1.964 1.964 0 001.66 3.03z'
                />
                <path
                    data-name='Path 100'
                    d='M.896 5.596a1.962 1.962 0 002.113-2.97 5.561 5.561 0 00-1.712 1.068s-.178.697-.401 1.902z'
                />
                <path
                    data-name='Path 101'
                    d='M15.641 6.146a2.466 2.466 0 01-2.463-2.463 2.436 2.436 0 01.348-1.24 14.661 14.661 0 00-2.08-.61L11.422.664A5.484 5.484 0 008.947.008c-.225-.01-.677-.01-.904 0a5.5 5.5 0 00-2.478.653l-.02 1.169a14.746 14.746 0 00-2.08.612 2.446 2.446 0 01-2.658 3.64 53.686 53.686 0 00-.771 11.244H.26v.123a.512.512 0 00.532.493h1.24a.512.512 0 00.532-.493v-.123h.23s-.238-7.281 1.02-9.143v9.08a23.275 23.275 0 004.326.735V1.151a5.227 5.227 0 01-1.749-.19S6.529.498 8.043.516h.9c1.5.023 1.653.445 1.653.445a5.226 5.226 0 01-1.751.19v16.847a23.274 23.274 0 004.329-.736V8.184c1.259 1.866 1.023 9.143 1.023 9.143h.229v.123a.511.511 0 00.532.493H16.2a.512.512 0 00.532-.493v-.123h.224a53.827 53.827 0 00-.771-11.246 2.462 2.462 0 01-.544.065z'
                />
            </g>
        </svg>
    );
};
