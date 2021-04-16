import   Head                        from 'next/head'
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


export default function Home({
  allPostsFrontmatter
}: {
  allPostsFrontmatter: {
    date:  string;
    title: string;
    id:    string;
  }[]
}) {
  return (
    <>
      <Head>
        <title>lambert.codes</title>
      </Head>

      <header>
        <h1>
          <pre><code>
// lambert codes
{/* lambert[codes]++;
lambert && codes;
{
  "lambert": "codes"
}
lambert(() => codes);
~lambert (codes); 
*lambert->codes(); */}
        </code></pre>
      </h1>
    </header>
    
    <section>
      <p>👋 Hi! I'm a software developer and create stuff for the web.
         I like to make tools that are
        <ul>
          <li>helpful</li>
          <li>insightful</li>
          <li>nice to look at</li>
        </ul>
      </p>
      <p>Currently I am working for <b>tickettoaster</b>, working on
         online-shops for musicians, bands and festivals.</p>
      <p>You can read about things that I've learned on my journey.</p>
    </section>

      <section>
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
      </section>
    </>
  )
}
