import {FC} from 'react'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {toAbsoluteUrl, WithChildren} from '../../../../helpers'
import {useLayout} from '../../../core'

type Props = {
  to: string
  icon?: string
  hasBullet?: boolean
}

const SidebarMenuHome: FC<Props & WithChildren> = ({
  children,
  to,
  icon,
}) => {
  const {config} = useLayout()
  const {app} = config

  return (
    <div className='menu-item' style={{paddingLeft:'8px'}}>
      <Link className={clsx('menu-link')} to={to}>
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
      </Link>
      {children}
    </div>

    
  )
}

export {SidebarMenuHome}
