import { Link, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { SignInValidation } from '../lib/validation';
import { Button, FormInput } from '../../common/components';
import { useAuth } from '../../common/hooks';

const Login = () => {

  const navigate = useNavigate();
  const { startLogin, isLoading } = useAuth();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: '',
      password: ''
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignInValidation>) {
    const { response, error } = await startLogin(values);

    if (response) {
      navigate("/");
    }

    if (error) {
      toast.error(error.data?.error);
    }
  }

  return (
    <div className="auth__form">
      <div className="auth__form-header">
        <img
          src="/assets/images/logo.svg"
          alt="Snapgram Logo"
          className="auth__form-logo"
        />
        <h2 className="auth__form-title">Log in to your account</h2>
        <p className="auth__form-text">Welcome back! Please enter your details.</p>
      </div>
      <form className="form" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="form__container">
          <div className="form__groups">
            <Controller
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormInput
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={field.value}
                  onChange={field.onChange}
                  label="Email"
                  error={form.formState.errors.email?.message}
                />
              )}
            />
            <Controller
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormInput
                  id="password"
                  type="password"
                  value={field.value}
                  onChange={field.onChange}
                  label="Password"
                  error={form.formState.errors.password?.message}
                />
              )}
            />
          </div>
          <Button
            type="submit"
            title="Log in"
            isLoading={isLoading}
            loadingTitle="Log in..."
          />
          <p className="auth__redirect">
            Don't have an account?
            <Link 
              to="/auth/register"
              className="auth__redirect-link"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login