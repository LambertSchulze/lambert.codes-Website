import fs          from 'fs'
import path        from 'path'
import frontmatter from 'gray-matter'
import remark      from 'remark'
import html        from 'remark-html'


type PostId = string
type PostContent = string

interface Frontmatter {
    title:       string;
    publishDate: string;
    updateDate:  string;
}

export interface PostFrontmatter extends Frontmatter {
    id: PostId;
}

export interface PostData extends PostFrontmatter {
    contentHtml: PostContent;
}



const POSTS_DIRECTORY = path.join(process.cwd(), 'posts_content') // /posts_content


export function getSortedPostsFrontmatter(): PostFrontmatter[]
{
    const fileNames = fs.readdirSync(POSTS_DIRECTORY)

    const allPostsData = fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, '')
        const fullPath = path.join(POSTS_DIRECTORY, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const matterResult = frontmatter(fileContents)

        return {
            id,
            ...(matterResult.data as Frontmatter)
        }
    })

    // return Posts sorted by published date
    // newest one first
    return allPostsData.sort( (a, b) => {
        if (a.publishDate < b.publishDate) return 1
        else                 return -1
    })
}


export function getAllPostIds(): {params: {id: PostId}}[]
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


export async function getPostData(id: PostId): Promise<PostData>
{
    const fullPath = path.join(POSTS_DIRECTORY, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const matterResult = frontmatter(fileContents)
    const processedContent = await remark()
                                   .use(html)
                                   .process(matterResult.content)
    const contentHtml = processedContent.toString()

    return {
        ...(matterResult.data as Frontmatter),
        id,
        contentHtml
    }
}