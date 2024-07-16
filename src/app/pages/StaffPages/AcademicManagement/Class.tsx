import { FC } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { useIntl } from "react-intl";
import React from 'react';
import { useLocation } from 'react-router-dom';
import { TablesWidget48 } from '../../../../_metronic/partials/widgets/tables/TablesWidget48';
import { HeaderWrapper } from '../../../../../src/_metronic/layout/components/header_staff/HeaderWrapper';
import { Content } from "../../../../_metronic/layout/components/content";



const ClassPage: FC = () => {
  return <div className=''>
    <HeaderWrapper toggleView={() => {}} />
      <Content>
        <TablesWidget48 classId={""}/>
        </Content>
  </div>;
};

const Class: FC = () => {
  const intl = useIntl();
  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.Class" })}
      </PageTitle>
      <ClassPage />
    </>
  );
};


export { Class };
