import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          <div>
            {!isLoginForm && (
              <>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </>
            )}
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email ID:</span>
              </div>
              <input
                type="text"
                value={emailId}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                value={password}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center m-2">
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>

          <p
            className="m-auto cursor-pointer py-2"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm
              ? "New User? Signup Here"
              : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
// import { useState } from "react";
// import login from "../../img/login.jpg"
// import axios from "axios";
// import { ContainerWithChildren } from "postcss/lib/container";
// import { useDispatch } from "react-redux";
// import { addUser } from "../utils/userSlice";
// import { useNavigate } from "react-router-dom";
// import { BASE_URL } from "../utils/constants";

// const Login = () => {
//     const [emailId,setEmailId]=useState("");
//     const [password,setPassword]=useState("");
//     const[firstName,setFirstName]=useState("");
//     const[lastName,setLastName]=useState("");
//     const[error,setError]=useState("");
//     const [isLoggedIn,setIsLoggedIn]=useState(false);
//   const dispatch=useDispatch();
//   const navigate=useNavigate();
  
//   const handleLogin = async () => {
//     try {
//       const res = await axios.post(
//         BASE_URL + "/login",
//         {
//           emailId,
//           password,
//         },
//         { withCredentials: true }
//       );
//       dispatch(addUser(res.data));
//       return navigate("/");
//     } catch (err) {
//       setError(err?.response?.data || "Something went wrong");
//     }
//   };
  
//   const handleSignup=async()=>{
//       try{
//         const res=await axios.post(BASE_URL+"/signup",{firstName,lastName,emailId,password},{withCredentials:true});
//         dispatch(addUser(res.data.data));
//         navigate("/profile")
//       }catch(error){
//         console.log(error);
        
//       }
//   }
//     const handleSubmit=async()=>{
//         try{
//             const res=await axios.post(BASE_URL+"/login",
//                 {
//                     emailId,password
//                 },{withCredentials:true}
//             )
//            dispatch(addUser(res.data.data)); 
//           //  console.log(res.data.data);
//           return navigate("/")        
//         }catch(error){
//           setError(error?.response?.data) 
//         }
//     }
//   return (
//     <div className="flex  justify-center p-5 my-10">
//       <div className="card card-side bg-base-100 shadow-xl  w-2/4 ">
//         <figure>
//           <img src={login} alt="Movie" className="object-cover " />
//         </figure>
//         <div className="card-body  w-2/3">
//           <h2 className="card-title font-semibold mx-auto ">{isLoggedIn?"Sign up":"Login"}</h2>
//           <label className="form-control w-full max-w-xs">
//             {isLoggedIn&&<><div className="label">
//               <span className="label-text">Firstname </span>
//             </div>
//             <input
//               type="text"
//               placeholder="Enter your first name"
//               value={firstName}
//               onChange={(e)=>setFirstName(e.target.value)}
//               className="input input-bordered w-full max-w-xs"
//             />
//             <div className="label">
//               <span className="label-text">Lastname </span>
//             </div>
//             <input
//               type="text"
//               placeholder="Enter your last name"
//               value={lastName}
//               onChange={(e)=>setLastName(e.target.value)}
//               className="input input-bordered w-full max-w-xs"
//             /></>}
//             <div className="label">
//               <span className="label-text">Enter your Email </span>
//             </div>
//             <input
//               type="text"
//               placeholder="Enter email"
//               value={emailId}
//               onChange={(e)=>setEmailId(e.target.value)}
//               className="input input-bordered w-full max-w-xs"
//             />
//             <div className="label">
//               <span className="label-text">Enter your password</span>
//             </div>
//             <input
//               type="password"
//               placeholder="Enter password"
//               value={password}
//               onChange={(e)=>setPassword(e.target.value)}
//               className="input input-bordered w-full max-w-xs"
//             />
//           </label>
//           <p className="text-red-500">{error}</p>
//           <div className="card-actions justify-center">
//             <button className="btn btn-primary my-3 " onClick={isLoggedIn?handleSignup:handleSubmit}>{isLoggedIn?"Sign up":"Login"}</button>
//           </div>
//           <button onClick={(value)=>setIsLoggedIn((value)=>!value)}>{isLoggedIn?"Click here for login":"New User?Click here for signup"}</button>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Login;