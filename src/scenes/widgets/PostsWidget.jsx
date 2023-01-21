import React from 'react'
import PostWidget from './PostWidget'
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

export default function PostsWidget({userId, isProfile = false}) {
    const dispatch =useDispatch()
    const posts = useSelector((state) => state.posts)
    const token = useSelector((state) => state.token)

    const getPosts = async () => {
        const response = await fetch("http://localhost:5000/posts", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    }

    const getUserPosts = async () => {
        const response = await fetch(
          `http://localhost:5000/posts/${userId}/posts`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
      };

      React.useEffect(() => {
        if(isProfile) {
            getUserPosts();
        } else {
            getPosts()
        }
      }, [])

      const renderPosts = posts?.map(({_id,userId,firstName,lastName,description,location,picturePath,userPicturePath,likes,comments}) => {
        return <PostWidget key={_id} isProfile={isProfile} postId={_id} postUserId={userId} name={`${firstName} ${lastName}`} description={description} location={location} picturePath={picturePath} userPicturePath={userPicturePath} likes={likes} comments={comments} />
      })
  return (
    <div className="posts-container">
         {renderPosts} 
    </div>
  )
}
