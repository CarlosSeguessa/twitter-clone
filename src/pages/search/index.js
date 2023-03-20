import Link from 'next/link'
import Head from 'next/head'
import SearchInput from '@/components/SearchInput'
import Tweet from '@/components/Tweet'
import useSearch from '@/hooks/useSearch'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
export default function Search () {
  const { search, handleSearch, timelineFiltered } = useSearch()

  return (
    <>
    <Head>
        <title>Search / TweetDev</title>
      </Head>
      <header className='w-full flex items-center justify-between p-2 mb-4'>
        <Link href={'/home'}>
            <ArrowLeftIcon className="h-6 w-6 text-secondary" />
        </Link>
        <SearchInput value={search} onChange={handleSearch} />
        <div>
        </div>
      </header>
      <section className='flex-1'>
        {timelineFiltered.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </section>
    </>
  )
}
