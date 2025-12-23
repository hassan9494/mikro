import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Button } from 'components/button/button';
import ReadMore from 'components/truncate/truncate';
import {
    ProductDetailsWrapper,
    ProductPreview,
    ProductInfo,
    BookTitle,
    BackButton,
    AuthorName,
    BookDescriptionWrapper,
    BookDescription,
    BookMetaTable,
    BookMetaTableRow,
    BookMetaItem,
    ProductMeta,
    ButtonText,
    ProductCartWrapper,
    ProductPriceWrapper,
    ProductPrice,
    SalePrice,
    ProductCartBtn,
    MetaSingle,
    MetaItem,
    DetailsWrapper,
    DetailsTitle,
    Description,
    Avatar,
    SocialNetworks,
    SocialIcon,
    RelatedItems,
} from './product-details-two.style';
import { LongArrowLeft } from 'assets/icons/LongArrowLeft';
import { CartIcon } from 'assets/icons/CartIcon';
import { InkPen } from 'assets/icons/InkPen';
import { AdobeIcon } from 'assets/icons/AdobeIcon';
import { Facebook } from 'assets/icons/Facebook';
import { GooglePlus } from 'assets/icons/GooglePlus';
import { Twitter } from 'assets/icons/Twitter';
import { Linkedin } from 'assets/icons/Linkedin';
import { CURRENCY } from 'utils/constant';
import Products from 'components/product-grid/product-list/product-list';
import { FormattedMessage } from 'react-intl';
import { useCart } from 'contexts/cart/use-cart';
import { Counter } from 'components/counter/counter';
import Image from 'components/image/image';

type ProductDetailsProps = {
    product: any;
    deviceType: {
        mobile: boolean;
        tablet: boolean;
        desktop: boolean;
    };
};

