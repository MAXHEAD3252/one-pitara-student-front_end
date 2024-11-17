import { useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { toAbsoluteUrl } from '../../../_metronic/helpers'

const AuthLayout = () => {
  const location = useLocation();  // Get the current location

  useEffect(() => {
    const root = document.getElementById('root')
    if (root) {
      root.style.height = '100%'
    }
    return () => {
      if (root) {
        root.style.height = 'auto'
      }
    }
  }, [])

  console.log(location.pathname);
  
  // Determine which background image to show based on the path
  const backgroundImage = location.pathname === '/auth'
    ? toAbsoluteUrl('media/misc/authbg-new.jpg')
    : toAbsoluteUrl('media/misc/authbg.jpg');

  return (
    <div className='d-flex flex-column flex-lg-row flex-column-fluid h-100'>
      {/* begin::Body */}
      <div 
  className='d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1 bgi-size-cover bgi-position-center' 
  style={{ 
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
        {/* begin::Form */}
        <div className='d-flex flex-center flex-column flex-lg-row-fluid' style={{justifyContent:'center'}}>
          {/* begin::Wrapper */}
          <div className='w-lg-500px p-10' style={{backgroundColor:'white', borderRadius:'10px'}}>
  <Outlet />
</div>

          {/* end::Wrapper */}
        </div>
        {/* end::Form */}
      </div>
    </div>
  )
}

export default AuthLayout;



 {/* <div
        className='d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2'
        style={{backgroundImage: `url(${toAbsoluteUrl('media/misc/auth-bg.png')})`}}  
      >
        <div className='d-flex flex-column flex-center py-15 px-5 px-md-15 w-100'>
          <Link to='/' className='mb-12'>
            <img alt='Logo' src={toAbsoluteUrl('media/logos/custom-1.png')} className='h-75px' />
          </Link>

          <img
            className='mx-auto w-275px w-md-50 w-xl-500px mb-10 mb-lg-20'
            src={toAbsoluteUrl('media/misc/auth-screens.png')}
            alt=''
          />

          <h1 className='text-white fs-2qx fw-bolder text-center mb-7'>
            Fast, Efficient and Productive
          </h1>

          <div className='text-white fs-base text-center'>
            In this kind of post,{' '}
            <a href='#' className='opacity-75-hover text-warning fw-bold me-1'>
              the blogger
            </a>
            introduces a person they’ve interviewed <br /> and provides some background information
            about
            <a href='#' className='opacity-75-hover text-warning fw-bold me-1'>
              the interviewee
            </a>
            and their <br /> work following this is a transcript of the interview.
          </div>
        </div>
      </div> */}