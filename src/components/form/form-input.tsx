import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { get } from 'lodash';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface IProps {
  disabled?: boolean;
  autoFocus?: boolean;
  name: string;
  type?: 'text' | 'number' | 'email' | 'password';
  label?: string | ReactNode;
  placeholder?: string;
  className?: string;
  min?: number;
  max?: number;
  onChange?: (value: string) => void;
}

const FormInput = ({
  disabled,
  autoFocus,
  name,
  label,
  type = 'text', // Default type to 'text'
  placeholder,
  className,
  min,
  max,
  onChange,
}: IProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const errorMessage = get(errors, name)?.message;

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div
          className={cn(
            'space-y-0.5 justify-start flex-col flex w-full items-start',
            className
          )}
        >
          {label ? (
            <Label
              className={cn(
                'mb-1 font-semibold',
                errorMessage && 'text-destructive dark:text-red-500',
                className
              )}
              htmlFor={name}
            >
              {label}
            </Label>
          ) : null}

          <div className="relative w-full">
            <Input
              disabled={disabled}
              autoFocus={autoFocus}
              type={
                type === 'password'
                  ? !showPassword
                    ? 'password'
                    : 'text'
                  : type || 'text'
              }
              placeholder={placeholder || ''}
              className={cn(
                errorMessage
                  ? 'border-destructive  dark:border-red-500 focus-visible:ring-muted-foreground'
                  : ''
              )}
              {...{
                ...field,
                min,
                max,
                onChange: (e) => {
                  const value =
                    type === 'number'
                      ? parseFloat(e.target.value)
                      : e.target.value;
                  field.onChange(value);
                  if (onChange) {
                    onChange(e.target.value || '');
                  }
                },
              }}
            />
            {/* Show/Hide Password Button */}
            {type === 'password' && (
              <Button
                tabIndex={-1}
                type="button"
                variant="ghost"
                size={'sm'}
                className={cn(
                  'absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent',
                  disabled ? 'hidden' : ''
                )}
                onClick={() => setShowPassword((prev) => !prev)}
                disabled={disabled}
              >
                {!showPassword && !disabled ? (
                  <EyeIcon className="size-5" aria-hidden="true" />
                ) : (
                  <EyeOffIcon className="size-5" aria-hidden="true" />
                )}
                <span className="sr-only">
                  {showPassword ? 'Hide' : 'Show'}
                </span>
              </Button>
            )}
          </div>

          {errorMessage ? (
            <p
              className={cn(
                'text-sm font-medium text-destructive dark:text-red-500',
                className
              )}
            >
              {`${errorMessage}`}
            </p>
          ) : null}
        </div>
      )}
    />
  );
};

export default FormInput;
