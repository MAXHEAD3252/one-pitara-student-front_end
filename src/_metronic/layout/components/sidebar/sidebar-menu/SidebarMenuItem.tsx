import {FC} from 'react'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router'
import {checkIsActive, toAbsoluteUrl, WithChildren} from '../../../../helpers'
import {useLayout} from '../../../core'

type Props = {
  to: string
  title: string
  icon?: string
  hasBullet?: boolean
  className?: string;
}

const SidebarMenuItem: FC<Props & WithChildren> = ({
  children,
  to,
  title,
  icon,
  hasBullet = false,
  className,
}) => {
  const {pathname} = useLocation()
  const isActive = pathname === to;
  const {config} = useLayout()
  const {app} = config

  return (
    <div className='menu-item'>
      <Link className={clsx('menu-link without-sub')} to={to}>
        {hasBullet && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot'></span>
          </span>
        )}
        {icon && app?.sidebar?.default?.menu?.iconType === 'svg' && (
          <span className='menu-icon'>
            {' '}
            <img
            alt='Logo'
            src={toAbsoluteUrl(icon)}
            className='h-26px app-sidebar-logo-default'
          />
          </span>
        )}
        <span className='ms-3'>{title}</span>
      </Link>
      {children}
    </div>

    
  )
}

export {SidebarMenuItem}
