import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
        <section className='page notfound'>
          <div className="content">
            <img src="https://static.vecteezy.com/system/resources/thumbnails/008/255/803/small/page-not-found-error-404-system-updates-uploading-computing-operation-installation-programs-system-maintenance-a-hand-drawn-layout-template-of-a-broken-robot-illustration-vector.jpg" alt="notfound" />
            <Link to={'/'}>RETURN TO HOME PAGE</Link>
          </div>
        </section>
    </>
  )
}

export default NotFound