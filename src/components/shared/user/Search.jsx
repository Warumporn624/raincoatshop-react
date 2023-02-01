// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

// const Search = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { search } = useSelector((state) => ({ ...state }));
//   const { text } = search;

//   const handleChange = (e) => {
//     // console.log(e.target.value)
//     dispatch({
//       type: "SEARCH_QUERY",
//       payload: { text: e.target.value },
//     });
//   };

//   const hadleSubmit = (e) => {
//     e.preventDefault();
//     navigate('/shop?' + text);
//   };

//   return (
//     <form
//       onSubmit={hadleSubmit}
//       className="flex items-center w-full px-2 sm:px-8 xl:w-2/5"
//     >
//       <input
//         onChange={handleChange}
//         className="w-full p-2 px-4 text-sm text-gray-600 border border-r-0 rounded-l outline-none focus:ring focus:ring-blue-200"
//         type="search"
//         placeholder="ค้นหาสินค้าในร้าน"
//       />
//       <button className="p-2 font-bold text-white bg-yellow-500 rounded-r sm:px-6 hover:bg-black">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="w-6 h-6"
//           viewBox="0 0 20 20"
//           fill="currentColor"
//         >
//           <path
//             fillRule="evenodd"
//             d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
//             clipRule="evenodd"
//           />
//         </svg>
//       </button>
//     </form>
//   );
// };

// export default Search;
