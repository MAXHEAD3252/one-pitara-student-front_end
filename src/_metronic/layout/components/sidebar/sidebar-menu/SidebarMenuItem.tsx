import {FC} from 'react'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router'
import {checkIsActive, toAbsoluteUrl, WithChildren} from '../../../../helpers'
import {useLayout} from '../../../core'

type Props = {
  to: string
  title: string
}

const SidebarMenuItem: FC<Props & WithChildren> = ({
  children,
  to,
  title,
}) => {
  const {pathname} = useLocation()
  const isActive = pathname === to;
  const {config} = useLayout()
  const {app} = config

  return (
    <div className='menu-item' >
      <Link className={clsx('menu-link without-sub')} to={to} style={{padding:'4px', borderRadius:'10px'}}>
        <span className='' style={{fontFamily:'Manrope', fontSize:'14px', padding:'5px'}}>{title}</span>
      </Link>
      {children}
    </div>

    
  )
}

export {SidebarMenuItem}
