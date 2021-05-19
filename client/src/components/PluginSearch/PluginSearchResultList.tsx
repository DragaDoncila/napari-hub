import clsx from 'clsx';

import { useSearchState } from '@/context/search';

import { PluginSearchResult } from './PluginSearchResult';

export function PluginSearchResultList() {
  const { results = [] } = useSearchState() ?? {};

  return (
    <>
      <h2
        className={clsx(
          'col-span-2',
          'font-bold text-2xl mb-6',
          'tablet-lg:col-start-2',
        )}
      >
        Browse plugins
      </h2>

      {results.map(({ plugin }) => (
        <PluginSearchResult
          className={clsx(
            'col-span-2',
            'tablet-lg:col-start-2 tablet-lg:col-span-2',
            'screen-1425:col-start-2 screen-1425:col-span-3',
          )}
          key={plugin.name}
          plugin={plugin}
        />
      ))}
    </>
  );
}
