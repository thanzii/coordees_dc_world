import { connect } from "react-redux";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import AdminTable from "./components/AdminTable/AdminTable.jsx";
import LoginForm from "./components/LoginForm.jsx";
import Homepage from "./components/Homepage/Homepage.jsx";
import TechnicianForm from "./components/TechnicianForm/TechnicianForm.jsx";

function App({ token }) {
  let routes;
  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/adminView" element={<AdminTable />} />
        <Route path="/technicianForm" element={<TechnicianForm />} />
        <Route
          path="*"
          element={
            <Navigate
              to={
                token.userroles === "Admin" ? "/adminView" : "/technicianForm"
              }
            />
          }
        />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }
  return (
    <>
      {/* <div className="bg-gradient-to-tl from-green-600 via-green-400 to-green-200  w-[100vw] h-[100vh] overflow-auto no-scrollbar"> */}
      <Router>{routes}</Router>
      {/* </div> */}
    </>
  );
}

const mapStateToProps = ({ userModel: { token } }) => ({ token });

export default connect(mapStateToProps)(App);
