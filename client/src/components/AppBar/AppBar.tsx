import {
  AppBar as MUIAppBar,
  Button,
  IconButton,
  Toolbar,
} from '@material-ui/core';
import clsx from 'clsx';
import { useState } from 'react';

import { MenuDrawer, SearchBar } from '@/components';
import { Link } from '@/components/common';
import { Menu } from '@/components/common/icons';
import { Media, MediaFragment } from '@/components/common/media';
import { MenuDrawerItem } from '@/components/MenuDrawer/types';
import { useSearchState } from '@/context/search';

const MENU_ITEMS: MenuDrawerItem[] = [
  {
    title: 'About',
    link: '/about',
  },
  {
    title: 'Help',
    link: '/help',
  },
];

/**
 * Header that links back to the home page.
 */
function AppBarHeader() {
  const { setQuery } = useSearchState() ?? {};

  return (
    <header data-testid="appBarHeader" className="flex">
      <h1 className="whitespace-nowrap">
        <Link
          // Redirect to home page
          href="/"
          // Clear search related query parameter data if the user is currently
          // on the search page. Without this, the `useQueryParameter()` hook
          // will re-set the query parameter with the current query in the
          // search bar.
          onClick={() => setQuery?.('')}
        >
          napari <strong>hub</strong>
        </Link>
      </h1>
    </header>
  );
}

/**
 * Link bar for rendering menu links. This only shows up on lg+ screens.
 */
function AppBarLinks() {
  return (
    <Media className="ml-12" greaterThanOrEqual="lg">
      {MENU_ITEMS.map((item) => (
        <Button
          className="text-base"
          component={Link}
          href={item.link}
          key={item.link}
        >
          {item.title}
        </Button>
      ))}
    </Media>
  );
}

/**
 * App bar component that renders the home link, search bar, and menu.
 */
export function AppBar() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <MediaFragment lessThan="lg">
        <MenuDrawer
          items={MENU_ITEMS}
          onClose={() => setVisible(false)}
          onOpen={() => setVisible(true)}
          visible={visible}
        />
      </MediaFragment>

      <MUIAppBar component="nav" position="static" elevation={0}>
        <Toolbar
          className={clsx(
            // Height
            'h-napari-app-bar',

            // Padding
            'px-6 md:px-12 2xl:p-0',

            // Grid layout
            'grid grid-cols-napari-nav-mobile',
            'justify-center items-center',

            // Grid gap
            'gap-6 md:gap-12',

            // Change to 2 column grid layout when 2xl+ screens
            '2xl:grid-cols-napari-app-bar-2-col',

            // Use 3 column layout when 3xl+ screens
            '3xl:grid-cols-napari-3-col',
          )}
        >
          <AppBarHeader />

          <div
            className={clsx(
              // Flex layout
              'flex items-center',

              // Take 100% of width, but limit to center column width.
              'w-full max-w-napari-center-col',

              // Align container to the right of the grid cell
              'justify-self-end',
            )}
          >
            <SearchBar />
            <AppBarLinks />

            {/* Menu button */}
            <MediaFragment lessThan="lg">
              <IconButton className="ml-6" onClick={() => setVisible(true)}>
                <Menu />
              </IconButton>
            </MediaFragment>
          </div>
        </Toolbar>
      </MUIAppBar>
    </>
  );
}
