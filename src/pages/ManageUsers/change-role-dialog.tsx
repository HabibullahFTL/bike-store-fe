import FormInput from '@/components/form/form-input';
import FormSelect from '@/components/form/form-select';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { IUserDetails } from '@/types/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

interface IProps {
  user: IUserDetails | null;
  onClose: (state: boolean) => void;
  handleChangeRole: (userId: string, role: 'admin' | 'customer') => void;
}

const ChangeRoleDialog = ({ user, onClose, handleChangeRole }: IProps) => {
  const validationSchema = z.object({
    name: z.string(),
    email: z.string(),
    role: z.enum(['admin', 'customer'], {
      required_error: 'Role is required',
    }),
  });
  const formMethods = useForm<z.infer<typeof validationSchema>>({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      role: user?.role,
    },
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = (values: z.infer<typeof validationSchema>) => {
    if (user && user?._id && values?.role) {
      handleChangeRole(user?._id, values?.role);
    }
  };

  return (
    <Dialog open={!!user} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change User Role</DialogTitle>
          <DialogDescription>
            You are going to change the role of the user
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          {' '}
          <div className="grid gap-4 py-4">
            <FormProvider {...formMethods}>
              <FormInput disabled name="name" label="Name" />
              <FormInput disabled name="email" label="Email" />
              <FormSelect
                name="role"
                label="Role"
                options={[
                  { value: 'admin', label: 'Admin' },
                  { value: 'customer', label: 'Customer' },
                ]}
                placeholder="Select role"
              />
            </FormProvider>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>{' '}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeRoleDialog;
