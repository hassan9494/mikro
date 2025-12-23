import React, { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import {
    Box,
    Image,
    Content,
    Title,
    ContentRow,
    Description,
    SearchWrapper,
} from './banner.style';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { useAppDispatch } from 'contexts/app/app.provider';
import Search from 'features/search/search';
import { IntersectionTrigger } from 'components/intersection-trigger/intersection-trigger';

const CategoryIconNav = dynamic(() => import('components/type-nav/type-nav'));
const SpringModal = dynamic(() =>
    import('components/spring-modal/spring-modal')
);

interface Props {
    intlTitleId: string;
    type?: string;
}

export const MobileBanner: React.FC<Props> = ({ type, intlTitleId }) => {
    const [isOpen, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const setSticky = useCallback(() => dispatch({ type: 'SET_STICKY' }), [
        dispatch,
    ]);
    const removeSticky = useCallback(() => dispatch({ type: 'REMOVE_STICKY' }), [
        dispatch,
    ]);
    const handleEnter = () => {
        removeSticky();
    };

    const handleLeave = () => {
        setSticky();
    };
    return (
        <Box display={['flex', 'flex', 'none']}>
            <Content>
                <ContentRow>
                    <Description>
                        <FormattedMessage
                            id={intlTitleId}
                            defaultMessage="Set Your Title Through Language File"
                        />
                    </Description>

                    <button
                        type="button"
                        onClick={() => setOpen(true)}
                        style={{
                            textTransform: 'capitalize',
                            background: 'transparent',
                            color: '#133695',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: 600,
                        }}
                    >
                        {type ? (
                            type
                        ) : (
                            <FormattedMessage id="mobileBanner.browse" defaultMessage="Browse" />
                        )}
                    </button>
                </ContentRow>

                <SearchWrapper>
                    <Search minimal={true}/>
                </SearchWrapper>
                <IntersectionTrigger
                    onEnter={handleEnter}
                    onLeave={handleLeave}
                />
            </Content>
            <SpringModal isOpen={isOpen} onRequestClose={() => setOpen(false)}>
                <CategoryIconNav/>
            </SpringModal>
        </Box>
    );
};
