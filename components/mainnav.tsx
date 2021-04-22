import style from './mainnav.module.css'
import Link  from 'next/link'

export default function MainNav()
{
    return (
        <nav className={style.nav}>
            <Link href="/"><a>Home</a></Link>
            <Link href="/and-writes/"><a>Posts</a></Link>
        </nav>
    )
}