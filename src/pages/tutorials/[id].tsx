import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { SEO } from 'components/seo';
import { getArticle } from 'data/use-website';

type Props = {
  data: any;
  social?: any;
};

const TutorialPage: NextPage<Props> = ({ data }) => {
  if (!data) return <div />;

  return (
    <>
      <SEO
        title={data?.meta_title || data?.title || 'Tutorial'}
        description={data?.meta_description || (data?.short_description || '').replace(/<[^>]*>?/gm, '')}
        canonical={`https://mikroelectron.com/tutorials/${data?.slug || data?.id}`}
        image={data?.image}
      />

      <main style={{ paddingTop: '80px', paddingBottom: '40px' }}>
        <div className="container">
          <h1 style={{ marginBottom: 12 }}>{data?.title}</h1>
          <div style={{ color: '#475569', lineHeight: 1.8 }} dangerouslySetInnerHTML={{ __html: data?.content || data?.description || '' }} />
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const idParam = params?.id;
  if (!idParam || Array.isArray(idParam)) {
    return { notFound: true };
  }

  try {
    const data = await getArticle(idParam as string);
    if (!data) return { notFound: true };

    return {
      props: {
        data,
      },
    };
  } catch (err) {
    return { notFound: true };
  }
};

export default TutorialPage;
