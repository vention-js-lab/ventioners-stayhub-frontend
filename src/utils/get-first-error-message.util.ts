import type { FieldErrors, FieldValues } from 'react-hook-form';

export function getFirstErrorMessage<T extends FieldValues>(errors: FieldErrors<T>) {
  const field = Object.keys(errors)[0];

  if (!field) return '';

  const error = errors[field as keyof T];

  return error?.message ?? '';
}
