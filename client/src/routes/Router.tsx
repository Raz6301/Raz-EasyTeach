import React from "react";
import { Routes, Route } from "react-router-dom";
import ROUTES from "./routesModel";

import AboutPage from "../pages/AboutPage";
import ErrorPage from "../pages/ErrorPage";
import RootPage from "../pages/RootPage";
import MyCalendar from "../students/components/MyCalendar";
import SignupPage from "../users/pages/SignupPage";
import LoginPage from "../users/pages/LoginPage";

import CRM from "../users/pages/Crm";
import EditUserPage from "../users/pages/EditUserPage";
import ProfilePage from "../users/pages/ProfilePage";
import Management from "../students/pages/ManagementPage";
import EditStudentsDeatailsPage from "../students/pages/EditStudentsDeatailsPage";
import StatisticPage from "../students/pages/StatisticPage";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.ROOT} element={<RootPage />} />
      <Route path={ROUTES.CALENDAR} element={<MyCalendar />} />

      <Route path={ROUTES.CRM} element={<CRM />} />

      <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route
        path={`${ROUTES.EDIT_USER_PAGE}/:userId`}
        element={<EditUserPage />}
      />
      <Route path={ROUTES.MANAGEMENT} element={<Management />} />
      <Route
        path={`${ROUTES.PROFILE_USER_PAGE}/:userId`}
        element={<ProfilePage />}
      />
      <Route path={ROUTES.STATISTIC} element={<StatisticPage />} />
      <Route
        path={`${ROUTES.EDIT_DETAILS}/:studentId`}
        element={<EditStudentsDeatailsPage />}
      />

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Router;
