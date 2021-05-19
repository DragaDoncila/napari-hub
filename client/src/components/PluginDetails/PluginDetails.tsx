import clsx from 'clsx';

import { ColumnLayout, Markdown } from '@/components/common';
import { Media, MediaFragment } from '@/components/common/media';
import { usePluginState } from '@/context/plugin';

import { CallToActionButton } from './CallToActionButton';
import { PluginMetadata } from './PluginMetadata';
import { SupportInfo } from './SupportInfo';

function PluginLeftColumn() {
  return (
    <Media greaterThanOrEqual="screen-1425:">
      <PluginMetadata />
    </Media>
  );
}

function PluginCenterColumn() {
  const { plugin } = usePluginState();

  return (
    <article className="w-full col-span-2 screen-875:col-span-3">
      <h1 className="font-bold text-4xl">{plugin.name}</h1>
      <h2 className="font-semibold my-6 text-lg">{plugin.summary}</h2>

      <Media
        className={clsx(
          // Layout
          'flex flex-col',

          // Align CTA and metadata link horizontally for lg layouts
          'lg:flex-row lg:items-center',

          // Margins
          'my-6 screen-400:my-12',
        )}
        lessThan="screen-1425:"
      >
        <MediaFragment lessThan="screen-1150:">
          <CallToActionButton />
        </MediaFragment>

        <a
          className={clsx(
            // Text styling
            'underline hover:text-napari-primary',

            /*
              Top margins: This is used for smaller layouts because the CTA
              button is above the metadata link.
            */
            'mt-6 screen-400:mt-12 lg:mt-0',

            /*
              Left margins: This is used when the CTA and metadata link are
              inline.  The margin is removed when the CTA moves to the right
              column on screen-1150: layouts.
            */
            'lg:ml-12 screen-875:ml-0',
          )}
          href="#pluginMetadata"
        >
          View project data
        </a>
      </Media>

      <SupportInfo className="mb-6 screen-400:mb-12" />

      <Markdown className="mb-10" disableHeader>
        {plugin.description}
      </Markdown>

      <CallToActionButton className="mb-6 screen-400:mb-12 screen-875:mb-20" />

      <MediaFragment lessThan="screen-1425:">
        <PluginMetadata />
      </MediaFragment>
    </article>
  );
}

function PluginRightColumn() {
  const { plugin } = usePluginState();

  return (
    <Media greaterThanOrEqual="screen-1150:">
      {/*  Keep button on screen when scrolling on screen-1150:. */}
      <CallToActionButton className="fixed" />

      <Markdown.TOC
        className="fixed flex mt-24"
        markdown={plugin.description}
      />
    </Media>
  );
}

/**
 * Component for rendering the plugin details page.
 */
export function PluginDetails() {
  return (
    <ColumnLayout
      className="p-6 screen-400:p-12 screen-875:px-0"
      data-testid="pluginDetails"
    >
      <PluginLeftColumn />
      <PluginCenterColumn />
      <PluginRightColumn />
    </ColumnLayout>
  );
}
