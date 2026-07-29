'use client';

import * as RadixAccordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import styles from './Accordion.module.scss';

export default function Accordion({ items, type = 'single', collapsible = true, ...props }) {
  return (
    <RadixAccordion.Root type={type} collapsible={collapsible} {...props}>
      {items.map((item) => (
        <RadixAccordion.Item key={item.id} value={item.id} className={styles.item}>
          <RadixAccordion.Header className={styles.header}>
            <RadixAccordion.Trigger className={styles.trigger}>
              {item.title}
              <ChevronDown size={20} strokeWidth={1.5} className={styles.chevron} />
            </RadixAccordion.Trigger>
          </RadixAccordion.Header>
          <RadixAccordion.Content className={styles.contentInner}>
            <div className={styles.content}>{item.content}</div>
          </RadixAccordion.Content>
        </RadixAccordion.Item>
      ))}
    </RadixAccordion.Root>
  );
}
