import {useEffect, useRef, useState} from 'react'
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
import {defaultCreateAppData, ICreateAppData} from './IAppModels'
import {StepperComponent} from '../../../assets/ts/components'
import {KTIcon} from '../../../helpers'
import {Step1} from './steps/Step1'
import {Step2} from './steps/Step2'
import {Step3} from './steps/Step3'
// import {Step4} from './steps/Step4'
// import {Step5} from './steps/Step5'

type Props = {
  show: boolean
  handleClose: () => void
  refresh:(refresh:boolean) => void;
}

const modalsRoot = document.getElementById('root-modals') || document.body

const CreateSchoolModal = ({ show, handleClose,refresh }: Props) => {
  const stepperRef = useRef<HTMLDivElement | null>(null)
  const [ stepper, setStepper ] = useState<StepperComponent | null>(null)
  const [data, setData] = useState<ICreateAppData>(defaultCreateAppData)
  const [hasError, setHasError] = useState(false)
  const [formData, setFormData] =  useState<ICreateAppData | null>(null);
  
console.log(formData);

    const fetchSchools = async () => {
      try {
        const Data = formData?.appBasic;
        const response = await fetch('http://127.0.0.1:5000/api/superadmin/create_school', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            Data
          })
        });
  
        if (!response.ok) {
          throw new Error('Failed to create school');
        }
  
        const data = await response.json();
        console.log('School created successfully:', data);
        handleClose();
        refresh(true);
        
        // Handle success response here
      } catch (error) {
        console.error('Error creating school:', error);
        // Handle error here
      }
    };
  


  
  const loadStepper = () => {
    setStepper(StepperComponent.createInsance(stepperRef.current as HTMLDivElement))
  }
  
  const updateData = (fieldsToUpdate: Partial<ICreateAppData>) => {
    const updatedData = {...data, ...fieldsToUpdate}
    setData(updatedData)
  }

  const checkAppBasic = (): boolean => {
    if (!data.appBasic) {
      return false
    }
    return true
  }
  const handleSumbit = () =>{
    if(!data){
      alert('errir')
    }
    else{
      setFormData(data);
      alert('got ir')
    }
  }

  useEffect(()=>{
    if(formData !== null){
      fetchSchools();
    }
  },[formData])

  const prevStep = () => {
    if (!stepper) {
      return
    }

    stepper.goPrev()
  }

  const nextStep = () => {
    setHasError(false)
    if (!stepper) {
      return
    }

    if (stepper.getCurrentStepIndex() === 1) {
      if (!checkAppBasic()) {
        setHasError(true)
        return
      }
    }

    stepper.goNext()
  }

  return createPortal(
    <Modal
      id='kt_modal_create_app'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-1000px'
      show={show}
      onHide={handleClose}
      onEntered={loadStepper}
      backdrop={true}
    >
      <div className='modal-header'>
        <h2>Create School</h2>
        {/* begin::Close */}
        <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
          <KTIcon className='fs-1' iconName='cross' />
        </div>
        {/* end::Close */}
      </div>

      <div className='modal-body py-lg-10 px-lg-10 border'>
        {/*begin::Stepper */}
        <div
          ref={stepperRef}
          className='stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid'
          id='kt_modal_create_app_stepper'
        >
          {/* begin::Aside*/}
          <div className='d-flex justify-content-center justify-content-xl-start flex-row-auto w-100 w-xl-250px'>
            {/* begin::Nav*/}
            <div className='stepper-nav ps-lg-10'>
              {/* begin::Step 1*/}
              <div className='stepper-item current' data-kt-stepper-element='nav'>
                {/* begin::Wrapper*/}
                <div className='stepper-wrapper'>
                  {/* begin::Icon*/}
                  <div className='stepper-icon w-40px h-40px'>
                    <i className='stepper-check fas fa-check'></i>
                    <span className='stepper-number'>1</span>
                  </div>
                  {/* end::Icon*/}

                  {/* begin::Label*/}
                  <div className='stepper-label'>
                    <h3 className='stepper-title'>Details</h3>

                    <div className='stepper-desc'>General Info</div>
                  </div>
                  {/* end::Label*/}
                </div>
                {/* end::Wrapper*/}

                {/* begin::Line*/}
                <div className='stepper-line h-40px'></div>
                {/* end::Line*/}
              </div>
              {/* end::Step 1*/}

              {/* begin::Step 2*/}
              <div className='stepper-item' data-kt-stepper-element='nav'>
                {/* begin::Wrapper*/}
                <div className='stepper-wrapper'>
                  {/* begin::Icon*/}
                  <div className='stepper-icon w-40px h-40px'>
                    <i className='stepper-check fas fa-check'></i>
                    <span className='stepper-number'>2</span>
                  </div>
                  {/* begin::Icon*/}

                  {/* begin::Label*/}
                  <div className='stepper-label'>
                    <h3 className='stepper-title'>Featuers</h3>

                    <div className='stepper-desc'>Featuers Info</div>
                  </div>
                  {/* begin::Label*/}
                </div>
                {/* end::Wrapper*/}

                {/* begin::Line*/}
                <div className='stepper-line h-40px'></div>
                {/* end::Line*/}
              </div>
              {/* end::Step 2*/}

              {/* begin::Step 3*/}
              <div className='stepper-item' data-kt-stepper-element='nav'>
                {/* begin::Wrapper*/}
                <div className='stepper-wrapper'>
                  {/* begin::Icon*/}
                  <div className='stepper-icon w-40px h-40px'>
                    <i className='stepper-check fas fa-check'></i>
                    <span className='stepper-number'>3</span>
                  </div>
                  {/* end::Icon*/}

                  {/* begin::Label*/}
                  <div className='stepper-label'>
                    <h3 className='stepper-title'>Additional</h3>

                    <div className='stepper-desc'>Additional Info</div>
                  </div>
                  {/* end::Label*/}
                </div>
                {/* end::Wrapper*/}

                {/* begin::Line*/}
                <div className='stepper-line h-40px'></div>
                {/* end::Line*/}
              </div>
              {/* end::Step 3*/}

              {/* begin::Step 4*/}
              {/* <div className='stepper-item' data-kt-stepper-element='nav'>
                <div className='stepper-wrapper'>
                  <div className='stepper-icon w-40px h-40px'>
                    <i className='stepper-check fas fa-check'></i>
                    <span className='stepper-number'>4</span>
                  </div>

                  <div className='stepper-label'>
                    <h3 className='stepper-title'>Other</h3>

                    <div className='stepper-desc'>Others info</div>
                  </div>
                </div>

                <div className='stepper-line h-40px'></div>
              </div> */}
              {/* end::Step 4*/}

              {/* begin::Step 5*/}
              {/* <div className='stepper-item' data-kt-stepper-element='nav'>
                <div className='stepper-wrapper'>
                  <div className='stepper-icon w-40px h-40px'>
                    <i className='stepper-check fas fa-check'></i>
                    <span className='stepper-number'>5</span>
                  </div>

                  <div className='stepper-label'>
                    <h3 className='stepper-title'>Review</h3>

                    <div className='stepper-desc'>Review and Submit</div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          {/* begin::Aside*/}

          {/*begin::Content */}
          <div className='flex-row-fluid py-lg-5 px-lg-15'>
            {/*begin::Form */}
              <form noValidate id='kt_modal_create_app_form'>
                <Step1 data={data} updateData={updateData} hasError={hasError} />
                <Step2 data={data} updateData={updateData} hasError={hasError} />
                <Step3 data={data} updateData={updateData} hasError={hasError} />
                {/* <Step4 data={data} updateData={updateData} hasError={hasError} />
                <Step5 data={data} updateData={updateData} hasError={hasError} /> */}

                {/*begin::Actions */}
                <div className='d-flex flex-stack pt-10'>
                  <div className='me-2'>
                    <button
                      type='button'
                      className='btn btn-lg btn-light-primary me-3'
                      data-kt-stepper-action='previous'
                      onClick={prevStep}
                    >
                      <KTIcon iconName='arrow-left' className='fs-3 me-1' /> Previous
                    </button>
                  </div>
                  <div>
                    <button
                      type='button'
                      className='btn btn-lg btn-primary'
                      data-kt-stepper-action='submit'
                      onClick={() => handleSumbit()}
                    >
                      Submit <KTIcon iconName='arrow-right' className='fs-3 ms-2 me-0' />
                    </button>

                    <button
                      type='button'
                      className='btn btn-lg btn-primary'
                      data-kt-stepper-action='next'
                      onClick={nextStep}
                    >
                      Next Step <KTIcon iconName='arrow-right' className='fs-3 ms-1 me-0' />
                    </button>
                  </div>
                </div>
                {/*end::Actions */}
              </form>
            {/*end::Form */}
          </div>
          {/*end::Content */}
        </div>
        {/* end::Stepper */}
      </div>
    </Modal>,
    modalsRoot
  );
};

export { CreateSchoolModal };
