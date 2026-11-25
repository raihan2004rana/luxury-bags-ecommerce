'use client';

import { type FormEvent, useId, useState } from 'react';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { EditorialHeading, Eyebrow } from '@/components/ui/typography';
import { cn } from '@/lib/utils/cn';

const newsletterSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address.'),
});

export interface NewsletterSectionProps {
  readonly className?: string;
}

export function NewsletterSection({ className }: NewsletterSectionProps) {
  const inputId = useId();
  const errorId = useId();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = newsletterSchema.safeParse({ email });

    if (!parsed.success) {
      setErrorMessage(parsed.error.issues[0]?.message ?? 'Please enter a valid email.');
      return;
    }

    setErrorMessage(null);
    setSubmitted(true);
    setEmail('');
    toast({
      title: 'Private List Confirmed',
      description: 'You will receive early invitations to numbered LŪMÉ editions.',
      tone: 'success',
    });
  };

  return (
    <section
      aria-labelledby="newsletter-heading"
      className={cn(
        'bg-champagne/45 border-border-subtle border-y px-6 py-16 sm:px-10 lg:py-24',
        className,
      )}
    >
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>Private Clienteling</Eyebrow>
        <EditorialHeading id="newsletter-heading" as="h2" scale="h1" className="mt-3">
          Enter the LŪMÉ Atelier List
        </EditorialHeading>
        <p className="text-charcoal mx-auto mt-3 max-w-lg text-sm leading-relaxed">
          Receive quiet dispatches on seasonal leather editions, private salon previews, and
          archival restocks.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mx-auto mt-8 max-w-md">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-0">
            <label htmlFor={inputId} className="sr-only">
              Email address
            </label>
            <input
              id={inputId}
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (errorMessage) {
                  setErrorMessage(null);
                }
              }}
              placeholder="your.name@domain.com"
              aria-invalid={Boolean(errorMessage)}
              aria-describedby={errorMessage ? errorId : undefined}
              className="bg-ivory text-obsidian placeholder:text-taupe border-border-strong focus:border-obsidian h-12 flex-1 rounded-none border px-4 text-sm transition-colors focus:outline-none sm:border-r-0"
            />
            <Button type="submit" variant="primary" className="h-12 shrink-0 px-7">
              Subscribe
            </Button>
          </div>

          {errorMessage && (
            <p id={errorId} role="alert" className="text-burgundy mt-2.5 text-left text-xs">
              {errorMessage}
            </p>
          )}

          {submitted && !errorMessage && (
            <p className="text-sage mt-2.5 text-xs">
              Thank you. Your private invitation preferences have been recorded.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
