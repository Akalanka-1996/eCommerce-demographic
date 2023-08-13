import React from "react";
import { useEffect} from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

//   const { user } = useSelector((state) => state.auth);

//   useEffect(() => {
//     if (!user) {
//       navigate("/login");
//     }
//   }, [user, navigate]);

  return (
    <>
      <section className="heading">
        <h1>Welcome</h1>
      </section>

      {/* {user?.userRole === "basic" ? (
        <>
        <RequestForm />
        <RequestTable />
        
        </>
      ) : (
        [user?.userRole === "admin" ? 
        
          <>
          <AdminHeader />
          <AdminTable />
          </>
           : 
          <>
           <PostHeader />
           <PostTable />
          </>
         ]
      )} */}


    </>
  );
};

export default Dashboard;
