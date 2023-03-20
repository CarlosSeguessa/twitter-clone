import { initializeApp } from '@firebase/app'
import {
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  signOut
} from 'firebase/auth'
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  orderBy,
  query,
  onSnapshot,
  limit,
  deleteDoc,
  doc,
  getDoc,
  updateDoc
} from 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDO96Blh_o4TGrVLdfDCkQriw6pnMzIeP8',
  authDomain: 'bluebird-62ddb.firebaseapp.com',
  projectId: 'bluebird-62ddb',
  storageBucket: 'bluebird-62ddb.appspot.com',
  messagingSenderId: '456979270904',
  appId: '1:456979270904:web:418b8462b5f52782533f0d',
  measurementId: 'G-23MPTERKS6'
}
// login con firebase y github
export const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL, uid } = user
  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid
  }
}

export const onAuthStateChanged = (onChange) => {
  return auth.onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null
    onChange(normalizedUser)
  })
}

export const loginWithGitHub = async () => {
  const githubProvider = new GithubAuthProvider()
  githubProvider.setCustomParameters(firebaseConfig)
  const res = await signInWithPopup(auth, githubProvider)
  return mapUserFromFirebaseAuthToUser(res.user)
}

export const logout = async () => {
  await signOut(auth)
}

export const addTweet = ({ avatar, content, userId, userName, img }) => {
  try {
    return addDoc(collection(db, 'tweets'), {
      avatar,
      content,
      userId,
      userName,
      createdAt: Timestamp.fromDate(new Date()),
      likes: [],
      likesCount: 0,
      img
    })
  } catch (error) {
    console.log(error)
  }
}
// when user click on like button, we need to add the user id to the likes array
// and increase the likes count
export const addLike = async (id, userId) => {
  const docRef = doc(db, 'tweets', id)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    const likes = docSnap.data().likes
    const likesCount = docSnap.data().likesCount
    const newLikes = [...likes, { userId }]
    return updateDoc(docRef, {
      likes: newLikes,
      likesCount: likesCount + 1
    })
  }
}

export const removeLike = async (id, userId) => {
  // when user click on like button, we need to add the user id to the likes array
  // and increase the likes count
  // without an object
  const docRef = doc(db, 'tweets', id)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    const likes = docSnap.data().likes
    const likesCount = docSnap.data().likesCount
    const newLikes = likes.filter((like) => like.userId !== userId)
    return updateDoc(docRef, {
      likes: newLikes,
      likesCount: likesCount - 1
    })
  }
}

const mapTweetFromFirebaseToTweetObject = (doc) => {
  const data = doc.data()
  const id = doc.id
  const { createdAt } = data
  const likesCount = data.likesCount
  const commentsCount = data.commentsCount
  const comments = data.comments

  return {
    ...data,
    id,
    createdAt: +createdAt.toDate(),
    likesCount,
    commentsCount,
    comments
  }
}

export const listenLatestTweets = (callback) => {
  return onSnapshot(
    query(collection(db, 'tweets'), orderBy('createdAt', 'desc'), limit(20)),
    (querySnapshot) => {
      const tweets = querySnapshot.docs.map(mapTweetFromFirebaseToTweetObject)
      callback(tweets)
    }
  )
}

export const deleteTweet = (id) => {
  return deleteDoc(doc(db, 'tweets', id))
}
