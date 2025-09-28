'use client'
import FooterLink from "@/components/forms/FooterLink";
import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<SignUpFormData>({
    defaultValues: {
      email: '',
      password: '',
    }, mode: 'onBlur'
  });

  const onSubmit: SubmitHandler<SignUpFormData> = async (data: SignUpFormData) => {
    try {
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  };
  return (
    <>
      <h1 className="form-title">Sign in to your account</h1>
      <form onSubmit={handleSubmit(onSubmit)}
        className="space-y-5">
        <InputField
          name="email"
          label="Email"
          placeholder="name@email.com"
          register={register}
          error={errors.email}
          validation={{ required: "Email is required", pattern: /^\w+@\w+\.\w+$/, message: 'Email address is required' }}
        />
        <InputField
          name="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
          register={register}
          error={errors.password}
          validation={{ required: "Please enter a valid password", minLength: 8 }}
        />

        <Button type="submit" disabled={isSubmitting}
          className="yellow-btn w-full mt-5"
        >
          {isSubmitting ? 'Signing In' : 'Sign in'}
        </Button>

        <FooterLink
          text='Don&apos;t have an account?'
          linkText="Create An Account"
          href="/sign-up"
        />

      </form>
    </>
  )
}

export default SignInPage