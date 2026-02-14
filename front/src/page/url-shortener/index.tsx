'use client';

import { useState, type SubmitEvent } from 'react';
import { useCreateShortUrl } from '@/page/url-shortener/hooks/useCreateShortUrl';
import Header from './components/header';
import ShortenForm from './components/shorten-form';
import ErrorBanner from '../../components/error-banner';
import ShortUrlResult from './components/short-url-result';

const UrlShortener = () => {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const { mutate, data, isPending, isError, reset } = useCreateShortUrl();

  const shortUrl = data ? `${process.env.BUN_PUBLIC_FRONTEND_URL}/${data.shortCode}` : null;

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!url.trim()) {
      return;
    };
    reset();
    mutate(url.trim());
  };

  const handleCopy = async () => {
    if (!shortUrl) return;
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNewUrl = () => {
    setUrl('');
    reset();
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a0f] flex items-center justify-center p-4 font-mono">

      <div className="relative w-full max-w-xl">
        <Header />
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-6 shadow-2xl">
          <ShortenForm
            handleSubmit={handleSubmit}
            url={url}
            isPending={isPending}
            onUrlChange={setUrl}
          />

          {isError ? (
            <ErrorBanner label="Failed to shorten URL. Please try again." />
          ) : null}

          {shortUrl && data ? (
            <ShortUrlResult
              shortUrl={shortUrl}
              originalUrl={data.originalUrl}
              copied={copied}
              onCopy={handleCopy}
              onNewUrl={handleNewUrl}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default UrlShortener;