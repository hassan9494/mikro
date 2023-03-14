import React from 'react';
import Head from 'next/head';
import { siteMetadata } from "../site-settings/site-metadata";



type SeoProps = {
    title?: string;
    description?: string;
    canonical?: string;
    css?: string;
    js?: string;
    image?: string;
};

export const SEO: React.FC<SeoProps> = (params: {
    title,
    description,
    canonical,
    css,
    js,
    image,
}) => {
    const data = { ...siteMetadata, ...params };
    return (
        <Head>
            <title>{siteMetadata.getTitle(params?.title)}</title>
            <meta name="description" content={data?.description}/>
            <meta
                name="viewport"
                content="width=device-width,maximum-scale=1,initial-scale=1"
            />
            <meta property="og:type" content="website"/>
            <meta name="og:title" property="og:title" content={data?.title}/>
            <meta
                name="og:description"
                property="og:description"
                content={data?.description}
            />
            <meta property="og:site_name" content="Mikroelectron"/>
            <meta property="og:url" content={`${data?.canonical}`}/>
            {/*<meta name="twitter:card" content="summary"/>*/}
            {/*<meta name="twitter:title" content={title}/>*/}
            {/*<meta name="twitter:description" content={description}/>*/}
            {/*<meta name="twitter:site" content="@propernounco"/>*/}
            {/*<meta name="twitter:creator" content="@propernounco"/>*/}
            {data?.css && <link rel="stylesheet" href={`${data?.css}`}/>}
            {data?.image ? (
                <meta property="og:image" content={`${data?.image}`}/>
            ) : (
                <meta
                    property="og:image"
                    content="https://mikroelectron.com/assets/img/logo-1.png"
                />
            )}
            {data?.image && <meta name="twitter:image" content={`${data?.image}`}/>}
            {data?.canonical && <link rel="canonical" href={`${data?.canonical}`}/>}
            {data?.js && <script type="text/javascript" src={`${data?.js}`}></script>}
        </Head>
    )
};
