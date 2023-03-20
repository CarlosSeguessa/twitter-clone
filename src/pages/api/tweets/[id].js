import { firestore } from '@/firebase/admin'

const getTweets = async (req, res) => {
  try {
    const { query } = req
    const { id } = query
    const doc = await firestore.collection('tweets').doc(id).get()
    const data = doc.data()
    const { createdAt } = data
    const comments = data.comments
    const likes = data.likes
    const likesCount = data.likesCount
    res.status(200).json({
      ...data,
      id: doc.id,
      createdAt: +createdAt.toDate(),
      comments,
      likes,
      likesCount
    })
  } catch (error) {
    res.status(404).json(error)
  }
}

export default getTweets
