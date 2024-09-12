import React, { useState, useEffect } from 'react';
import { usePrevious, useMeasure } from 'utils/hooks';
import { useSpring, animated } from 'react-spring';
import { Frame, Title, Content, Header, IconWrapper } from './tree-menu.style';
import { Button } from 'components/button/button';
import { ArrowNext } from 'assets/icons/ArrowNext';
import css from '@styled-system/css';
import * as icons from 'assets/icons/category-icons';
import { DoubleArrow, RadioButtonUncheckedOutlined } from "@material-ui/icons";
import Image from "next/image";
import styled from "styled-components";

const ImageWrapper = styled.div(
    css({
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        height: ['50px', '50px'],
        marginRight: '5px',

        img: {
            display: 'block',
            maxHeight: '100%',
            maxWidth: '100%',
            width: '50px',
        },
    })
);
const Tree = React.memo(
    ({
         children,
         name,
         icon,
         // isOpen,
         onClick,
         dropdown,
         onToggleBtnClick,
         depth,
         image,
         defaultOpen = false,
     }: any) => {
        const [isOpen, setOpen] = useState(defaultOpen);
        useEffect(() => {
            setOpen(defaultOpen);
        }, [defaultOpen]);
        const previous = usePrevious(isOpen);
        const [bind, { height: viewHeight }] = useMeasure();
        const { height, opacity, transform } = useSpring<any>({
            from: { height: 0, opacity: 0, transform: 'translate3d(20px,0,0)' },
            to: {
                height: isOpen ? viewHeight : 0,
                opacity: isOpen ? 1 : 0,
                transform: `translate3d(${isOpen ? 0 : 20}px,0,0)`,
            },
        });
        // const Icon = icon ? Icons[icon] : depth === 'child' ? Icons['Minus'] : null;
        // const Icon = icon ? Icons[icon] : null;
        // const Icon = ({ iconName, style }: { iconName: any; style?: any }) => {
        //     const TagName = icons[iconName];
        //     return !!TagName ? (
        //         <TagName style={style}/>
        //     ) : (
        //         <p>Invalid icon {iconName}</p>
        //     );
        // };
        return (
            <Frame depth={depth}>
                <Header open={isOpen} depth={depth} className={depth}>
                    {/*{icon && (*/}

                    {/*<IconWrapper depth={depth}>*/}
                    {/*{*/}
                    {/*    depth === 'parent' ?*/}
                    {/*    <DoubleArrow*/}
                    {/*        style={{color: 'grey'}}*/}
                    {/*    />:*/}
                    {/*    <RadioButtonUncheckedOutlined style={{height: 16}} />*/}
                    {/*}*/}
                    {/*</IconWrapper>*/}
                    {/*)}*/}
                    {image && (
                    <ImageWrapper>
                        <Image
                            src={image}
                            alt={name}
                            width={50}
                            height={50}
                            unoptimized={true}
                        />
                    </ImageWrapper>
                    )}

                    <Title onClick={onClick}>{name}</Title>

                    {dropdown === true && (
                        <Button
                            onClick={() => setOpen(!isOpen)}
                            variant="text"
                            className="toggleButton"
                        >
                            <ArrowNext width="16px"/>
                        </Button>
                    )}
                </Header>
                <Content
                    style={{
                        opacity,
                        height: isOpen && previous === isOpen ? 'auto' : height,
                    }}
                >
                    <animated.div style={{ transform }} {...bind} children={children}/>
                </Content>
            </Frame>
        );
    }
);

type Props = {
    className?: any;
    data: any;
    onClick: (slug: string) => void;
    active: string | string[];
};
export const TreeMenu: React.FC<Props> = ({
  data,
  className,
  onClick,
  active,
}) => {
    const handler = (children) => {
        return children.map((subOption) => {
            if (subOption.parent) {
                return (
                    <Tree
                        key={subOption.title}
                        name={subOption.title}
                        icon={subOption.icon}
                        image={subOption.image}
                        depth="child"
                        onClick={() => onClick(subOption.slug)}
                        defaultOpen={active === subOption.slug}
                    />
                );
            }
            return (
                <Tree
                    key={subOption.title}
                    name={subOption.title}
                    image={subOption.image}
                    dropdown={!subOption.children.length ? false : true}
                    depth="parent"
                    onClick={() => onClick(subOption.slug)}
                    defaultOpen={
                        active === subOption.slug ||
                        subOption.children.some((item) => item.slug === active)
                    }
                >
                    {handler(subOption.children)}
                </Tree>
            );
        });
    };
    return <>{handler(data)}</>;
};
