import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import Sticky from 'react-stickynode';
import { Scrollbar } from 'components/scrollbar/scrollbar';
import Popover from 'components/popover/popover';
import { ArrowDropDown } from 'assets/icons/ArrowDropDown';
import { CategoryIcon } from 'assets/icons/CategoryIcon';
import { useLocale } from 'contexts/language/language.provider';
import { useAppState } from 'contexts/app/app.provider';
import {
    SidebarMobileLoader,
    SidebarLoader,
} from 'components/placeholder/placeholder';
import {
    CategoryWrapper,
    TreeWrapper,
    PopoverHandler,
    PopoverWrapper,
    SidebarWrapper,
    RequestMedicine,
} from './sidebar.style';

import { TreeMenu } from 'components/tree-menu/tree-menu';
import { REQUEST_MEDICINE_MENU_ITEM } from 'site-settings/site-navigation';
import useCategory from 'data/use-category';
import ErrorMessage from 'components/error-message/error-message';
import CategoryWalker from 'components/category-walker/category-walker';

type SidebarCategoryProps = {
    deviceType: {
        mobile: string;
        tablet: string;
        desktop: boolean;
    };
    type: string;
};

const SidebarCategory: React.FC<SidebarCategoryProps> = ({
                                                             deviceType: { mobile, tablet, desktop },
                                                             type,
                                                         }) => {
    const router = useRouter();
    const { data, error } = useCategory();

    if (error) return <ErrorMessage message={error.message}/>;
    const { pathname, query } = router;
    const selectedQueries = query.category;

    const { isRtl } = useLocale();

    const onCategoryClick = (category: string) => {
        router.push({
            pathname: '/category/[category]',
            query: { category },
        });
    };

    const isSidebarSticky = useAppState('isSidebarSticky');

    if (!data) {
        if (mobile || tablet) {
            return <SidebarMobileLoader/>;
        }
        return <SidebarLoader/>;
    }
    return (
        <CategoryWrapper>
            <PopoverWrapper>
                <CategoryWalker>
                    {type === 'medicine' && (
                        <Link href={REQUEST_MEDICINE_MENU_ITEM.href}>
                            <RequestMedicine>
                                <FormattedMessage
                                    id={REQUEST_MEDICINE_MENU_ITEM.id}
                                    defaultMessage={REQUEST_MEDICINE_MENU_ITEM.defaultMessage}
                                />
                            </RequestMedicine>
                        </Link>
                    )}

                    <TreeMenu
                        data={data}
                        onClick={onCategoryClick}
                        active={selectedQueries}
                    />
                </CategoryWalker>
            </PopoverWrapper>

            <SidebarWrapper style={{ paddingTop: type === 'medicine' ? 0 : 45 }}>
                <Sticky enabled={isSidebarSticky} top={type === 'medicine' ? 89 : 110}>
                    {type === 'medicine' && (
                        <Link href={REQUEST_MEDICINE_MENU_ITEM.href}>
                            <RequestMedicine>
                                <FormattedMessage
                                    id={REQUEST_MEDICINE_MENU_ITEM.id}
                                    defaultMessage={REQUEST_MEDICINE_MENU_ITEM.defaultMessage}
                                />
                            </RequestMedicine>
                        </Link>
                    )}

                    <Scrollbar className='sidebar-scrollbar'>
                        <TreeWrapper>
                            <TreeMenu
                                data={data}
                                onClick={onCategoryClick}
                                active={selectedQueries}
                            />
                        </TreeWrapper>
                    </Scrollbar>
                </Sticky>
            </SidebarWrapper>
        </CategoryWrapper>
    );
};

export default SidebarCategory;
