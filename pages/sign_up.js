import { withApollo } from '../lib/apollo'
import SignUpForm from '../components/SignUp/Form'

const SignUp = () => (
  <div>
    <SignUpForm />
  </div>
);

export default withApollo(SignUp);
