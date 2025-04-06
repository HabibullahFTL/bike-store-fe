import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { IGroupedSelectOption, ISelectOption } from '@/types/common';
import { get } from 'lodash';
import { ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface IProps {
  disabled?: boolean;
  autoFocus?: boolean;
  name: string;
  label?: string | ReactNode;
  placeholder?: string;
  className?: string;
  groupedOptions?: IGroupedSelectOption[];
  options?: ISelectOption[];
  onChange?: (value: string) => void;
}

const FormSelect = ({
  disabled,
  autoFocus,
  name,
  label,
  placeholder,
  className,
  groupedOptions,
  options = [],
  onChange,
}: IProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const errorMessage = get(errors, name)?.message;

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
                errorMessage && 'text-destructive',
                className
              )}
              htmlFor={name}
            >
              {label}
            </Label>
          ) : null}

          <div className="relative w-full">
            <Select
              disabled={disabled}
              value={field?.value}
              onValueChange={(value) => {
                field.onChange(value);
                if (onChange) {
                  onChange(value || '');
                }
              }}
            >
              <SelectTrigger
                className={cn(
                  'w-full',
                  errorMessage && 'border border-red-400'
                )}
                disabled={disabled}
                autoFocus={autoFocus}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {groupedOptions && groupedOptions?.length > 0 ? (
                  groupedOptions?.map((group) => (
                    <SelectGroup key={group?.id}>
                      <SelectLabel>{group?.label}</SelectLabel>
                      {group?.options?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))
                ) : (
                  <SelectGroup>
                    {(options || [])?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                )}
              </SelectContent>
            </Select>
          </div>

          {errorMessage ? (
            <p
              className={cn('text-sm font-medium text-destructive', className)}
            >
              {`${errorMessage}`}
            </p>
          ) : null}
        </div>
      )}
    />
  );
};

export default FormSelect;
