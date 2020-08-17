import React, { useState, useEffect, useContext } from 'react'

import AppContext from '../../store/context/context' 

import axios from 'axios'

export default function Profile() {

    const { state } = useContext(AppContext)

    console.log(state,' stayeeee')

    const [ pics, setPics ] = useState([])
 
    useEffect(() => {
        axios.get('http://localhost:5000/mypost', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }  
        })
        .then(res => setPics([...pics, ...res.data.myPost ]))
    }, [])

    console.log(pics, ' picsss')

    return (
        <div className="" style={{ maxWidth: '650px', margin: '0 auto'}}>
        
            <div className="" style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0', padding: '20px', borderBottom: '1px dotted orange' }}>
              
                <div>
                    <img style={{ width: '160px', height: '160px', borderRadius: '50%' }} src="https://images.unsplash.com/photo-1549068106-b024baf5062d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" />
                </div>
              
                <div>
                    <h5>{ state.user && state.user.name }</h5>
                    <div style={{ display: 'flex', border: '', justifyContent: 'space-between', width: '115%' }}>
                        <h6>40 posts</h6>
                        <h6>40 followers</h6>
                        <h6>40 following</h6>
                    </div>
                </div>
            
            </div>

            <div className="gallery" style={{ border: '', textAlign: ''}}>
                {
                    pics.length ? pics.map(i => {
                        return (
                            <img key={ i._id } className="item" src={ i.pic } alt={ i.title }/>
                        )
                    }) : 'Loading...'
                }
            </div>
        
        </div>
    )
}
