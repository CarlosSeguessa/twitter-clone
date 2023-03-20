import Tweet from '@/components/Tweet'
import Head from 'next/head'
import Link from 'next/link'
import useTimeline from '@/hooks/useTimeline'
import Button from '@/components/Button'
import Avatar from '@/components/Avatar'
import useUser from '@/hooks/useUser'
import { logout } from '@/firebase/client'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
export default function User () {
  const user = useUser()
  const { timeline } = useTimeline()
  return (
    <>
      <Head>
        <title>{user && user.username} / TweetDev </title>
      </Head>

      <header>
        <div className="w-full h-12 flex items-center justify-between pl-5">
          <Link href={'/home'}>
            <ArrowLeftIcon className="h-6 w-6 text-secondary" />
          </Link>
        </div>
        <div className="flex items-center w-full justify-between mt-10 px-7">
          <div className="flex items-center">
          {user && <Avatar avatar={user.avatar} w={'69'} h={'69'} />}
            <div className="ml-4">
              <h2 className="text-2xl font-bold">{user && user.username}</h2>
              <h3 className="text-sm text-gray-500">
                {user && user.email}
              </h3>
            </div>
          </div>
          <Button
            onClick={logout}
            className="bg-primary text-white rounded-full px-4 py-2 text-sm"
          >
            Sign out
          </Button>
        </div>
      </header>

      {/* section with the tweets of the user */}

      <section className="flex items-center justify-center p-3 mt-6">
        <div className="w-full">
          <h2 className="">Tweets</h2>
        </div>
      </section>
      <article>
        {/* just show the tweets of the user */}
        {user &&
          timeline
            .filter((tweet) => tweet.userId === user.uid)
            .map((tweet) => <Tweet key={tweet.id} {...tweet} />)}
      </article>
    </>
  )
}
