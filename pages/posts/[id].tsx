import   Head             from 'next/head'
import   Date             from 'components/date'
import   Link             from 'next/link'
import { getAllPostIds,
         getPostData }    from 'lib/posts'
import { GetStaticProps,
         GetStaticPaths } from 'next'


export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params === undefined) {
    return {
      props: {'': null}
    }
  }

  const postData = await getPostData(params.id as string)

  return {
    props: {
      postData
    }
  }
}


export default function Post({
  postData
}: {
  postData: {
    title:       string;
    date:        string;
    contentHtml: string;
  }
}) {
  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <article>
        <h1>{postData.title}</h1>
        <div>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>

      <Link href="/">
        <a>back to Home</a>
      </Link>      
    </>
  )
}