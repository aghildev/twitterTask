
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

export const useFetch = (url,key) => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)

  const { username, password } = useSelector((state) => state.auth)

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async () => {
      setIsPending(true)

      try {
        const headers = new Headers()
        headers.set('Authorization', 'Basic ' + btoa(username + ':' + password))

        const res = await fetch(url, {
          signal: controller.signal,
          headers: headers
        })

        if(!res.ok) {
          throw new Error(res.statusText)
        }

        const data = await res.json()

        setIsPending(false)
        setData(data)
        setError(null)
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("the fetch was aborted")
        } else {
          setIsPending(false)
          setError('Could not fetch the data')
        }
      }
    }

    fetchData()

    return () => {
      controller.abort()
    }

  }, [url, username, password,key])

  return { data,error,isPending,setData }
}
