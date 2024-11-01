import { Link, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {  SignUpValidation } from '../lib/validation';
import { Button, FormInput } from '../../common/components';
import { useAuth } from '../../common/hooks';
import { toast } from 'react-toastify';

const Register = () => {

  const navigate = useNavigate();
  const { startRegister, isLoading } = useAuth();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignUpValidation>) {
    const { response, error } = await startRegister(values);

    if (response) {
      navigate("/");
    }

    if (error) {
      toast.error(error.data?.error);
    }
  }

  const handleUsernameChange = (value: string) => {
    const formattedValue = value.toLowerCase().replace(/\s+/g, '_');
    form.setValue('username', formattedValue); 
  };

  return (
    <div className="auth__form">
      <div className="auth__form-header">
        <img
          src="/assets/images/logo.svg"
          alt="Snapgram Logo"
          className="auth__form-logo"
        />
        <h2 className="auth__form-title">Create a new account</h2>
        <p className="auth__form-text">To use snapgram, Please enter your details.</p>
      </div>
      <form className="form" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="form__container">
          <div className="form__groups">
            <Controller
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormInput
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={field.value}
                  onChange={field.onChange}
                  label="Name"
                  error={form.formState.errors.name?.message}
                />
              )}
            />
            <Controller
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormInput
                  id="username"
                  type="text"
                  placeholder="johndoe"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                    handleUsernameChange(e.target.value);
                  }}
                  label="Username"
                  error={form.formState.errors.username?.message}
                />
              )}
            />
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
            <Controller
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormInput
                  id="confirmPassword"
                  type="password"
                  value={field.value}
                  onChange={field.onChange}
                  label="Confirm your Password"
                  error={form.formState.errors.confirmPassword?.message}
                />
              )}
            />
          </div>
          <Button
            type="submit"
            title="Sign Up"
            isLoading={isLoading}
            loadingTitle="Signing Up..."
          />
          <p className="auth__redirect">
            Already have an account?
            <Link 
              to="/auth/login"
              className="auth__redirect-link"
            >
              Log In
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Register;