import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'

import { Link, useHistory } from 'react-router-dom'

import Loader from '../../partials/loader/Loader'

//context
import AppContext from '../../store/context/context'

export default function CreatePost() {

    const { state, allPost } = useContext(AppContext)

    // useEffect(() => {
    //     allPost()
    // }, [])

    console.log(state, ' stateee')


    const history = useHistory()
    const [ data, setData ] = useState({
        title: '',
        body: ''
    })
    
    //image
    const [ image, setImage ] = useState({}) 
    const [ url, setUrl ] = useState('') 
    const [ picName, setPicName ] = useState('') 

    const [ load, setLoad ] = useState(false)

    const handleChange = e => {
        setData({
            ...data, 
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        setPicName(image.name)
    }, [ image ])

    const handleSubmit = _ => {
        setLoad(true)
        const picData = new FormData()
            picData.append('file', image)
            picData.append('upload_preset', "insta-first")
            picData.append('cloud_name', "cnq-first")
        axios.post('https://api.cloudinary.com/v1_1/cnq-first/image/upload', picData)
        .then(res => {
            // console.log(res, ' resssss')
            setUrl(res.data.url)
            setPicName(res.data.original_filename)
            const { title, body } = data
            const obj = { title, body, pic: res.data.url }
            // if(photo){
                // console.log(obj, ' success')
                axios.post('http://localhost:5000/createpost', obj, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }  
                } )
                .then(res => {
                    setLoad(false)
                    M.toast({html: res.data.message, classes: '#43a047 green darken-1' });
                    setData({
                        title: '',
                        body: ''
                    })
                    history.push('/')

                })
                .catch(err => {
                    err && M.toast({html: err.response.data.error, classes: '#c62828 red darken' })
                    setLoad(false)
                })
            // }
        })
        .catch(err => {
            err && M.toast({html: 'Please add all the fields', classes: '#c62828 red darken'})
            setLoad(false)
        })
    }


    // console.log(object)

    return (
        <div className="card input-field" style={{ margin: "50px auto", maxWidth: '500px', padding: '20px', textAlign: 'center' }}>
        {/* { load ? <strong>Loading Wait !!!</strong> : '' } */}
        <input type="text" name="title" onChange={ handleChange } value={ data.title } placeholder="title" />
        <input type="text" name="body" onChange={ handleChange } value={ data.body } placeholder="body" />

        <div className="file-field input-field">
            <div className="btn orange darken-1" style={{ display: 'flex', alignItems: 'center', }}>
                <span>{ picName && picName.length ? picName : "Upload Image" }</span>
                <input type="file" onChange={e => setImage(e.target.files[0]) } />
                {/* <input type="file" onChange={e => console.log(e.target.files[0])} /> */}
            </div>

            <div style={{ visibility: 'hidden' }} className="file-path-wrapper">
                <input type="text" className="file-path validate" value={ picName } />
            </div>

        </div>

        <button onClick={ handleSubmit } className="btn waves-effect waves-light green loaderBtn" type="submit" name="action">{ load ? <Loader isLoad={ load } /> : 'CREATE POST' }</button>

    </div>

    )
}
