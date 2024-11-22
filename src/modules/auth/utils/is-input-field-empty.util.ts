export function isInputFieldEmpty(rf: React.MutableRefObject<HTMLInputElement | undefined>) {
  if (!rf.current) return true;

  return rf.current.value.length === 0;
}
