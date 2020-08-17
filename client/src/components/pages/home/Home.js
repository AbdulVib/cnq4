import React, { useEffect, useContext, useState } from 'react'

import axios from 'axios'

import AppContext from '../../store/context/context'

export default function Home() {

    const { state: { user } } = useContext(AppContext)
    // console.log(user, ' qwe')

    const [ posts, allPosts ] = useState([])

    //cmnt
    const [ comment, setComment ] = useState('')

    const handleComment = e => {
        setComment(e.target.value)
    }

    const handleSubmit = ( e, postId ) => {
        e.preventDefault()
        const data = {
            comment,
            postId
        }
        // console.log(data, ' dataaa')
        axios.put('http://localhost:5000/comment', data, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': "Bearer " + localStorage.getItem('jwt')
            }
        })
        .then(res => {
            const newData = posts.map((i => {
                if(i._id == res.data._id){
                    return res.data
                }else{
                    return i
                }
            }))
            setComment('')
            allPosts(newData)
        }).catch(err => console.log(err, ' errr'))
    }

    const likePost = id => {
        const data = {
            postId: id
        }
        axios.put('http://localhost:5000/like', data, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': "Bearer " + localStorage.getItem('jwt')
            }
        })
        .then(res => {
            const newData = posts.map((i => {
                if(i._id == res.data._id){
                    return res.data
                }else{
                    return i
                }
            }))
            allPosts(newData)
        }).catch(err => console.log(err, ' errr'))
    }

    const unlikePost = id => {
        const data = {
            postId: id
        }
        axios.put('http://localhost:5000/unlike', data, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': "Bearer " + localStorage.getItem('jwt')
            }
        })
        .then(res => {
            const newData = posts.map((i => {
                if(i._id == res.data._id){
                    return res.data
                }else{
                    return i
                }
            }))
            allPosts(newData)
        }).catch(err => console.log(err, ' err'))
    }

    const deletePost = postId => {
        axios.delete(`http://localhost:5000/deletepost/${postId}`, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('jwt')
            }
        })
            .then(res => {
                const newData = posts.filter(i => i._id !== res.data.data._id)
                allPosts(newData)
            }).catch(err => console.log(err, ' errr'))
    }

    useEffect( _ => {
        axios.get('http://localhost:5000/allpost', {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('jwt')
            }
        })
        .then(res => allPosts([ ...posts, ...res.data.data ]))

    }, [])


    // console.log(_id, ' iddd')
    console.log(posts, ' alllllllllllllllllll')
    return (
        <div className="home container">

            {
                posts.length ? (
                    posts.map( post => {
                        const { _id, pic, postedBy, title, likes, body, comments } = post
                        return(
                            <div key={ _id } className="card home-card">
                                <h5 style={{ margin: '20px' }}>{ postedBy.name } { postedBy._id === user._id && <i className="material-icons" style={{ float: 'right', color: 'red', cursor: 'pointer'}} onClick={() => deletePost(_id) }>delete</i>} </h5>
                                <div className="card-image homeImage">
                                    <img src={ pic } />
                                </div>
                
                                <div className="card-content">
                                    <i className="material-icons" style={{ color: likes.includes(user._id) ? 'red' : 'black' }}>favorite</i>
                                    {
                                        likes.includes(user._id) ? <i className="material-icons" onClick={() => unlikePost(_id)} style={{ margin: '0 10px'}}>thumb_down</i> : <i className="material-icons" onClick={() => likePost(_id)} style={{ margin: '0 10px'}}>thumb_up</i> 
                                    }
                                    <strong>{ likes.length } likes</strong>
                                    <h5>{ title }</h5>
                                    <h6>{ body }</h6>
                                    <br />
                                    
                                    { comments.length >= 1 && <strong>{ comments.length } { comments.length > 1 ? 'comments' : 'comment' } </strong> }

                                    <ul>
                                        {
                                            comments.map( i => {
                                                return <li key={ i._id }>{ i.postedBy.name } - { i.text }</li>
                                            })
                                        }
                                    </ul>

                                    <form onSubmit={ e => handleSubmit(e, _id) }>
                                         <input type="text" placeholder="Add Comment" value={ comment } onChange={ e => handleComment(e) } />
                                    </form>

                                </div>
                             </div>
                        )
                    } )
                ) : <div className="Loading">Loading...</div>
            }

        </div>
    )
}
