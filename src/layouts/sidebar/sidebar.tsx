import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import Sticky from 'components/sticky/sticky';
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
    NewProductButton,
    BackinStockButton,
} from './sidebar.style';

import { TreeMenu } from 'components/tree-menu/tree-menu';
import { REQUEST_MEDICINE_MENU_ITEM } from 'site-settings/site-navigation';
import useCategory from 'data/use-category';
import ErrorMessage from 'components/error-message/error-message';
import CategoryWalker from 'components/category-walker/category-walker';
import {Button, Grid} from "@mui/material";
import { Whatshot, Update} from '@mui/icons-material'; 


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
    const { isRtl } = useLocale();
    const isSidebarSticky = useAppState('isSidebarSticky');

    if (error) return <ErrorMessage message={error.message}/>;
    const { pathname, query } = router;
    const selectedQueries = query.category;

    const onCategoryClick = (category: string) => {
        router.push({
            pathname: '/category/[category]',
            query: { category },
        });
    };

    if (!data) {
        // Always return the same loader on server and client to avoid hydration mismatches
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
  <Grid container spacing={1} style={{ padding: '0px 25px 15px 35px' }}>
                            <Grid item xs={12}>
                                <NewProductButton
                                    variant="contained"
                                    disableElevation
                                    onClick={() => onCategoryClick('new_product')}
                                    fullWidth
                                >
                                    <div style={{ 
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: '100%',
                                        overflow: 'hidden',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '8px 0'
                                    }}>
                                        <div style={{ 
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginBottom: '4px',
                                            whiteSpace: 'nowrap',
                                            minWidth: 0,
                                            justifyContent: 'center',
                                            width: '100%'
                                        }}>
                                            <Whatshot style={{ 
                                                fontSize: '1.8rem',
                                                marginRight: '10px',
                                                flexShrink: 0,
                                                color: '#ffffffff' // Orange-red color for "hot" items
                                            }} />
                                            <span style={{ 
                                                fontSize: '1.4rem', 
                                                fontWeight: 700,
                                                lineHeight: '1.2',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                textAlign: 'center'
                                            }}>
                                                <FormattedMessage id="New Products" defaultMessage="New Products"/>
                                            </span>
                                        </div>
                                    </div>
                                </NewProductButton>
                            </Grid>
                            <Grid item xs={12}>
                                <BackinStockButton
                                    variant="contained"
                                    disableElevation
                                    onClick={() => onCategoryClick('back_in_stock')}
                                    fullWidth
                                >
                                    <div style={{ 
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: '100%',
                                        overflow: 'hidden',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '8px 0'
                                    }}>
                                        <div style={{ 
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginBottom: '4px',
                                            whiteSpace: 'nowrap',
                                            minWidth: 0,
                                            justifyContent: 'center',
                                            width: '100%'
                                        }}>
                                            <Update style={{ 
                                                fontSize: '1.8rem',
                                                marginRight: '10px',
                                                flexShrink: 0,
                                                color: '#ffffffff' // Green color for restocked items
                                            }} />
                                            <span style={{ 
                                                fontSize: '1.4rem', 
                                                fontWeight: 700,
                                                lineHeight: '1.2',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                textAlign: 'center'
                                            }}>
                                                <FormattedMessage id="Back in Stock" defaultMessage="Back in Stock"/>
                                            </span>
                                        </div>
                                    </div>
                                </BackinStockButton>
                            </Grid>
                        </Grid>
                        
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