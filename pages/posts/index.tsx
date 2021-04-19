import   Link                        from 'next/link'
import   Date                        from 'components/date'
import { getSortedPostsFrontmatter } from 'lib/posts'
import { GetStaticProps }            from 'next'


export const getStaticProps: GetStaticProps = async () => {
  const allPostsFrontmatter = getSortedPostsFrontmatter()

  return {
    props: {
      allPostsFrontmatter
    }
  }
}

export default function PostsIndex({
  allPostsFrontmatter
}: {
  allPostsFrontmatter: {
    date:  string;
    title: string;
    id:    string;
  }[]
}) {
  return (
    <main>
      <h2>Posts</h2>
      <ul>
        {allPostsFrontmatter.map(({ id, date, title }) => (
          <li key={id}>
            <Link href={`/posts/${id}`}>
              <a>{title}</a>
            </Link>
            <br />
            <small>
              <Date dateString={date} />
            </small>
          </li>
        ))}
      </ul>
    </main>
  )
}