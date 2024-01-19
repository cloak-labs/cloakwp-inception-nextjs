'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/UI/Button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/UI/Form';
import { Input } from '@/components/UI/Input';
import React, { useState } from 'react';
import { Textarea } from '../UI/Textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../UI/Select';
import { Checkbox } from '../UI/Checkbox';
import { ReactStyleProps } from '@cloakui/react-primitives';
import { cx } from '@/lib/utils/cva';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { Spinner } from '../Icons/Spinner';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const formSchema = z.object({
  first_name: z.string().min(2, {
    message: 'First name must be at least 2 characters.',
  }),
  last_name: z.string().min(2, {
    message: 'Last name must be at least 2 characters.',
  }),
  company: z.string().optional(),
  email: z.string().email({ message: 'Invalid email address.' }),
  phone: z.string().regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, {
    message: 'Invalid phone number.',
  }),
  message: z
    .string()
    .min(20, {
      message: 'Please provide a little more detail.',
    })
    .max(1000, {
      message: 'Message should not exceed 1000 characters.',
    }),
  referral_source: z.enum(
    ['outbound_sales', 'google_search', 'social_media', 'friend', 'other'],
    {
      invalid_type_error: 'Please select an option.',
      required_error: 'Please select an option.',
    }
  ),
  subscribe: z.boolean().default(false).optional(),
});

export const ContactForm: React.FC<ReactStyleProps> = ({
  className,
  style,
}) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      company: '',
      email: '',
      phone: '',
      message: '',
      referral_source: null,
      subscribe: false,
    },
  });

  // 2. initialize some state re:form submission status
  const [isFormProcessing, setIsFormProcessing] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState(false);

  // 3. initialize Google recaptcha
  const { executeRecaptcha } = useGoogleReCaptcha();

  // 4. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
      return;
    }
    executeRecaptcha('contactFormSubmit').then((gReCaptchaToken) => {
      setIsFormProcessing(true);

      fetch('/api/form-submission', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formName: 'Contact Form',
          gReCaptchaToken,
          formData: values,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log('response from backend:', res);
          // set form state based on submission response:
          setFormMessage(res?.message);
          setIsFormProcessing(false); // Note: custom state that now hides the loader in the form UI
          if (res?.status === 'success') {
            setFormSuccess(true); // Note: custom state that allows us to show a success state/message in the form UI
            setFormError(false);
            form.reset(); // clear form values
          } else {
            setFormError(true);
            setFormSuccess(false);
          }
        });
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cx(
          'flex flex-col gap-x-4 gap-y-6 xs:grid xs:grid-cols-2',
          className
        )}
        style={style}
      >
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input placeholder="Smith" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input placeholder="Microsoft" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john.smith@microsoft.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="(123)-456-7890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type your message here..."
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="referral_source"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>How'd you hear about us?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="outbound_sales">Our sales team</SelectItem>
                  <SelectItem value="google_search">Google Search</SelectItem>
                  <SelectItem value="social_media">Social Media</SelectItem>
                  <SelectItem value="friend">From a friend</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subscribe"
          render={({ field }) => (
            <FormItem className="col-span-2 flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Subscribe to our monthly newsletter</FormLabel>
                <FormDescription>We promise not to spam you.</FormDescription>
              </div>
            </FormItem>
          )}
        />
        <div className="col-span-full flex items-center gap-4">
          <Button className="max-w-fit" type="submit">
            Submit
          </Button>
          {isFormProcessing && (
            <p className="ml-0.5 flex items-center gap-x-1.5 text-sm font-medium tracking-tight text-root-dim">
              <Spinner className="size-5" />
              Submitting...
            </p>
          )}
          {(formSuccess || formError) && (
            <p className="flex items-center gap-x-1 text-sm font-medium tracking-tight text-root-dim">
              <>
                {formSuccess ? (
                  <CheckCircleIcon
                    className="size-6 text-link"
                    aria-hidden="true"
                  />
                ) : (
                  <XCircleIcon
                    className="size-6 text-destructive"
                    aria-hidden="true"
                  />
                )}
                {formMessage ||
                  (formError
                    ? 'Failed to submit, please try again.'
                    : 'Submitted successfully')}
              </>
            </p>
          )}
        </div>
      </form>
    </Form>
  );
};
