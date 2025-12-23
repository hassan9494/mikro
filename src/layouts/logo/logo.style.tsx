import styled from 'styled-components';
import css from '@styled-system/css';

export const LogoBox = styled.span(
    css({
        color: 'text.bold',
        fontSize: 26,
        fontWeight: 'bold',
        cursor: 'pointer',
        mr: [0, 20, 40],
        ml: [0, 20, 40],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    })
);

export const LogoImage = styled.img({
    display: 'block',
    backfaceVisibility: 'hidden',
    maxWidth: 200,
    width: 'auto',
    height: 40,
    maxHeight: 40,
    minWidth: 40,

    '@media (max-width: 575px)': {
        maxWidth: 140,
        height: 32,
        maxHeight: 32,
        width: 'auto',
    }
});
