'use client';

import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

function localGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'good morning';
  if (hour >= 12 && hour < 17) return 'good afternoon';
  if (hour >= 17 && hour < 21) return 'good evening';
  return 'hello';
}

export function Greeting() {
  const greeting = useSyncExternalStore(subscribe, localGreeting, () => 'hello');
  return <p className="mb-4 text-muted-foreground">{greeting}</p>;
}
