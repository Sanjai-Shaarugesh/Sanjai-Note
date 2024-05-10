import Form from "../components/Form"
import img from "../assets/s.png"

function Register() {
    return (<div ><Form route="/api/user/register/" method="register" />
  <div className="flex justify-center items-center h-screen:10hv ">
  <a href="/login" className="inline-flex items-center justify-center p-5 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
        
        <img aria-hidden="true" className="w-5 h-5 me-3" src={img} alt="Icon" />
        <span className="w-full">Already have an account click here.</span>
      
        <svg className="w-4 h-4 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
    </svg>
      </a></div>

    </div>)
}

export default Register