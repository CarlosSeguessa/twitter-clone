import Head from 'next/head'
import Tweet from '@/components/Tweet'
import Link from 'next/link'
import useUser from '@/hooks/useUser'
import useTimeline from '@/hooks/useTimeline'
import Avatar from '@/components/Avatar'
import {
  UserIcon,
  PencilSquareIcon,
  HomeIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'
const Home = () => {
  const user = useUser()
  const { timeline } = useTimeline()

  return (
    <>
      <Head>
        <meta name="description" content="Home of TweetDev" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Home / TweetDev</title>
      </Head>
      {/* header */}
      <header className="w-full h-12 flex sticky top-0 items-center bg-white/30 backdrop-blur-lg border-b-2 sm:rounded-t-xl">
        {user && (
          <div className="ml-2">
            <Avatar
              priority
              userName={user.username}
              avatar={user.avatar}
              w={'35'}
              h={'35'}
            />
          </div>
        )}
      </header>
      {/* main */}
      <section className="pt-1 flex-1">
        {user &&
          timeline.map((tweet) => (
            <Tweet
              key={tweet.id}
              id={tweet.id}
              createdAt={tweet.createdAt}
              likes={tweet.likes}
              likesCount={tweet.likesCount}
              sharedCount={tweet.sharedCount}
              userName={tweet.userName}
              avatar={tweet.avatar}
              content={tweet.content}
              userId={tweet.userId}
              img={tweet.img}
            />
          ))}
      </section>
      <nav className="h-12 sm:h-14 flex justify-around items-center sticky bottom-0 border-t-2 w-full bg-white sm:rounded-b-xl ">
        <Link
          className="flex justify-center items-center h-full nav-link w-10 flex-auto p-4"
          href="/home"
        >
          <HomeIcon className="h-6 w-6 font-bold text-primary" />
        </Link>
        <Link
          className="flex justify-center items-center h-full nav-link w-10 flex-auto p-4"
          href="/search"
        >
          <MagnifyingGlassIcon className="h-6 w-6 font-bold text-primary" />
        </Link>
        <Link
          className="flex justify-center items-center h-full nav-link w-10 flex-auto p-4"
          href="/compose/tweet"
        >
          <PencilSquareIcon className="h-6 w-6 font-bold text-primary" />
        </Link>
        <Link
          className="flex justify-center items-center h-full nav-link w-10 flex-auto p-4"
          href={`/user/${user?.uid}`}
        >
          <UserIcon className="h-6 w-6 font-bold text-primary" />
        </Link>
      </nav>
    </>
  )
}

export default Home
