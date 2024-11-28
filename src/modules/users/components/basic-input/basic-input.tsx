import InputBase from '@mui/material/InputBase';
import { isInputFieldEmpty } from '#/utils';
import type { FormInputProps, FormDataKeys } from '#/modules/users/types';
import { basicInputStyles as styles } from './basic-input.styles';

type Props = FormInputProps & {
  inputRef: React.MutableRefObject<HTMLInputElement | undefined>;
  inputName: FormDataKeys;
};

export function BasicInput({ inputName, register, inputRef, focusedField, handleBlur, handleFocus }: Props) {
  const { ref, ...rest } = register(inputName);

  function getInputType(name: Props['inputName']) {
    return ['oldPassword', 'password', 'confirmPassword'].includes(name) ? 'password' : 'text';
  }

  return (
    <InputBase
      {...rest}
      type={getInputType(inputName)}
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
