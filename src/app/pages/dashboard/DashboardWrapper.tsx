import {FC} from 'react'
import {useIntl} from 'react-intl'
// import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {PageTitle} from '../../../_metronic/layout/core'
import {
  // ListsWidget2,
  // ListsWidget3,
  // ListsWidget4,
  // ListsWidget6,
  // TablesWidget5,
  // MixedWidget8,
  // CardsWidget7,
  // CardsWidget17,
  // CardsWidget20,
  // ListsWidget26,
  // EngageWidget10, EngageWidget11,
} from '../../../_metronic/partials/widgets'
import { ToolbarDashBoard } from '../../../_metronic/layout/components/toolbar/toolbars/ToolbarDashBoard'
import { Content } from '../../../_metronic/layout/components/content'
// import {useAuth} from '../../../../core/Auth'
import {useAuth} from '../../modules/auth/core/Auth'
import { HeaderWrapper } from '../../../_metronic/layout/components/header_staff'


 
// const handleToggle = (value : boolean)=>{
//   console.log(value);
  
// }
const DashboardPage: FC=() => {
  const user  = useAuth();
  // console.log(user);
  
 return (

  <div className="bg-white">
          <HeaderWrapper toggleView={() => {}} />

    <ToolbarDashBoard  />
    <Content>
    <div style={{width:'100%', justifyContent:'center',textAlign:'center', alignItems:'center', marginTop:'10%',marginBottom:'auto'}}>
    <h1 style={{fontFamily:'Manrope', fontWeight:'400', color:'black'}}>
         Welcome {user?.currentUser?.name} !!
          <br />
          <br />
          <br />
          Your Updated Dashboard is under development <br />  <br /> It will be back soon...
        </h1>
    </div>
    {/* <div className='row g-5 g-xl-10 mb-5 '>
      <div className='col-xxl-6'>
      <EngageWidget10 />
      </div>

      <div className='col-xxl-6'>
        <EngageWidget11 />
      </div>
      <div className='col-xxl-6'>
      <EngageWidget10 />
      </div>

      <div className='col-xxl-6'>
        <EngageWidget10 />
      </div>
    </div> */}
{/* 
    <div className='row gx-5 gx-xl-10'>
      <div className='col-xxl-6 mb-5 mb-xl-10'>
      </div>

      <div className='col-xxl-6 mb-5 mb-xl-10'>
      </div>
    </div>

    <div className='row gy-5 gx-xl-8'>
      <div className='col-xxl-4'>
        <ListsWidget3 className='card-xxl-stretch mb-xl-3' />
      </div>
      <div className='col-xl-8'>
        <TablesWidget10 className='card-xxl-stretch mb-5 mb-xl-8' />
      </div>
    </div>

    <div className='row gy-5 g-xl-8'>
      <div className='col-xl-4'>
        <ListsWidget2 className='card-xl-stretch mb-xl-8' />
      </div>
      <div className='col-xl-4'>
        <ListsWidget6 className='card-xl-stretch mb-xl-8' />
      </div>
      <div className='col-xl-4'>
        <ListsWidget4 className='card-xl-stretch mb-5 mb-xl-8' items={5} />
      </div>
    </div>

    <div className='row g-5 gx-xxl-8'>
      <div className='col-xxl-4'>
        <MixedWidget8
          className='card-xxl-stretch mb-xl-3'
          chartColor='success'
          chartHeight='150px'
        />
      </div>
      <div className='col-xxl-8'>
        <TablesWidget5 className='card-xxl-stretch mb-5 mb-xxl-8' />
      </div>
    </div> */}
    </Content>
  </div>
)
}

const DashboardWrapper: FC = () => {

  
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <DashboardPage  />
    </>
  )
}

export {DashboardWrapper}


{/*
 <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
      <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10'>
        <CardsWidget20
          className='h-md-50 mb-5 mb-xl-10'
          description='Active Projects'
          color='#F1416C'
          img={toAbsoluteUrl('media/patterns/vector-1.png')}
        />
        <CardsWidget7
          className='h-md-50 mb-5 mb-xl-10'
          description='Professionals'
          icon={false}
          stats={357}
          labelColor='dark'
          textColor='gray-300'
        />
      </div>

      <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10'>
        <CardsWidget17 className='h-md-50 mb-5 mb-xl-10' />
        <ListsWidget26 className='h-lg-50' />
      </div>

      <div className='col-xxl-6'>
        <EngageWidget10 className='h-md-100' />
      </div>
    </div>

    <div className='row gx-5 gx-xl-10'>
      <div className='col-xxl-6 mb-5 mb-xl-10'>
      </div>

      <div className='col-xxl-6 mb-5 mb-xl-10'>
      </div>
    </div>

    <div className='row gy-5 gx-xl-8'>
      <div className='col-xxl-4'>
        <ListsWidget3 className='card-xxl-stretch mb-xl-3' />
      </div>
      <div className='col-xl-8'>
        <TablesWidget10 className='card-xxl-stretch mb-5 mb-xl-8' /> 
        </div>
        </div>
    
        <div className='row gy-5 g-xl-8'>
          <div className='col-xl-4'>
            <ListsWidget2 className='card-xl-stretch mb-xl-8' />
          </div>
          <div className='col-xl-4'>
            <ListsWidget6 className='card-xl-stretch mb-xl-8' />
          </div>
          <div className='col-xl-4'>
            <ListsWidget4 className='card-xl-stretch mb-5 mb-xl-8' items={5} />
          </div>
        </div>
    
        <div className='row g-5 gx-xxl-8'>
          <div className='col-xxl-4'>
            <MixedWidget8
              className='card-xxl-stretch mb-xl-3'
              chartColor='success'
              chartHeight='150px'
            />
          </div>
          <div className='col-xxl-8'>
            <TablesWidget5 className='card-xxl-stretch mb-5 mb-xxl-8' />
          </div>
        </div>
*/}