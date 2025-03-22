import FormInput from '@/components/form/form-input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useChangePasswordMutation } from '@/redux/features/auth/authApi';
import { passwordValidationSchema } from '@/utils/validations/auth-validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

interface IProps {
  showChangePasswordDialog: boolean;
  setShowChangePasswordDialog: (status: boolean) => void;
}

const ChangePasswordDialog = ({
  showChangePasswordDialog,
  setShowChangePasswordDialog,
}: IProps) => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  // Validation schema
  const validationSchema = z
    .object({
      oldPassword: passwordValidationSchema,
      password: passwordValidationSchema,
      confirmPassword: passwordValidationSchema,
    })
    .refine((formData) => formData.password === formData.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    });
  const formMethods = useForm<z.infer<typeof validationSchema>>({
    defaultValues: {
      oldPassword: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = (values: z.infer<typeof validationSchema>) => {
    toast.loading('Changing password...', { id: 'change-password' });
    changePassword({
      newPassword: values.password,
      oldPassword: values.oldPassword,
    })
      .unwrap()
      .then((response) => {
        console.log({ response });

        formMethods.reset();
        setShowChangePasswordDialog(false);
        toast.success(response?.message || 'Password changed successfully', {
          id: 'change-password',
        });
      })
      .catch((error) => {
        console.log({ error });
        toast.error(error?.data?.message || 'Failed to change password', {
          id: 'change-password',
        });
      });
  };

  return (
    <Dialog
      open={showChangePasswordDialog}
      onOpenChange={setShowChangePasswordDialog}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription className="sr-only">
            Change Password
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(onSubmit)}>
            <div className="space-y-4 mb-4">
              <FormInput
                disabled={isLoading}
                type="password"
                name="oldPassword"
                label="Old Password"
                placeholder="Enter your old password"
              />
              <FormInput
                disabled={isLoading}
                type="password"
                name="password"
                label="New password"
                placeholder="Enter your new password"
              />
              <FormInput
                disabled={isLoading}
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Enter your password again to confirm"
              />
            </div>
            <DialogFooter>
              <Button
                disabled={isLoading}
                type="button"
                variant="outline"
                onClick={() => setShowChangePasswordDialog(false)}
              >
                Cancel
              </Button>
              <Button
                disabled={isLoading}
                type="submit"
                className="bg-red-500 hover:bg-red-600"
              >
                Change password
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;
