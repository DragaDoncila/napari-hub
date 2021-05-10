import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useSearchState } from '@/context/search/search';

const SEARCH_ICON_SIZE = 14;

/**
 * Search bar component. This renders an input field with a underline and
 * magnifying glass icon to the right of the component. When the user enters a query,
 * one of two things can happen:
 *
 * 1. User is on search page, so typing a query re-renders the plugin list.
 *
 * 2. User is not on search page, so submitting a query redirects to the search
 * page with the `query=` URL parameter set.
 *
 * This makes the SearchBar component re-useable for non-search enabled pages.
 */
export function SearchBar() {
  const router = useRouter();
  const { results, query, setQuery } = useSearchState() ?? {};

  // Local state for query. This is only used if the context state above isn't available.
  const [activeQuery, setActiveQuery] = useState('');

  return (
    <form
      className={clsx(
        // Flex layout
        'flex flex-auto items-center',

        // Borders
        'border-b-2 border-black',
      )}
      onSubmit={async (event) => {
        event.preventDefault();

        // Search state is only available on search enabled pages.
        const isSearchPage = results !== undefined;

        // If searching from another page, redirect to the search page with the
        // query parameter to initiate a search on load.
        if (!isSearchPage) {
          await router.push(`/?query=${encodeURIComponent(activeQuery)}`);
        }
      }}
    >
      <input
        data-testid="searchBarInput"
        className={clsx(
          // Flex layout
          'flex flex-auto',

          // Remove border and focus outline around input
          'border-none outline-none',

          // Remove white colored input background
          'bg-transparent',

          /*
            Inputs have a default width defined by the browser, so we have to
            set this explicitly to make the input flexible:
            https://stackoverflow.com/a/42421490
          */
          'w-0',
        )}
        onChange={(event) => {
          const { value } = event.target;

          if (setQuery) {
            setQuery(value);
          } else {
            setActiveQuery(value);
          }
        }}
        value={query ?? activeQuery}
      />
      <Image
        src="/icons/search.svg"
        alt="Icon for napari search bar"
        layout="fixed"
        width={SEARCH_ICON_SIZE}
        height={SEARCH_ICON_SIZE}
      />
    </form>
  );
}
