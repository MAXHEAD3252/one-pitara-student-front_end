import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "../../../../../app/pages/StaffPages/FeeDetails/style.css";

const EngageWidget10 = () => {

  const optionsCumulative = {
    chart: {
      type: "bar",
      width: 600, // Set the width of the chart
      height: 200, // Set the height of the chart
    },
    title: {
      text: "",
    },
    subtitle: {
      text: "",
    },
    yAxis: {
      type: "category",
      visible: false, // Hide y-axis
    },
    xAxis: {
      visible: false, // Hide x-axis
    },
    caption: {
      text: "",
    },
    credits: {
      enabled: false, // Remove credits
    },
    legend: {
      enabled: true, // Enable legend
      style: {
        fontFamily: "Manrope",
        fontSize: "14px",
      },
    },
    plotOptions: {
      bar: {
        pointPadding: 0, // Remove space between bars
        groupPadding: 0.0, // Set group padding between bars
        states: {
          hover: {
            enabled: false, // Disable hover effect
          },
        },
        dataLabels: {
          enabled: true,
          inside: false, // Display data labels outside the bars
          align: "right", // Align data labels to the right end of the bars
          x: -10, // Offset data labels by 10 pixels to the left
          format: "{point.y:.0f}", // Format data labels
          style: {
            color: "white", // Set the color of the data labels
            fontFamily: "Manrope",
            fontSize: "14px",
          },
        },
      },
    },
    series: [{
      name: 'Norway',
      data: [{ y: 50.2, z: 335504 }],
      showInLegend: true
  }, {
      name: 'Denmark',
      data: [{ y: 42, z: 277339 }],
      showInLegend: true
  }, {
      name: 'Belgium',
      data: [{ y: 39.2, z: 421611 }],
      showInLegend: true
  }],
  };

  
  return(
  <div style={{ height: "360px", width: "100%",border: "1px solid #F2F4F5",}}>
    <div className="card-body d-flex flex-column justify-content-between  bgi-no-repeat bgi-size-cover bgi-position-x-center pb-0">
      <div style={{ display: "flex", padding: "10px 18px" }}>
        <span
          style={{
            fontSize: "16px",
            fontWeight: "600",
            fontStyle: "normal",
            color: "#000",
            fontFamily: "Manrope",
          }}
        >
          Financial
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <div style={{ display: "flex", gap: "20px", padding: "5px" }}>
          <div
            style={{
              height: "90px",
              width: "200px",
              display:'flex',
              flexDirection:'column',
              backgroundColor: "#1F3259",
              borderRadius: "16px",
              padding: "10px 15px", 
              justifyContent:'space-between'
            }}
          >
            <div>
              <span
                style={{
                  color: "#FFFFFF",
                  fontWeight: "600",
                  lineHeight: "19.12px",
                  fontSize: "16px",
                  fontFamily: "Manrope",
                }}
              >
                
                % Fee Collected
                
              </span>
            </div>
            <div className="d-flex align-items-center" style={{gap:'10px'}}>
              <span
                style={{
                  color: "#A7FFB0",
                  fontWeight: "700",
                  fontSize: "30px",
                  lineHeight: "36px",
                  fontFamily: "Manrope",
                }}
              >
                80%
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="29" viewBox="0 0 24 29" fill="none">
<path d="M13.0607 0.939339C12.4749 0.353552 11.5251 0.353552 10.9393 0.939339L1.3934 10.4853C0.807611 11.0711 0.807611 12.0208 1.3934 12.6066C1.97919 13.1924 2.92893 13.1924 3.51472 12.6066L12 4.12132L20.4853 12.6066C21.0711 13.1924 22.0208 13.1924 22.6066 12.6066C23.1924 12.0208 23.1924 11.0711 22.6066 10.4853L13.0607 0.939339ZM13.5 29L13.5 2H10.5L10.5 29H13.5Z" fill="#26C663"/>
</svg>
            </div>
          </div>
          <div
           style={{
            height: "90px",
            width: "200px",
            display:'flex',
            flexDirection:'column',
            backgroundColor: "#F2F6FF",
            borderRadius: "16px",
            padding: "10px 15px", 
            justifyContent:'space-between'
          }}
          >
            <div>
              <span
                style={{
                  color: "#000",
                  fontWeight: "600",
                  lineHeight: "19.12px",
                  fontSize: "16px",
                  fontFamily: "Manrope",
                }}
              >
                No. Of Inquires
              </span>
            </div>
            <div className="d-flex align-items-center" style={{gap:'10px'}}>
              <span
                style={{
                  color: "#000",
                  fontWeight: "700",
                  fontSize: "30px",
                  lineHeight: "36px",
                  fontFamily: "Manrope",
                }}
              >
                80
              </span>
              <span
                style={{
                  color: "#FFF",
                  backgroundColor:'rgba(38, 198, 99, 0.75)',
                  fontWeight: "700",
                  lineHeight: "16.39px",
                  fontSize: "12px",
                  fontFamily: "Manrope",
                  padding:'2px',
                  borderRadius:'8px',
                  width:'36px',
                  alignItems:'center',
                  textAlign:'center'
                }}
              >
                +5%
              </span>
            </div>
          </div>
          
          <div
           style={{
            height: "90px",
            width: "200px",
            display:'flex',
            flexDirection:'column',
            backgroundColor: "#F2F6FF",
            borderRadius: "16px",
            padding: "10px 15px", 
            justifyContent:'space-between'
          }}
          >
            <div>
              <span
                style={{
                  color: "#000",
                  fontWeight: "600",
                  lineHeight: "19.12px",
                  fontSize: "16px",
                  fontFamily: "Manrope",
                }}
              >
                No. of Admissions
              </span>
            </div>
            <div className="d-flex align-items-center" style={{gap:'10px'}}>
              <span
                style={{
                  color: "#000",
                  fontWeight: "700",
                  fontSize: "30px",
                  lineHeight: "36px",
                  fontFamily: "Manrope",
                }}
              >
                80
              </span>
              <span
                style={{
                  color: "#FFF",
                  backgroundColor:'rgba(38, 198, 99, 0.75)',
                  fontWeight: "700",
                  lineHeight: "16.39px",
                  fontSize: "12px",
                  fontFamily: "Manrope",
                  padding:'2px',
                  borderRadius:'8px',
                  width:'36px',
                  alignItems:'center',
                  textAlign:'center'
                }}
              >
                +5%
              </span>
            </div>
          </div>
          
          <div
           style={{
            height: "90px",
            width: "200px",
            display:'flex',
            flexDirection:'column',
            backgroundColor: "#F2F6FF",
            borderRadius: "16px",
            padding: "10px 15px", 
            justifyContent:'space-between'
          }}
          >
            <div>
              <span
                style={{
                  color: "#000",
                  fontWeight: "600",
                  lineHeight: "19.12px",
                  fontSize: "16px",
                  fontFamily: "Manrope",
                }}
              >
                Conversion Ratio
              </span>
            </div>
            <div className="d-flex align-items-center" style={{gap:'10px'}}>
              <span
                style={{
                  color: "#000",
                  fontWeight: "700",
                  fontSize: "30px",
                  lineHeight: "36px",
                  fontFamily: "Manrope",
                }}
              >
                20%
              </span>
              <span
                style={{
                  color: "#FFF",
                  backgroundColor:'#FF66A1',
                  fontWeight: "700",
                  lineHeight: "16.39px",
                  fontSize: "12px",
                  fontFamily: "Manrope",
                  padding:'2px',
                  borderRadius:'8px',
                  width:'36px',
                  alignItems:'center',
                  textAlign:'center'
                }}
              >
                -4%
              </span>
            </div>
          </div>
          
        </div>
        <div></div>
      </div>
      <div className="card-body">
      <HighchartsReact
            highcharts={Highcharts}
            options={optionsCumulative}
          />
      </div>
    </div>
  </div>
  )
}

