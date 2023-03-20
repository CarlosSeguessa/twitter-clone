import { useState, useEffect } from 'react'
import { listenLatestTweets } from '@/firebase/client'
import useUser from '@/hooks/useUser'

const TIMELINE_STATES = {
  LOADING: 1,
  LOADED: 2,
  ERROR: -1
}

export default function useTimeline () {
  const [timeline, setTimeline] = useState([])
  const [timelineState, setTimelineState] = useState(TIMELINE_STATES.LOADING)
  const user = useUser()

  useEffect(() => {
    let unsubscribe

    if (user) {
      unsubscribe = listenLatestTweets((newTweets) => {
        setTimeline(newTweets)
        setTimelineState(TIMELINE_STATES.LOADED)
      })
    }
    return () => unsubscribe && unsubscribe()
  }, [user])

  return { timeline, timelineState }
}
