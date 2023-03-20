import Avatar from '@/components/Avatar'
import useTimeAgo from '@/hooks/useTimeAgo'
import useDateTimeFormat from '@/hooks/useDateTimeFormat'
import Button from '@/components/Button'
import { addLike, deleteTweet, removeLike } from '@/firebase/client'
import useUser from '@/hooks/useUser'
import Image from 'next/image'
import { HeartIcon, TrashIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconFilled } from '@heroicons/react/24/solid'

const Tweet = ({
  id,
  userName,
  avatar,
  content,
  createdAt,
  img,
  userId,
  likesCount,
  likes
}) => {
  const user = useUser()
  const timeago = useTimeAgo(createdAt)
  const createdAtFormated = useDateTimeFormat(createdAt)

  const handleLike = (e) => {
    e.stopPropagation()
    addLike(id, user.uid)
  }

  const handleRemoveLike = (e) => {
    e.stopPropagation()
    removeLike(id, user.uid)
  }

  return (
    <div className="border-b-2 border-[#eaf7ff]">
      <article
        className="flex py-3 px-5  break-words  "
      >
        <div className="pr-3">
          <Avatar avatar={avatar} w={'49'} h={'49'} />
        </div>
        <section className="w-full">
          <header className="flex items-center justify-between">
            <div>
              <strong>{userName}</strong>
              <span className="mx-1 text-[#555]"> . </span>
                <time title={createdAtFormated} className="text-[#555] text-sm">
                  {timeago}
                </time>
            </div>
            <div>
              {user && user.uid === userId && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteTweet(id)
                  }}
                >
                  <span className="text-red-600 flex hover:bg-red-100 rounded-full w-full p-2">
                    <TrashIcon className="w-5 h-5 text-red-600" />
                  </span>
                </button>
              )}
            </div>
          </header>
          <p>{content}</p>
          {img && (
            <Image
              src={img}
              alt={userName}
              width={130}
              height={130}
              className="rounded-xl mt-2 w-full"
            />
          )}
        </section>
      </article>
      <section className="flex w-full items-center justify-end pr-6 h-10 ">
        {user &&
        likes &&
        likes.map((like) => like.userId).includes(user.uid)
          ? (
          <Button
            onClick={handleRemoveLike}
            className="flex items-center like-button "
          >
            <HeartIconFilled className="w-5 h-5 text-red-500" />
            <span className="text-gray-500 text-sm ml-1">{likesCount}</span>
          </Button>
            )
          : (
          <Button
            onClick={handleLike}
            className="flex items-center like-button "
          >
            <HeartIcon className="w-5 h-5 text-gray-500" />
            <span className="text-gray-500 text-sm ml-1">{likesCount}</span>
          </Button>
            )}
      </section>
    </div>
  )
}

export default Tweet
