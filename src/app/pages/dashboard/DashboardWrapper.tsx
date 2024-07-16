import {FC} from 'react'
import {useIntl} from 'react-intl'
// import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {PageTitle} from '../../../_metronic/layout/core'
import { EngageWidget10, EngageWidget11 } from '../../../_metronic/partials/widgets'
import { ToolbarDashBoard } from '../../../_metronic/layout/components/toolbar/toolbars/ToolbarDashBoard'
import { Content } from '../../../_metronic/layout/components/content'
// import {useAuth} from '../../../../core/Auth'
import {useAuth} from '../../modules/auth/core/Auth'
import { HeaderWrapper } from '../../../_metronic/layout/components/header_staff'
// import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import {TablesWidget52} from '../../../_metronic/partials/widgets/tables/TablesWidget52'

const localizer = momentLocalizer(moment)
 
// const handleToggle = (value : boolean)=>{
//   console.log(value);
  
// }
const DashboardPage: FC=() => {
  const user  = useAuth();
  
 return (

  <div className="bg-white">
          <HeaderWrapper toggleView={() => {}} />
    {/* <ToolbarDashBoard  /> */}
    <Content>
    <div className='row g-5 g-xl-5 mb-10' style={{maxHeight:'160px'}}>
      <div className='col-xxl-3'>
      <EngageWidget10 title={"No. of Students"} number={850} image={"students"} />
      </div>

      <div className='col-xxl-3'>
      <EngageWidget10 title={"No. of Teacher"} number={150} image={"teachers"} />
      </div>
      <div className='col-xxl-3'>
      <EngageWidget10 title={"Monthly Fees Collection"} number={"₹24,30,800"} image={"fees"} />
      </div>

      <div className='col-xxl-3'>
      <EngageWidget10 title={"Monthly Expense"} number={"₹5,32,200"} image={"expense"} />
      </div>
    </div>

    <div className='row'>
      <div className='col-xxl-8 mb-5 mb-xl-10'>
      <Calendar
      localizer={localizer}
      // events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 620 }}
    />
      </div>

      <div className='col-xxl-4 mb-5 mb-xl-10'>
        <TablesWidget52 />
      </div>
    </div>

    {/* <div className='row gy-5 gx-xl-8'>
      <div className='col-xxl-4'>
        <ListsWidget3 className='card-xxl-stretch mb-xl-3' />
      </div>
      <div className='col-xl-8'>
        <TablesWidget10 className='card-xxl-stretch mb-5 mb-xl-8' />
      </div>
    </div> */}

    {/* <div className='row gy-5 g-xl-8'>
      <div className='col-xl-4'>
        <ListsWidget2 className='card-xl-stretch mb-xl-8' />
      </div>
      <div className='col-xl-4'>
        <ListsWidget6 className='card-xl-stretch mb-xl-8' />
      </div>
      <div className='col-xl-4'>
        <ListsWidget4 className='card-xl-stretch mb-5 mb-xl-8' items={5} />
      </div>
    </div> */}

    {/* <div className='row g-5 gx-xxl-8'>
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