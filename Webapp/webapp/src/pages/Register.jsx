import Form from "../components/Form"

function Register() {
    return (<div><Form route="/api/user/register/" method="register" />
    <a href="/login" className="link"> <h1 className="link">Already have a account click here</h1></a>
    </div>)
}

export default Register