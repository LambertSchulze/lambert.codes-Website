import fs          from 'fs'
import path        from 'path'
import frontmatter from 'gray-matter'
import remark      from 'remark'
import html        from 'remark-html'


const POSTS_DIRECTORY = path.join(process.cwd(), 'posts_content') // /posts_content


export function getSortedPostsFrontmatter()
{
    const fileNames = fs.readdirSync(POSTS_DIRECTORY)

    const allPostsData = fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, '')
        const fullPath = path.join(POSTS_DIRECTORY, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const matterResult = frontmatter(fileContents)

        return {
            id,
            ...(matterResult.data as { date: string; title: string })
        }
    })
    
    // return Posts sorted by date
    // newest one first
    return allPostsData.sort( (a, b) => {
        if (a.date < b.date) return 1
        else                 return -1
    })
}


export function getAllPostIds()
{
    const fileNames = fs.readdirSync(POSTS_DIRECTORY)

    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    })
}


export async function getPostData(id: string)
{
    const fullPath = path.join(POSTS_DIRECTORY, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const matterResult = frontmatter(fileContents)
    const processedContent = await remark()
                                   .use(html)
                                   .process(matterResult.content)
    const contentHtml = processedContent.toString()

    return {
        id,
        contentHtml,
        ...(matterResult.data as { date: string; title: string })
    }
}