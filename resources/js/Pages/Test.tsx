// import { Head } from "@inertiajs/react"
// import FeaturedCard from "../Components/FeaturedCard"
// import TestimonialCard from "../Components/TestimonialCard"
// import MainLayout from "../Layouts/MainLayout"
// import HowItWorks from "../Components/HowItWorks"
// import '../css/home.css'
// import communityIcon from '../../images/community-icon.svg'
// import partnersIcon from '../../images/partners.svg'
// import productivityIcon from '../../images/productivity.svg'
// import heroimage2 from '../../images/heorsection.png'

// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";




// export default function Home() {
//     const [selected, setSelected] = useState("Select an option");

//     const options = [
//         { label: "Option 1", extra: "Extra 1" },
//         { label: "Option 2", extra: "Extra 2" },
//         { label: "Option 3", extra: "Extra 3" },
//     ];

//     const handleSelect = (option) => {
//         setSelected(option.label);
//         // Do something with option.label or option.extra if needed
//     };
//     return (
//         <MainLayout>
//             <Head title="Event Central" />

//             <main>
//                 <div className="dropdown w-100">
//                     <button
//                         className="btn btn-outline-primary dropdown-toggle w-100 text-start"
//                         type="button"
//                         data-bs-toggle="dropdown"
//                         aria-expanded="false"
//                     >
//                         {selected}
//                     </button>
//                     <ul className="dropdown-menu w-100">
//                         {options.map((option, index) => (
//                             <li key={index}>
//                                 <button
//                                     className="dropdown-item d-flex justify-content-between align-items-center"
//                                     onClick={() => handleSelect(option)}
//                                     type="button"
//                                 >
//                                     <span>{option.label}</span>
//                                     <span className="text-muted small">{option.extra}</span>
//                                 </button>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </main>
//         </MainLayout>
//     )
// }

