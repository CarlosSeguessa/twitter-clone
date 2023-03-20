import { useState, useMemo } from 'react'
import useTimeline from './useTimeline'

export default function useSearch () {
  const { timeline } = useTimeline()
  const [search, setSearch] = useState('')

  const timelineFiltered = useMemo(() => {
    if (search === '') return timeline

    return timeline.filter((tweet) => {
      return tweet.content.toLowerCase().includes(search.toLowerCase())
    })
  }, [search, timeline])

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }
  return { search, handleSearch, timelineFiltered }
}
