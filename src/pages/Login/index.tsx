import AuthCard from '@/components/auth-cards/auth-card';
import FormInput from '@/components/form/form-input';
import Container from '@/components/layouts/main-layout/container';
import { Button } from '@/components/ui/button';
import { FormProvider, useForm } from 'react-hook-form';

const LoginPage = () => {
  const formMethods = useForm();
  const onSubmit = () => {};
  return (
    <Container>
      <div className="py-20 w-full flex justify-center">
        <AuthCard
          title={'Login to your account'}
          backButtonLabel="Don't have an account? Sign up"
          backButtonHref="/sign-up"
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
