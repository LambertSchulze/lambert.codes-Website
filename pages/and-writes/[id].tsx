import  Head            from 'next/head'
import  Date            from 'components/date'
import  Link            from 'next/link'
import {getAllPostIds,
        getPostData,
        PostData}       from 'lib/posts'
import {GetStaticProps,
        GetStaticPaths} from 'next'



export default function Post({postData}: {postData: PostData})
{
    return (
        <>
            <Head>
                <title>{postData.title}</title>
            </Head>

            <article>
                <header>
                    <h1>{postData.title}</h1>
                    <Date dateString={postData.publishDate} />
                </header>
                <main>
                    <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
                </main>
                <footer>
                    <p>Last updated on: <Date dateString={postData.updateDate} /></p>
                </footer>
            </article>

            <Link href="/">
                <a>back to Home</a>
            </Link>      
        </>
    )
}


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