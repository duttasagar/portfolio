// import Header from "../components/Header";
// import Sidebar from "../components/Sidebar";
// const AdminLayout = ({ children }) => {
//   return (
//     <div className="flex">
//       <Sidebar />

//       <div className="flex-1">
//         <div className="p-5">
//           {children}
//         </div>
//       </div>
//     </div>

//   );
// };

// export default AdminLayout;


import Sidebar from "../components/Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <div className="p-5 pt-20 md:pt-5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;