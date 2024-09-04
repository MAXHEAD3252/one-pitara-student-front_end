import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';
import { LayoutSetup, useLayout } from '../../core';
import { Header } from './Header';
import { Navbar } from './Navbar';
import { useAuth } from '../../../../app/modules/auth/core/Auth';
import { DOMAIN } from '../../../../app/routing/ApiEndpoints';

interface HeaderWrapperProps {
  // title: string;
  toggleView: ((value: string) => void); // Adjust the type of toggleView
}


export function HeaderWrapper({ toggleView }: HeaderWrapperProps) {
  const { config, classes } = useLayout();
  const location = useLocation();
  const { currentUser } = useAuth();
  const [subscriptionName, setSubscriptionName] = useState(null);
  const school_id = currentUser?.school_id;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const schoolId = school_id;
    const fetchSubscriptionId = async () => {
        try {
            const response = await fetch(`${DOMAIN}/api/superadmin/get-subscription-id/${schoolId}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            
            setSubscriptionName(data.result[0]?.subscription_name);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    if (schoolId) {
        fetchSubscriptionId();
    } else {
        setLoading(false);
    }
}, [school_id]);


  
  
  if (config.app?.header?.default?.container === 'fluid') {
    LayoutSetup.classes.headerContainer.push("container-fluid");
  } else {
    LayoutSetup.classes.headerContainer.push("container-xxl");
  }
  if (!config.app?.header?.display) {
    return null;
  }

  const pathname = location.pathname;
  const pathParts = pathname.split('/').filter(part => part !== ''); // Split the pathname and remove empty parts

  const breadcrumbs = pathParts.map((part, index) => {
    const isLast = index === pathParts.length - 1;
    const title = index === 0 ? part.charAt(0).toUpperCase() + part.slice(1) : part; // Capitalize the first letter of the first part
    const link = `/${pathParts.slice(0, index + 1).join('/')}`; // Construct the link based on the current part and previous parts
    return (
      <li key={index} style={{display:'flex', justifyContent:'center',alignItems:'center'}} className={clsx("breadcrumb-item", { "active": isLast })} aria-current={isLast ? "page" : undefined}>
        {isLast ? (
          <span style={{fontFamily:"Manrope",fontSize:'18px',textTransform:'capitalize', marginTop:'6px', color:'#000' }}>{title}</span>
        ) : (
          <Link to={link}><span style={{fontFamily:"Manrope",fontSize:'18px',textTransform:'capitalize', color:'#000' }}>{title}</span></Link>
        )}
      </li>
    );
  });
  // console.log(breadcrumbs);
  
  return (
    <div id='kt_app_header' className='app-header' style={{ boxShadow: "none" }}>
      <div
        id='kt_app_header_container'
        className={clsx(
          'app-container',
          classes.headerContainer.join(' '),
          config.app?.header?.default?.containerClass
        )}
      >
        <div
          id='kt_app_header_wrapper'
          className='d-flex align-items-stretch justify-content-between flex-lg-grow-1'
        >
          {config.app.header.default?.content === 'menu' &&
            config.app.header.default.menu?.display && (
              <div
                className='app-header-menu app-header-mobile-drawer align-items-stretch'
                data-kt-drawer='true'
                data-kt-drawer-name='app-header-menu'
                data-kt-drawer-activate='{default: true, lg: false}'
                data-kt-drawer-overlay='true'
                data-kt-drawer-width='225px'
                data-kt-drawer-direction='end'
                data-kt-drawer-toggle='#kt_app_header_menu_toggle'
                data-kt-swapper='true'
                data-kt-swapper-mode="{default: 'append', lg: 'prepend'}"
                data-kt-swapper-parent="{default: '#kt_app_body', lg: '#kt_app_header_wrapper'}"
                data-kt-app-sidebar-minimize="on"
              >
                
                <Header
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
                title={breadcrumbs}   
                />
              </div>
            )}
            <div style={{fontFamily:'Manrope', fontSize:'18px', alignContent:'center'}}>Your Current Plan : <span style={{fontWeight:'700'}}>{subscriptionName ? subscriptionName : 'Unlimited Access'}</span></div>
          
       
          <Navbar toggleView={toggleView} />

        </div>
      </div>
    </div>
  )
}



//   return (
//     <nav aria-label="breadcrumb">
//       <ol className="breadcrumb">
//         {breadcrumbs}
//       </ol>
//     </nav>
//   );
// }





 {/* {config.app.sidebar?.display && (
          <>
            {config.layoutType !== 'dark-header' && config.layoutType !== 'light-header' ? (
              <div
                className='d-flex align-items-center d-lg-none ms-n2 me-2'
                title='Show sidebar menu'
              >
                <div
                  className='btn btn-icon btn-active-color-primary w-35px h-35px'
                  id='kt_app_sidebar_mobile_toggle'
                >
                  <KTIcon iconName='abstract-14' className=' fs-1' />
                </div>
                <div className='d-flex align-items-center flex-grow-1 flex-lg-grow-0'>
                  <Link to='/dashboard' className='d-lg-none'>
                      <img
                        alt='Logo'
                        src={toAbsoluteUrl('media/logos/default-small.svg')}
                        className='h-30px'
                      />
                  </Link>
                </div>
              </div>
            ) : null}
          </>
        )}

        {!(config.layoutType === 'dark-sidebar' || config.layoutType === 'light-sidebar') && (
          <div className='d-flex align-items-center flex-grow-1 flex-lg-grow-0 me-lg-15'>
            <Link to='/dashboard'>
              {config.layoutType === 'dark-header' ? (
                <img
                  alt='Logo'
                  src={toAbsoluteUrl('media/logos/default-dark.svg')}
                  className='h-20px h-lg-30px app-sidebar-logo-default'
                />
              ) : (
                <>
                  <img
                    alt='Logo'
                    src={toAbsoluteUrl('media/logos/default.svg')}
                    className='h-20px h-lg-30px app-sidebar-logo-default theme-light-show'
                  />
                  <img
                    alt='Logo'
                    src={toAbsoluteUrl('media/logos/default-dark.svg')}
                    className='h-20px h-lg-30px app-sidebar-logo-default theme-dark-show'
                  />
                </>
              )}
            </Link>
          </div>
        )} */}