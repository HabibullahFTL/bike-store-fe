import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { JSX, ReactNode, useState } from 'react';

interface IProps {
  title: string | ReactNode;
  description: string | ReactNode;
}

type IReturnType = [() => JSX.Element, () => Promise<unknown>];

interface IConfirmPromise {
  resolve: (value: boolean) => void;
}

const useConfirm = ({ title, description }: IProps): IReturnType => {
  const [promise, setPromise] = useState<IConfirmPromise | null>(null);
  const confirm = () =>
    new Promise((resolve) => {
      setPromise({ resolve });
    });
  const handleClose = () => {
    setPromise(null);
  };
  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };
  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const ConfirmDialog = () => {
    return (
      <Dialog open={promise !== null} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <DialogDescription>{description}</DialogDescription>
          <DialogFooter className="pt-2">
            <Button onClick={handleCancel} variant={'outline'}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              className="bg-red-500 hover:bg-red-600"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  return [ConfirmDialog, confirm];
};

export default useConfirm;
