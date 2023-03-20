import Image from 'next/image'
const Avatar = ({ avatar, w, h }) => {
  return (
    <>
      <Image
        src={avatar}
        width={w}
        height={h}
        alt={''}
        priority
        className="rounded-full"
      />
    </>
  )
}

export default Avatar
