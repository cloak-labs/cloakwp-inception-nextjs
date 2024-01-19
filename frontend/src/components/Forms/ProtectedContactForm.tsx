import React from 'react';
import { CaptchaProvider } from './CaptchaProvider';
import { ContactForm } from './ContactForm';
import { ReactStyleProps } from '@cloakui/react-primitives';

export const ProtectedContactForm: React.FC<ReactStyleProps> = (props) => {
  return (
    <CaptchaProvider>
      <ContactForm {...props} />
    </CaptchaProvider>
  );
};
