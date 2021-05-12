import { IconButton, InputBase } from '@material-ui/core';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { Search } from '@/components/common/icons';
import {
  SEARCH_PAGE,
  SEARCH_QUERY_PARAM,
  useSearchState,
} from '@/context/search';

/**
 * Search bar component. This renders an input field with a underline and
 * magnifying glass icon to the right of the component. When the user enters a query,
 * one of two things can happen:
 *
 * 1. User is on search page, so typing a query re-renders the plugin list.
 *
 * 2. User is not on search page, so submitting a query redirects to the search
 * page with the `search=` URL parameter set.
 *
 * This makes the SearchBar component re-useable for non-search enabled pages.
 */
export function SearchBar() {
  const router = useRouter();
  const { results, query, setQuery } = useSearchState() ?? {};

  // Local state for query. This is only used if the context state above isn't available.
  const [localQuery, setLocalQuery] = useState('');

  async function redirectToSearchPage() {
    // Search state is only available on search enabled pages.
    const isSearchPage = results !== undefined;

    // If searching from another page, redirect to the search page with the
    // search query parameter to initiate a search on load.
    if (!isSearchPage) {
      const url = new URL(SEARCH_PAGE, window.location.origin);
      url.searchParams.set(SEARCH_QUERY_PARAM, encodeURIComponent(localQuery));

      await router.push(url);
    }
  }

  return (
    <form
      data-testid="searchBarForm"
      className={clsx(
        // Flex layout
        'flex flex-auto items-center',

        // Borders
        'border-b-2 border-black',
      )}
      onSubmit={async (event) => {
        event.preventDefault();
        await redirectToSearchPage();
      }}
    >
      <InputBase
        className="flex flex-auto"
        data-testid="searchBarInput"
        placeholder="Search plugins..."
        onChange={(event) => {
          const { value } = event.target;

          if (setQuery) {
            setQuery(value);
          } else {
            setLocalQuery(value);
          }
        }}
        value={query ?? localQuery}
      />

      <IconButton className="p-1" onClick={redirectToSearchPage}>
        <Search />
      </IconButton>
    </form>
  );
}
