import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { LayoutSetup, useLayout } from '../../core';
import { Header } from './Header';
import { Navbar } from './Navbar';
import { useAuth } from '../../../../app/modules/auth/core/Auth';
import { DOMAIN } from '../../../../app/routing/ApiEndpoints';

interface HeaderWrapperProps {
  toggleView?: (value: string) => void;
}

export function HeaderWrapper({ toggleView }: HeaderWrapperProps) {
  const { config, classes } = useLayout();
  const location = useLocation();
  const { currentUser } = useAuth();
  const [subscriptionName, setSubscriptionName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const school_id = currentUser?.school_id;

  // Fetch subscription info only for non-students
  useEffect(() => {
    if (currentUser?.role !== 'student' && school_id) {
      const fetchSubscriptionId = async () => {
        try {
          const response = await fetch(`${DOMAIN}/api/superadmin/get-subscription-id/${school_id}`);
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
          const data = await response.json();
          setSubscriptionName(data.result[0]?.subscription_name || 'Unlimited Access');
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchSubscriptionId();
    }
  }, [school_id, currentUser]);

  // Set the layout container based on configuration
  if (config.app?.header?.default?.container === 'fluid') {
    LayoutSetup.classes.headerContainer.push('container-fluid');
  } else {
    LayoutSetup.classes.headerContainer.push('container-xxl');
  }

  if (!config.app?.header?.display) {
    return null;
  }

  // const pathname = location.pathname;
  const isStudent = currentUser?.role_name === 'student';
  const isAdmin = currentUser?.role_name === 'School Admin';

  // // Create breadcrumbs based on role
  // const pathParts = isStudent
  //   ? pathname.split('student/').filter(Boolean)
  //   : pathname.split('/').filter(Boolean);

  // const breadcrumbs = pathParts.map((part, index) => {
  //   const isLast = index === pathParts.length - 1;
  //   const title = part.replace(/-/g, ' '); // Replace dashes with spaces for better readability

  //   return (
  //     <li
  //       key={index}
  //       className={clsx('breadcrumb-item', { active: isLast })}
  //       aria-current={isLast ? 'page' : undefined}
  //       style={{
  //         display: 'flex',
  //         alignItems: 'center',
  //         fontFamily: 'Manrope',
  //         fontSize: '16px',
  //         color: isLast ? '#000' : '#1C335C',
  //       }}
  //     >
  //       {isLast ? (
  //         <span>{title}</span>
  //       ) : (
  //         <Link to={`/${pathParts.slice(0, index + 1).join('/')}`} style={{ textDecoration: 'none', color: '#1C335C' }}>
  //           {title}
  //         </Link>
  //       )}
  //     </li>
  //   );
  // });

  return (
    <div id="kt_app_header" className="app-header" style={{padding: '10px 20px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <div
        id="kt_app_header_container"
        className={clsx(' d-flex align-items-center justify-content-between', classes.headerContainer.join(' '), config.app?.header?.default?.containerClass)}
      >
        <div className="d-flex align-items-center gap-3">
          <Header  />
        </div>
        
        {/* Display subscription info only for non-students */}
        {isAdmin && (
         <div
         style={{
           display: 'flex',
           alignItems: 'center',
           padding: '8px 16px',
           fontFamily: 'Manrope, sans-serif',
           fontSize: '16px',
           color: '#1f4061',
         }}
       >
         <svg
           xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 24 24"
           width="20px"
           height="20px"
           fill="#1C335C"
           style={{ marginRight: '8px' }}
         >
           <path d="M0 0h24v24H0V0z" fill="none" />
           <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93s3.05-7.44 7-7.93v15.86zm2 0V4.07c3.95.49 7 3.85 7 7.93s-3.05 7.44-7 7.93z" />
         </svg>
         <div>
           <span style={{ fontWeight: '600' }}>Current Plan: </span>
           <span
             style={{
               display: 'inline-block',
               padding: '2px 8px',
               backgroundColor: '#1C335C',
               color: '#FFFFFF',
               borderRadius: '4px',
               fontWeight: '600',
               fontSize: '14px',
               marginLeft: '8px',
             }}
           >
             {subscriptionName}
           </span>
         </div>
       </div>
        )}

        {/* Navbar */}
        <Navbar toggleView={!isStudent ? toggleView : undefined} />
      </div>
    </div>
  );
}
