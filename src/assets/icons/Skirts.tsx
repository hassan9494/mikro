import React from 'react';

export const Skirts = ({
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
            <g fill={color}>
                <path
                    data-name='Path 107'
                    d='M17.688 16.585L14.826 5.454a3.95 3.95 0 00-.26-.682l-.822-1.6a.749.749 0 00-.616-.376H4.576a.746.746 0 00-.615.377l-.841 1.65a4.017 4.017 0 00-.258.683L.017 16.585a.373.373 0 00.374.482h.64a1.52 1.52 0 01.612.158l1.246.691a.824.824 0 00.728 0l1.24-.691a.607.607 0 01.514 0l1.246.691a.824.824 0 00.728 0l1.246-.691a.607.607 0 01.514 0l1.246.691a.824.824 0 00.728 0l1.246-.691a.607.607 0 01.514 0l1.246.691a.824.824 0 00.728 0l1.246-.691a1.52 1.52 0 01.612-.158h.64a.373.373 0 00.374-.482z'
                />
                <path
                    data-name='Path 108'
                    d='M4.525 2.1h8.656a.333.333 0 00.333-.333V.333A.333.333 0 0013.181 0H4.525a.333.333 0 00-.331.333v1.438a.333.333 0 00.331.331zM7.833.652a.267.267 0 01.262-.266h1.508a.267.267 0 01.266.266v.8a.267.267 0 01-.266.266H8.095a.267.267 0 01-.266-.266z'
                />
                <path data-name='Rectangle 2' d='M8.275.83h1.153v.444H8.275z'/>
            </g>
        </svg>
    );
};
