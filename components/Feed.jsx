"use client"

import {useState, useEffect} from 'react'

import PromptCard from './PromptCard'

const PromptCardList = ({data, handleTagClick}) => {
  return(
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post.id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [allPosts, setAllPosts] = useState([]);
  const [searchedPost, setSearchedPost] = useState([]);

  const handleSearchChange = (e) => {
    e.preventDefault()
    setSearchText(e.target.value)

    const filteredPosts = allPosts.filter((post) => {
      return post.prompt.toLowerCase().includes(e.target.value.toLowerCase()) || post.tag.toLowerCase().includes(e.target.value.toLowerCase()) || post.creator.username.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setSearchedPost(filteredPosts)
  }

  const handleTagClick = (tag) => {
    setSearchText(tag)
    const filteredPosts = allPosts.filter((post) => {
      return post.tag.toLowerCase().includes(tag.toLowerCase())
    })
    setSearchedPost(filteredPosts)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()

      setAllPosts(data);
    }
    fetchPosts()
  }, [])


  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>
      <PromptCardList
        data={searchedPost.length ===0 ? allPosts : searchedPost}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed