import { withApollo } from '../lib/apollo'
import LoginForm from '../components/Login/Form'

const Login = () => (
  <div>
    <LoginForm />
  </div>
);

export default withApollo(Login);
