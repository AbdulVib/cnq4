import React from 'react'

export default function Loader({ isLoad }) {
    return (
        isLoad && (
            <div className="preloader-wrapper small active">
                <div className="spinner-layer spinner-white-only">
                <div className="circle-clipper left">
                    <div className="circle"></div>
                </div><div className="gap-patch">
                    <div className="circle"></div>
                </div><div className="circle-clipper right">
                    <div className="circle"></div>
                </div>
                </div>
            </div>
        )
    )
}
