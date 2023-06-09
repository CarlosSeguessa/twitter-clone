import Head from 'next/head'
import Image from 'next/image'
import Button from '@/components/Button'
import GitHub from '@/components/Icons/GitHub'
import Spinner from '@/components/Spinner'
import { loginWithGitHub } from '@/firebase/client'
import { useEffect } from 'react'
import Router from 'next/router'
import useUser, { USER_STATES } from '@/hooks/useUser'

export default function Home () {
  const user = useUser()

  useEffect(() => {
    user && Router.replace('/home')
  }, [user])
  return (
    <>
      <Head>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>TweetDev</title>
      </Head>
      <section className="grid place-items-center content-center h-full">
        <Image
          priority
          src="/icons8-twitter-200.svg"
          width="120"
          height="120"
          alt="Logo"
        />
        <h1 className="text-2xl font-bold text-primary">TweetDev</h1>
        <h2 className="text-lg text-secondary">Talk with other devs</h2>

        {user === USER_STATES.NOT_LOGGED && (
          <Button
            onClick={loginWithGitHub}
            className={
              'bg-black text-white  py-2 px-6 rounded-full mt-3 cursor-pointer transition duration-300 ease-in-out hover:bg-opacity-70 flex items-center'
            }
          >
            <GitHub width={24} height={24} fill="#fff" className="mr-2" />
            <span>Login with GitHub</span>
          </Button>
        )}
        {user === USER_STATES.NOT_KNOWN && <Spinner />}
      </section>
    </>
  )
}
