'use client';

import * as RadixTabs from '@radix-ui/react-tabs';
import styles from './Tabs.module.scss';

export function Tabs({ children, ...props }) {
  return <RadixTabs.Root {...props}>{children}</RadixTabs.Root>;
}

export function TabsList({ children, ...props }) {
  return (
    <RadixTabs.List className={styles.list} {...props}>
      {children}
    </RadixTabs.List>
  );
}

export function TabsTrigger({ children, ...props }) {
  return (
    <RadixTabs.Trigger className={styles.trigger} {...props}>
      {children}
    </RadixTabs.Trigger>
  );
}

export function TabsContent({ children, ...props }) {
  return (
    <RadixTabs.Content className={styles.content} {...props}>
      {children}
    </RadixTabs.Content>
  );
}
