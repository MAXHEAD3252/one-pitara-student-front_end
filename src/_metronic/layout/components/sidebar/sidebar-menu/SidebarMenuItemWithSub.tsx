import React, { useEffect, useRef } from 'react'
import clsx from 'clsx'
import {useLocation} from 'react-router'
import {checkIsActive, toAbsoluteUrl, WithChildren} from '../../../../helpers'
import {useLayout} from '../../../core'
import '../../../../../app/pages/StaffPages/FeeDetails/style.css'
type Props = {
  to: string
  icon?: string
  menuTrigger?: 'click' | 'hover'
  menuPlacement?: 'right-start' | 'bottom-start' | 'left-start'
  hasArrow?: boolean
  hasBullet?: boolean
  isMega?: boolean
}

const SidebarMenuItemWithSub: React.FC<Props & WithChildren> = ({
  children,
  to,
  icon,
  menuTrigger,
  menuPlacement,
  hasArrow = false,
  hasBullet = false,
  isMega = false,
}) => {
  const menuItemRef = useRef<HTMLDivElement>(null)
  const {pathname} = useLocation()
  // const isActive = checkIsActive(pathname, to)
  const {config} = useLayout()
  const {app} = config;

  useEffect(() => {
    if (menuItemRef.current && menuTrigger && menuPlacement) {
      menuItemRef.current.setAttribute('data-kt-menu-trigger', menuTrigger)
      menuItemRef.current.setAttribute('data-kt-menu-placement', menuPlacement)
    }
  }, [menuTrigger, menuPlacement])

  return (
    <div ref={menuItemRef} className='menu-item menu-lg-down-accordion me-lg-1'>
      <span
        className={clsx('menu-link py-3', {
          active: checkIsActive(pathname, to),
        })}
      >
        {icon && app?.sidebar?.default?.menu?.iconType === 'svg' && (
          <span className='menu-icon'>
            {' '}
            <img
            alt='Logo'
            src={toAbsoluteUrl(icon)}
            className='h-25px app-sidebar-logo-default'
            style={{color:'white'}}
          />
          </span>
        )}
      </span>
      <div
        className={clsx(
          'menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown ',
          isMega ? 'w-100 w-lg-950px   p-5 p-lg-5 ' : 'menu-rounded-0 py-lg-4 w-lg-325px '
        )}
        data-kt-menu-dismiss='true'
      >
        {children}
      </div>
    </div>
  )
}

export {SidebarMenuItemWithSub}

 {/* {hasBullet && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot'></span>
          </span>
        )} */}
 {/* {fontIcon && (
          <span className='menu-icon'>
            <i className={clsx('bi fs-3', fontIcon)}></i>
          </span>
        )}

        <span className='menu-title'>{title}</span> */}

        {/* {hasArrow && <span className='menu-arrow'></span>} */}