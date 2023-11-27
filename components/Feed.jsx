"use client"

import { useState, useEffect } from "react"
import PromptCardList from "@components/PromptCardList"

const Feed = () => {
  const [allPosts, setAllPosts] = useState([])
  const [searchText, setSearchText] = useState("")
  const [searchedPost, setSearchedPost] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt")
      const data = await response.json()

      setAllPosts(data)
    }
    if (!searchText) fetchPosts()
  }, [])

  const filterPrompts = (searchText) => {
    return allPosts.filter((post) => {
      return (
        post.prompt.toLowerCase().includes(searchText.toLowerCase()) ||
        post.tag.toLowerCase().includes(searchText.toLowerCase()) ||
        post.creator.username.toLowerCase().includes(searchText.toLowerCase())
      )
    })
  }

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)

    const searchResult = filterPrompts(e.target.value)
    setSearchedPost(searchResult)
  }

  const handleTagClick = (tag) => {
    setSearchText(tag)

    const searchResult = filterPrompts(tag)
    setSearchedPost(searchResult)
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {searchText ? (
        <PromptCardList data={searchedPost} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  )
}

export default Feed
