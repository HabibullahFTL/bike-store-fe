import AuthCard from '@/components/auth-cards/auth-card';
import FormInput from '@/components/form/form-input';
import Container from '@/components/layouts/main-layout/container';
import { Button } from '@/components/ui/button';
import { useRegistrationMutation } from '@/redux/features/auth/authApi';
import { signupValidationSchema } from '@/utils/validations/auth-validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const RegistrationPage = () => {
  const [signupMutation] = useRegistrationMutation();

  const navigate = useNavigate();

  const formMethods = useForm<z.infer<typeof signupValidationSchema>>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(signupValidationSchema),
  });

  const onSubmit = async (values: z.infer<typeof signupValidationSchema>) => {
    toast.loading('Creating an account...', { id: 'create-account' });

    try {
      const response = await signupMutation(values).unwrap();
      if (response?.success) {
        toast.success(
          `${
            response.message || 'Your account created successfully.'
          } Login now`,
          {
            id: 'create-account',
            duration: 5000,
          }
        );
        navigate('/login');
      }
    } catch (error) {
      toast.error(
        (error as { data: { message: string } })?.data?.message ||
          'Something went wrong',
        {
          id: 'create-account',
          duration: 3000,
        }
      );
    }
  };

  return (
    <Container>
      <div className="py-20 w-full flex justify-center">
        <AuthCard
          title={'Create an account'}
          backButtonLabel="Already have an account? Login"
          backButtonHref="/login"
        >
          <FormProvider {...formMethods}>
            <form
              onSubmit={formMethods.handleSubmit(onSubmit)}
              className="space-y-2"
            >
              {/* Login inputs */}
              <div className="space-y-4">
                <FormInput
                  name="name"
                  label="Name"
                  placeholder="Enter your name"
                />
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
                <Button
                  type="submit"
                  className="w-full dark:bg-brand"
                  size={'lg'}
                >
                  Create
                </Button>
              </div>
            </form>
          </FormProvider>
        </AuthCard>
      </div>
    </Container>
  );
};

export default RegistrationPage;