export { EngageWidget10 };

{
  /*
<div
      className='card-body d-flex flex-column justify-content-between mt-9 bgi-no-repeat bgi-size-cover bgi-position-x-center pb-0'
      style={{
        backgroundPosition: '100% 50%',
        backgroundImage: `url('${toAbsoluteUrl('media/stock/900x600/42.png')}')`,
      }}
    >
      <div className='mb-10'>
        <div className='fs-2hx fw-bold text-gray-800 text-center mb-13'>
          <span className='me-2'>
            Try our all new Enviroment with
            <br />
            <span className='position-relative d-inline-block text-danger'>
              <Link
                to='/crafted/pages/profile/overview'
                className='text-danger
              opacity-75-hover'
              >
                Pro Plan
              </Link>

              <span className='position-absolute opacity-15 bottom-0 start-0 border-4 border-danger border-bottom w-100'></span>
            </span>
          </span>
          for Free
        </div>

        <div className='text-center'>
          <a href='#'>Upgrade Now</a>
        </div>
      </div>
      <img
        className='mx-auto h-150px h-lg-200px  theme-light-show'
        src={toAbsoluteUrl('media/illustrations/misc/upgrade.svg')}
        alt=''
      />
      <img
        className='mx-auto h-150px h-lg-200px  theme-dark-show'
        src={toAbsoluteUrl('media/illustrations/misc/upgrade-dark.svg')}
        alt=''
      /> 
      </div>
*/
}

{/* 
Highcharts.chart('container', {
    chart: {
        type: 'bar',
        width: 600, // Set the width of the chart
        height: 200, // Set the height of the chart
    },
    title: {
        text: ''
    },
    subtitle: {
        text: ''
    },
    yAxis: {
        type: 'category',
        visible: false // Hide y-axis
    },
    xAxis: {
        visible: false // Hide x-axis
    },
    caption: {
        text: ''
    },
    credits: {
        enabled: false // Remove credits
    },
    legend: {
        enabled: true // Enable legend
    },
    plotOptions: {
        bar: {
            pointPadding: 0, // Remove space between bars
            groupPadding: 0.0, // Set group padding between bars
            states: {
                hover: {
                    enabled: false // Disable hover effect
                }
            },
            dataLabels: {
                enabled: true,
                inside: false, // Display data labels outside the bars
                align: 'right', // Align data labels to the right end of the bars
                x: -10, // Offset data labels by 5 pixels to the right
                format: '{point.y:.0f}', // Format data labels
                style: {
                    color: 'white' // Set the color of the data labels
                }
            }
        }
    },
    series: [{
        name: 'Norway',
        data: [{ y: 50.2, z: 335504 }],
        showInLegend: true
    }, {
        name: 'Denmark',
        data: [{ y: 42, z: 277339 }],
        showInLegend: true
    }, {
        name: 'Belgium',
        data: [{ y: 39.2, z: 421611 }],
        showInLegend: true
    }],
    tooltip: {
        pointFormat: 'Labor Costs: <b>€ {point.y}/h</b><br>' +
            'GDP: <b>€ {point.z} million</b><br>'
    },
    borderRadius: 3,
    colorByPoint: true
});

*/}