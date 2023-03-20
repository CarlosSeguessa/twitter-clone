import Head from 'next/head'
import router from 'next/router'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Button from '@/components/Button'
import { ArrowLeftIcon, XMarkIcon } from '@heroicons/react/24/outline'
import useUser from '@/hooks/useUser'
import { addTweet, app } from '@/firebase/client'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from 'firebase/storage'
import Avatar from '@/components/Avatar'
import { v4 } from 'uuid'

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  lOADING: 1,
  SUCCESS: 2,
  ERROR: -1
}

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3
}

export default function ComposeTweet () {
  const user = useUser()
  const [messageTweet, setMessageTweet] = useState('')
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [imgURL, setImgURL] = useState(null)
  const [task, setTask] = useState(null)

  const metadata = {
    contentType: 'image/jpeg'
  }

  const storage = getStorage(app)

  const uploadImage = (file) => {
    const storageRef = ref(storage, `images/${file.name + v4()}`)
    const uploadTask = uploadBytesResumable(storageRef, file, metadata)
    return uploadTask
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus(COMPOSE_STATES.lOADING)
    addTweet({
      avatar: user.avatar,
      content: messageTweet,
      userId: user.uid,
      userName: user.username,
      img: imgURL
    })
      .then(() => {
        router.push('/home')
      })
      .catch((err) => {
        console.error(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  useEffect(() => {
    if (task) {
      task.on(
        'state_changed',
        (snapshot) => {
          setDrag(DRAG_IMAGE_STATES.UPLOADING)
          switch (snapshot.state) {
            case 'paused':
              break
            case 'running':
              break
          }
        },
        (error) => {
          setDrag(DRAG_IMAGE_STATES.ERROR)
          console.log(error)
        },
        () => {
          getDownloadURL(task.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL)
            setImgURL(downloadURL)
            setDrag(DRAG_IMAGE_STATES.COMPLETE)
          })
        }
      )
    }
  }, [task])

  const handleDrop = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
    const file = e.dataTransfer.files[0]
    const task = uploadImage(file)
    setTask(task)
  }

  const isButtonDisabled =
    messageTweet.length === 0 || status === COMPOSE_STATES.lOADING
  return (
    <>
      <Head>
        <meta name="description" content="Compose Tweet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>
Post a new tweet / TweetDev</title>
      </Head>
      <section className="flex w-full ">
        <div className="absolute top-16 sm:top-28 ml-2 items-start justify-start">
          {user && (
            <Avatar
              userName={user.username}
              avatar={user.avatar}
              w={'45'}
              h={'45'}
            />
          )}
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center w-full px-2 py-2"
        >
          <div className="w-full h-12 flex items-center justify-between px-2 mb-4">
            <Link href={'/home'}>
              <ArrowLeftIcon className="h-6 w-6 text-secondary" />
            </Link>
            <Button
              isDisabled={isButtonDisabled}
              className={
                'bg-primary text-white py-2 px-6 rounded-full transition disabled: duration-300 ease-in-out  hover:bg-opacity-70 flex items-center disabled:opacity-40 '
              }
            >
              Tweet
            </Button>
          </div>
          <textarea
            maxLength="4000"
            placeholder="What's going on?"
            className={
              drag === DRAG_IMAGE_STATES.DRAG_OVER
                ? 'border-dashed border-4 pl-14 border-primary w-full h-32 p-2 resize-none outline-none'
                : 'border-solid border-transparent pl-14 border-4 w-full h-32 p-2 resize-none outline-none'
            }
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            value={messageTweet}
            onChange={(e) => setMessageTweet(e.target.value)}
          ></textarea>
          {imgURL && (
            <div className="relative flex items-center justify-left w-full">
              <div>
                <button
                  onClick={() => setImgURL(null)}
                  className="absolute bottom-32 left-56 bg-primary text-white rounded-full p-1"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
                <div className='mt-3'>
                <img src={imgURL} className="w-60 h-36 object-fill" />
                </div>
              </div>
            </div>
          )}
          <div className="pr-4 py-4 pl-14 w-full flex justify-end border-b-2">
            <span>{messageTweet.length}/4000</span>
          </div>
        </form>
      </section>
    </>
  )
}
