import SignButton from '@/components/sign/SignButton'
import { SignInput } from '@/components/sign/SignInput'

const SignUp = () => {
  return (
    <>
      <h1 className="text-center text-3xl font-bold text-primary">Sign up</h1>
      <form className="mt-10 w-80">
        <div className="grid gap-5">
          <SignInput type="email" placeholder="Email" />
          <SignInput type="password" placeholder="Create you password" />
          <div className="grid gap-1 px-5">
            <p className="text-clario-green-50">8 characters or more (no spaces)</p>
            <p className="text-primary">Uppercase and lowercase letters</p>
            <p className="text-clario-red-300">At least one digit</p>
          </div>
        </div>
        <div className="mt-10 flex w-full justify-around">
          <SignButton label={'Sign-up'} />
        </div>
      </form>
    </>
  )
}

export default SignUp
