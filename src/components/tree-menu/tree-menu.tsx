import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Frame, Title, Content, Header, IconWrapper } from './tree-menu.style';
import { Button } from 'components/button/button';
import { ArrowNext } from 'assets/icons/ArrowNext';
import css from '@styled-system/css';
import * as icons from 'assets/icons/category-icons';
import { DoubleArrow, RadioButtonUncheckedOutlined } from "@mui/icons-material";
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

const TreeComponent = ({
                           children,
                           name,
                           icon,
                           onClick,
                           dropdown,
                           onToggleBtnClick,
                           depth,
                           image,
                           defaultOpen = false,
                           isOpen,
                           onToggle,
                       }: any) => {
        const [internalOpen, setInternalOpen] = useState(defaultOpen);
        const isControlled = isOpen !== undefined;
        const open = isControlled ? isOpen : internalOpen;

        useEffect(() => {
            if (!isControlled) {
                setInternalOpen(defaultOpen);
            }
        }, [defaultOpen, isControlled]);

        const contentVariants = {
            open: { height: 'auto', opacity: 1 },
            collapsed: { height: 0, opacity: 0 },
        };

        const listVariants = {
            open: { opacity: 1, x: 0 },
            collapsed: { opacity: 0, x: 20 },
        };

        const handleToggle = (e) => {
            e.stopPropagation();
            if (onToggle) {
                onToggle();
            } else if (!isControlled) {
                setInternalOpen(!open);
            }
        };
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
                <Header open={open} depth={depth} className={depth} onClick={onClick}>
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

                    <Title>{name}</Title>

                    {dropdown === true && (
                        <Button
                            onClick={handleToggle}
                            variant="text"
                            className="toggleButton"
                        >
                            <ArrowNext width="16px" style={{
                                transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s ease-in-out'
                            }}/>
                        </Button>
                    )}
                </Header>
                <AnimatePresence initial={false}>
                    {open && (
                        <Content
                            key="tree-content"
                            initial="collapsed"
                            animate="open"
                            exit="collapsed"
                            variants={contentVariants}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                        >
                            <motion.div
                                variants={listVariants}
                                transition={{ duration: 0.25, ease: 'easeOut' }}
                            >
                                {children}
                            </motion.div>
                        </Content>
                    )}
                </AnimatePresence>
            </Frame>
        );
    };

const Tree = React.memo(TreeComponent);
Tree.displayName = 'TreeMenuNode';

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
    const [expandedNode, setExpandedNode] = useState<string | null>(null);

    const handleToggle = (slug: string) => {
        setExpandedNode(expandedNode === slug ? null : slug);
    };

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
                        isOpen={expandedNode === subOption.slug}
                        onToggle={() => handleToggle(subOption.slug)}
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
                    isOpen={expandedNode === subOption.slug}
                    onToggle={() => handleToggle(subOption.slug)}
                >
                    {handler(subOption.children)}
                </Tree>
            );
        });
    };
    return <>{handler(data)}</>;
};