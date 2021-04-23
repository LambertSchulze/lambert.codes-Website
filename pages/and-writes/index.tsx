import   Link                        from 'next/link'
import   Date                        from 'components/date'
import { getSortedPostsFrontmatter } from 'lib/posts'
import { GetStaticProps }            from 'next'
import { PostFrontmatter } from 'lib/posts'


export default function PostsIndex({allPostsFrontmatter}: {allPostsFrontmatter: PostFrontmatter[]})
{
    return (
        <main>
            <h2>Posts</h2>
            <ul>
            {allPostsFrontmatter.map(({ id, publishDate, title }) => (
                <li key={id}>
                    <Link href={`/and-writes/${id}`}>
                        <a>{title}</a>
                    </Link>
                    <br />
                    <small>
                        <Date dateString={publishDate} />
                    </small>
                </li>
            ))}
            </ul>
        </main>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const allPostsFrontmatter = getSortedPostsFrontmatter()

    return {
        props: {
            allPostsFrontmatter
        }
    }
}