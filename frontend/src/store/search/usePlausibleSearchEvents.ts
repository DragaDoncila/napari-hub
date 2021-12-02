import { over } from 'lodash';
import { useEffect } from 'react';
import { subscribeKey } from 'valtio/utils';

import { usePlausible } from '@/hooks';

import { SearchFormStore, searchFormStore } from './form.store';

type Unsubscriber = () => void;

/**
 * Hook that sends plausible events when portions of the Valtio state changes.
 */
export function usePlausibleSearchEvents() {
  const plausible = usePlausible();

  useEffect(() => {
    const unsubscribers: Unsubscriber[] = [
      // Search events.
      subscribeKey(searchFormStore.search, 'query', () => plausible('Search')),

      // Sort events.
      subscribeKey(searchFormStore, 'sort', (sortType) =>
        plausible('Sort', { by: sortType }),
      ),
    ];

    // Add subscribers for filter events.
    for (const key of Object.keys(searchFormStore.filters)) {
      const filterKey = key as keyof SearchFormStore['filters'];
      const filterState = searchFormStore.filters[filterKey];

      for (const stateKey of Object.keys(filterState)) {
        unsubscribers.push(
          subscribeKey(filterState, stateKey as never, (checked: boolean) =>
            plausible('Filter', {
              checked,
              field: filterKey,
              value: stateKey,
            }),
          ),
        );
      }
    }

    return over(unsubscribers) as () => void;
  }, [plausible]);
}
