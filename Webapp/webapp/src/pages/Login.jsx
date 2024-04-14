import Form from "../components/Form"


function Login() {
    return (<div><Form route="/api/token/" method="login" />
     <a href="/register" className="link"> <h1 className="link">Doesn't have a account click here</h1></a>
  
    </div>)
}

export default Login