const ProductDetails: React.FunctionComponent<ProductDetailsProps> = ({
    product,
    deviceType,
}) => {
    const { addItem, removeItem, getItem, isInCart } = useCart();
    const data = product;

    const scrollRef = useRef(null);

    const scrollToDiv = (e) => {
        e.preventDefault();
        window.scrollTo({
            top:
                scrollRef.current.getBoundingClientRect().top + window.pageYOffset - 65,
            behavior: 'smooth',
        });
    };

    const handleAddClick = (e) => {
        e.stopPropagation();
        addItem(data);
    };

    const handleRemoveClick = (e) => {
        e.stopPropagation();
        removeItem(data);
    };

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 500);
    }, []);

    return (
        <>
            <ProductDetailsWrapper className="product-card">
                <ProductPreview>
                    <BackButton>
                        <Button
                            type="button"
                            size="small"
                            style={{
                                backgroundColor: '#ffffff',
                                border: '1px solid #f1f1f1',
                                color: '#77798c',
                            }}
                            onClick={Router.back}
                        >
                            <LongArrowLeft style={{ marginRight: 5 }}/>
                            <FormattedMessage id="backBtn" defaultMessage="Back"/>
                        </Button>
                    </BackButton>

                    <Image
                        url={product.gallery[0].url}
                        alt={product.title}
                        className="product-image"
                        width={900}
                        height={600}
                        priority
                    />
                </ProductPreview>

                <ProductInfo>
                    <BookTitle>{product.title}</BookTitle>
                    <AuthorName>
                        <InkPen/> {product.author.name}
                    </AuthorName>
                    <div style={{ marginTop: 10 }}>
                        <Image url={product.author.avatar} alt={product.author.name} width={40} height={40} />
                    </div>
                    <BookDescriptionWrapper>
                        <BookDescription>
                            <ReadMore
                                character={600}
                                more="Read more"
                                less="Read less"
                            >
                                {product.description}
                            </ReadMore>
                        </BookDescription>
                        <BookMetaTable>
                            {product.meta
                                ? Object.entries(product.meta).map(([item], i, arr): any =>
                                    i !== arr.length - 1 && i !== arr.length - 2 ? (
                                        <BookMetaTableRow key={`${item}-${i}`}>
                                            <BookMetaItem>
                                                {item.replace(/^[a-z]|[A-Z]/g, function (v, i) {
                                                    return i === 0
                                                        ? v.toUpperCase()
                                                        : ' ' + v.toLowerCase();
                                                })}
                                            </BookMetaItem>
                                            <BookMetaItem>
                                                {item === 'languages'
                                                    ? product.meta[item].map(
                                                        (lang, i, arr): any =>
                                                            lang.charAt(0).toUpperCase() +
                                                            lang.slice(1) +
                                                            (i !== arr.length - 1 ? ', ' : '')
                                                    )
                                                    : product.meta[item]}
                                            </BookMetaItem>
                                        </BookMetaTableRow>
                                    ) : (
                                        ''
                                    )
                                )
                                : ''}
                        </BookMetaTable>
                    </BookDescriptionWrapper>

                    <ProductCartWrapper>
                        <ProductPriceWrapper>
                            {product.discountInPercent ? (
                                <SalePrice>
                                    {CURRENCY}
                                    {product.price}
                                </SalePrice>
                            ) : null}

                            <ProductPrice>
                                {CURRENCY}
                                {product.salePrice ? product.salePrice : product.price}
                            </ProductPrice>
                        </ProductPriceWrapper>

                        <ProductCartBtn>
                            {!isInCart(data.id) ? (
                                <Button
                                    className="cart-button"
                                    variant="secondary"
                                    borderRadius={100}
                                    onClick={handleAddClick}
                                >
                                    <CartIcon mr={2}/>
                                    <ButtonText>
                                        <FormattedMessage
                                            id="addCartButton"
                                            defaultMessage="Cart"
                                        />
                                    </ButtonText>
                                </Button>
                            ) : (
                                <Counter
                                    value={getItem(data.id).quantity}
                                    onDecrement={handleRemoveClick}
                                    onIncrement={handleAddClick}
                                />
                            )}

                            {product.meta && product.meta.samplePDF?.length ? (
                                <Button
                                    size="small"
                                    variant="outlined"
                                    className="outline-button"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        const sampleUrl = Array.isArray(product.meta.samplePDF)
                                            ? product.meta.samplePDF[0]
                                            : product.meta.samplePDF;
                                        if (sampleUrl) {
                                            window.open(sampleUrl, '_blank');
                                        }
                                    }}
                                >
                                    <span style={{ display: 'inline-flex', marginRight: 8 }}>
                                        <AdobeIcon />
                                    </span>
                                    <FormattedMessage id="readFreeSampleButton" defaultMessage="Read Free Sample" />
                                </Button>
                            ) : null}
                        </ProductCartBtn>
                    </ProductCartWrapper>

                    <ProductMeta>
                        <MetaSingle>
                            {product.categories
                                ? product.categories.map((item: any) => (
                                    <Link href={`/${product.type}?category=${item.slug}`} key={`link-${item.id}`}>
                                        <MetaItem>{item.title}</MetaItem>
                                    </Link>
                                ))
                                : ''}
                        </MetaSingle>
                    </ProductMeta>
                </ProductInfo>
            </ProductDetailsWrapper>
            <DetailsWrapper ref={scrollRef}>
                <DetailsTitle>
                    <FormattedMessage
                        id="bookSectionTitle"
                        defaultMessage="About The Book"
                    />
                </DetailsTitle>
                <Description>{product.description}</Description>
            </DetailsWrapper>
            <DetailsWrapper>
                <DetailsTitle>
                    <FormattedMessage
                        id="authorSectionTitle"
                        defaultMessage="About The Author"
                    />
                </DetailsTitle>
                <AuthorName>
                    {product.author.avatar && product.author.avatar.length !== 0 ? (
                        <Avatar>
                            <img src={(typeof product.author.avatar === 'object' && product.author.avatar?.src) ? product.author.avatar.src : product.author.avatar} alt={product.author.name}/>
                        </Avatar>
                    ) : (
                        <InkPen/>
                    )}

                    {product.author.name}
                </AuthorName>

                <Description>{product.author.bio}</Description>
                <SocialNetworks>
                    {product.author &&
                    product.author.socials.map((item) =>
                        item.profileLink.length !== 0 ? (
                            <SocialIcon key={item.id}>
                                <a href={item.profileLink} target="_blank" rel="noreferrer">
                                    {item.media === 'facebook' ? (
                                        <Facebook color="#3b5999"/>
                                    ) : item.media === 'twitter' ? (
                                        <Twitter color="#55acee"/>
                                    ) : item.media === 'google' ? (
                                        <GooglePlus color="#dd4b39"/>
                                    ) : item.media === 'linkedin' ? (
                                        <Linkedin color="#0077B5"/>
                                    ) : (
                                        ''
                                    )}
                                </a>
                            </SocialIcon>
                        ) : (
                            ''
                        )
                    )}
                </SocialNetworks>
            </DetailsWrapper>
            <RelatedItems>
                <h2>
                    <FormattedMessage
                        id="intlRelatedItems"
                        defaultMessage="Related Items"
                    />
                </h2>
                <Products
                    type={product.type.toLowerCase()}
                    deviceType={deviceType}
                    // loadMore={false}
                    fetchLimit={10}
                />
            </RelatedItems>
        </>
    );
};

export default ProductDetails;
