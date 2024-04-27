// import React, { useState, useEffect } from 'react';
// import './App.css';

// const XPagination = () => {
//   const [members, setMembers] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     fetchMembers();
//   }, [currentPage]);

//   const fetchMembers = async () => {
//     try {
//       const response = await fetch(
//         'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
//       );
//       if (!response.ok) {
//         throw new Error('Failed to fetch data');
//       }
//       const data = await response.json();
//       const pageSize = 10;
//       const startIndex = (currentPage - 1) * pageSize;
//       const endIndex = Math.min(startIndex + pageSize, data.length);
//       const membersOnPage = data.slice(startIndex, endIndex);
//       setMembers(membersOnPage);
//       setTotalPages(Math.ceil(data.length / pageSize));
//     } catch (error) {
//       alert('Failed to fetch data');
//     }
//   };

//   const handleNextPage = () => {
//     setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
//   };

//   const handlePreviousPage = () => {
//     setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
//   };

//   return (
//     <div className="pagination-container">
//       <h2 className="heading">Employee Data Table</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Role</th>
//           </tr>
//         </thead>
//         <tbody>
//           {members.map((member, index) => (
//             <tr key={index}>
//               <td>{member.name}</td>
//               <td>{member.email}</td>
//               <td>{member.role}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="pagination-buttons">
//         <button disabled={currentPage === 1} onClick={handlePreviousPage}>
//           Previous
//         </button>
//         <span>Page {currentPage} of {totalPages}</span>
//         <button disabled={currentPage === totalPages} onClick={handleNextPage}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default XPagination;
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const Pagination = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      setEmployees(response.data);
      setTotalPages(Math.ceil(response.data.length / 10));
    } catch (error) {
      alert("Failed to fetch data");
      console.error("Error fetching data:", error);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * 10;
  const endIndex = Math.min(startIndex + 10, employees.length);

  return (
    <div>
      <h2 className="heading">Employee Data Table</h2>
      <table>
        <thead>
          <tr>
            <th className="left-align">ID</th>
            <th className="left-align">Name</th>
            <th className="left-align">Email</th>
            <th className="left-align">Role</th>
          </tr>
        </thead>
        <tbody>
          {employees.slice(startIndex, endIndex).map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-container">
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <span className="currentPage">{currentPage}</span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
