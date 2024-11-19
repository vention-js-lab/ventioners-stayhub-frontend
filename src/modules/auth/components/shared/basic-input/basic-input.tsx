import InputBase from '@mui/material/InputBase';
import { inputStyles as styles } from '#/modules/auth/styles/input.sx';
import { isInputFieldEmpty } from '#/modules/auth/utils';
import type { FormInputProps, FormDataKeys } from '#/modules/auth/types';

type Props = FormInputProps & {
  inputRef: React.MutableRefObject<HTMLInputElement | undefined>;
  inputName: FormDataKeys;
};

export function BasicInput({ inputName, register, inputRef, focusedField, handleBlur, handleFocus }: Props) {
  const { ref, ...rest } = register(inputName);

  return (
    <InputBase
      {...rest}
      type={['password', 'confirmPassword'].includes(inputName) ? 'password' : 'text'}
      ref={(e: HTMLDivElement | null) => {
        if (e && e.children.length > 0) {
          ref(e);
          inputRef.current = e.children[0] as HTMLInputElement;
        }
      }}
      sx={styles(focusedField === inputName, !isInputFieldEmpty(inputRef)).input}
      onFocus={() => handleFocus(inputName)}
      onBlur={handleBlur}
    />
  );
}
