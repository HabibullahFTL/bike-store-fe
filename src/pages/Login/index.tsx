import AuthCard from '@/components/auth-cards/auth-card';
import FormInput from '@/components/form/form-input';
import Container from '@/components/layouts/main-layout/container';
import { Button } from '@/components/ui/button';
import { loginValidationSchema } from '@/lib/validations/auth-validations';
import { useLoginMutation } from '@/redux/features/auth/authApi';
import { selectAuth, setUser } from '@/redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const redirectTo = queryParams.get('to') || '/';

  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);

  const [loginMutation] = useLoginMutation();

  const formMethods = useForm<z.infer<typeof loginValidationSchema>>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginValidationSchema),
  });

  const onSubmit = async (values: z.infer<typeof loginValidationSchema>) => {
    toast.loading('Logging in to your account...', { id: 'login' });

    try {
      const response = await loginMutation(values).unwrap();
      if (response?.success) {
        dispatch(
          setUser({
            user: response?.data?.user,
            token: response?.data?.access_token,
          })
        );
        navigate(redirectTo);
        toast.success(response.message || 'Logged in successfully.', {
          id: 'login',
          duration: 5000,
        });
      }
    } catch (error) {
      toast.error(
        (error as { data: { message: string } })?.data?.message ||
          'Something went wrong',
        {
          id: 'login',
          duration: 3000,
        }
      );
    }
  };

  useEffect(() => {
    if (user?._id) {
      navigate(redirectTo);
    }
  }, [navigate, user?._id, redirectTo]);

  return (
    <Container>
      <div className="py-20 w-full flex justify-center">
        <AuthCard
          title={'Login to your account'}
          backButtonLabel="Don't have an account? Sign up"
          backButtonHref="/registration"
        >
          <FormProvider {...formMethods}>
            <form
              onSubmit={formMethods.handleSubmit(onSubmit)}
              className="space-y-2"
            >
              {/* Login inputs */}
              <div className="space-y-4">
                <FormInput
                  name="email"
                  label="Email"
                  placeholder="bahar@example.com"
                  type="email"
                />
                <FormInput
                  name="password"
                  label="Password"
                  placeholder="Your password"
                  type="password"
                />
              </div>
              <div className="mt-5">
                <Button className="w-full dark:bg-brand" size={'lg'}>
                  Login
                </Button>
              </div>
            </form>
          </FormProvider>
        </AuthCard>
      </div>
    </Container>
  );
};

export default LoginPage;
