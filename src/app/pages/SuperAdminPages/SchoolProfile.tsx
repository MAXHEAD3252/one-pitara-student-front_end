// import React, { useState } from "react";
// import { FC } from "react";
import { useIntl } from "react-intl";
import { PageTitle } from "../../../_metronic/layout/core";
import { Content } from "../../../_metronic/layout/components/content";
import { HeaderWrapper } from "../../../_metronic/layout/components/header_staff";
// import { useEffect, useState } from "react";
import { CardsWidget5, TablesWidget44 } from "../../../_metronic/partials/widgets";
import { useParams } from "react-router-dom";
import { TablesWidget42 } from "../../../_metronic/partials/widgets/tables/TablesWidget42";
import { TablesWidget43 } from "../../../_metronic/partials/widgets/tables/TablesWidget43";




export const SchoolProfilePage = () => {
  const { schoolId } = useParams();

  

//   useEffect(() => {
   
//   }, []);

  // const editDetails = (id) => {
  //   // Navigate to a page/modal to edit details of the academy with the given ID
  // };

  // const deleteacademy = (id) => {
  //   // Implement logic to delete the academy with the given ID
  // };



 
  return (
    <div className="bg-white">
      <HeaderWrapper toggleView={() => {}} />

      <Content>
        <div className="row g-5 g-xl-7 mb-md-5 mb-xl-10">
          <div className="col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className="h-md-100">
              <CardsWidget5 schoolId={schoolId} />
            </div>
          </div>
          <div className="col-md-12 col-lg-12 col-xl-12 col-xxl-6">
            <div className="h-md-100">
              <TablesWidget42 schoolId={schoolId} />
            </div>
          </div>
          <div className="col-md-12 col-lg-12 col-xl-12 col-xxl-6">
            <div className="h-md-100">
              <TablesWidget43 schoolId={schoolId} />
            </div>
          </div>
          <div className="col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <div className="h-md-100">
              <TablesWidget44 schoolId={schoolId} />
            </div>
          </div>
        </div>
      </Content>
    </div>
  );
};

const SchoolProfile = () => {
  const intl = useIntl();

  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.HOMEWORK" })}
      </PageTitle>

      <HeaderWrapper toggleView={() => {}} />
      <SchoolProfilePage />
    </>
  );
};

export { SchoolProfile };
