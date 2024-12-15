import React, { useRef, useState } from 'react';
import styles from './submit-button.module.css';
import { useTranslation } from 'react-i18next';
import { TRANSLATION_KEYS } from '#/constants/translation-keys.constant';

export function SubmitButton() {
  const { t } = useTranslation('auth');
  const [isPressed, setIsPressed] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  function handleMouseDown() {
    setIsPressed(true);
  }

  function handleMouseUp() {
    setIsPressed(false);
  }

  function handleMouseLeave() {
    setIsPressed(false);
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      buttonRef.current.style.setProperty('--x', `${x}px`);
      buttonRef.current.style.setProperty('--y', `${y}px`);
    }
  }

  return (
    <button
      ref={buttonRef}
      type="submit"
      className={`${styles.button} ${isPressed ? styles.pressed : ''}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {t(TRANSLATION_KEYS.auth.continue)}
    </button>
  );
}
