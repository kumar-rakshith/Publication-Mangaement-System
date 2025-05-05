
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// User Import
import UserLogin from "./Pages/UserLogin";
import UserDashboardLayout from "./Layout/DashboardLayout";
import UploadPublication from "./component/UserComponent/UploadPublication";
import ViewStatus from "./component/UserComponent/ViewStatus";
import Viewpublications from "./component/usercomponent/viewpublications";
import UserPublications from "./component/usercomponent/UserPublications";
import PublicationDetail from "./component/usercomponent/PublicationDetails";
import UserPrivateRoute from "./component/UserComponent/PrivateRoute";
import PublicationList from "./component/PublicationList";


// Admin Imports 
import AdminLogin from "./Pages/AdminLogin";
import AdminDashboardLayout from "./Layout/AdminDashboardLayout";
import AdminDepartment from "./component/AdminComponent/AdminDepartment";
import AdminDepartmentInfo from "./component/AdminComponent/AdminDepartmentInfo";
import AdminPublicationDetails from "./component/AdminComponent/AdminPublicationDetails";
import AdminViewPublication from "./component/AdminComponent/AdminViewPublication";
import PrivateRoute from "./component/AdminComponent/PrivateRoute";


import StatusMain from "./component/Internal/StatusMain";
import StatusTrack from "./component/Internal/Statustrack";
import NDepartment from "./component/Internal/Department";
import Upload from "./component/Internal/Upload";


import Test from "./component/Test";


const App = () => {
  return (
    <Router>
      <Routes>

        {/* User Routes */}
        <Route path="/" element={<UserLogin />} />
        <Route
          path="/User"
          element={
            <UserDashboardLayout>
              <UploadPublication />
            </UserDashboardLayout>
          }
        />
        <Route
          path="/view-status"
          element={
            <UserDashboardLayout>
              <ViewStatus />
            </UserDashboardLayout>
          }
        />

        <Route
          path="/view-publications"
          element={
            <UserDashboardLayout>
              <Viewpublications />
            </UserDashboardLayout>
          }
        />

        <Route
          path="/view-publications/:departmentName"
          element={
            <UserDashboardLayout>
              <UserPublications />
            </UserDashboardLayout>
          }
        />

        <Route
          path="/UserPublications/:publication_id"
          element={
            <UserDashboardLayout>
              <PublicationDetail />
            </UserDashboardLayout>
          }
        />



       < Route
          path="/status/:publicationId"
          element={
            <UserDashboardLayout>
              <PublicationList />
            </UserDashboardLayout>
          }
        />


        {/* Admin Routes */}
        <Route
          path="/AdminLogin"
          element={<AdminLogin />}
        />
        <Route
          path="/admin"
          element={

            <AdminDashboardLayout>
              <AdminDepartment />
            </AdminDashboardLayout>

          }
        />
        <Route
          path="/Admin/Department"
          element={
            <AdminDashboardLayout>

            </AdminDashboardLayout>}
        />
        <Route
          path="Admin/Department/:departmentName"
          element={
            <AdminDashboardLayout>
              <AdminDepartmentInfo />
            </AdminDashboardLayout>
          }
        />

        <Route
          path="/Admin/publication/:publication_id"
          element={
            <AdminDashboardLayout>
              <AdminPublicationDetails />
            </AdminDashboardLayout>
          }
        />

        <Route
          path="/Admin/ViewPublication"
          element={
            <AdminDashboardLayout>
              <AdminViewPublication />
            </AdminDashboardLayout>
          }
        />


        <Route
          path="/test"
          element={
            <Test />
          }
        />





        <Route
          path="/Status"
          element={
            <UserDashboardLayout>
              <StatusMain />
            </UserDashboardLayout>
          }
        />
        <Route path="/status/:id" element={
          <UserDashboardLayout>
            <StatusTrack />
          </UserDashboardLayout>
        } />


        <Route path="/department" element={
          <UserDashboardLayout>
            <NDepartment />
          </UserDashboardLayout>
        } />


        <Route path="/upload" element={
          <UserDashboardLayout>
            <Upload />
          </UserDashboardLayout>
        } />
      </Routes>
    </Router>
  );
};

export default App;
