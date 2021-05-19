import clsx from 'clsx';

import { ColumnLayout, Markdown } from '@/components/common';
import { Media, MediaFragment } from '@/components/common/media';
import { usePluginState } from '@/context/plugin';

import { CallToActionButton } from './CallToActionButton';
import { PluginMetadata } from './PluginMetadata';
import { SupportInfo } from './SupportInfo';

function PluginLeftColumn() {
  return (
    <Media greaterThanOrEqual="3xl">
      <PluginMetadata />
    </Media>
  );
}

function PluginCenterColumn() {
  const { plugin } = usePluginState();

  return (
    <article className="w-full col-span-2 tablet-lg:col-span-3">
      <h1 className="font-bold text-4xl">{plugin.name}</h1>
      <h2 className="font-semibold my-6 text-lg">{plugin.summary}</h2>

      <Media
        className={clsx(
          // Layout
          'flex flex-col',

          // Align CTA and metadata link horizontally for lg layouts
          'tablet-xs:flex-row tablet-xs:items-center',

          // Margins
          'my-6 phone-lg:my-12',
        )}
        lessThan="3xl"
      >
        <MediaFragment lessThan="2xl">
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
            'mt-6 phone-lg:mt-12 tablet-xs:mt-0',

            /*
              Left margins: This is used when the CTA and metadata link are
              inline.  The margin is removed when the CTA moves to the right
              column on 2xl layouts.
            */
            'tablet-xs:ml-12 2tablet-lg:ml-0',
          )}
          href="#pluginMetadata"
        >
          View project data
        </a>
      </Media>

      <SupportInfo className="mb-6 phone-lg:mb-12" />

      <Markdown className="mb-10" disableHeader>
        {plugin.description}
      </Markdown>

      <CallToActionButton className="mb-6 phone-lg:mb-12 2tablet-lg:mb-20" />

      <MediaFragment lessThan="3xl">
        <PluginMetadata />
      </MediaFragment>
    </article>
  );
}

function PluginRightColumn() {
  const { plugin } = usePluginState();

  return (
    <Media greaterThanOrEqual="2xl">
      {/*  Keep button on screen when scrolling on 2xl. */}
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
      className="p-6 phone-lg:p-12 2tablet-lg:px-0"
      data-testid="pluginDetails"
    >
      <PluginLeftColumn />
      <PluginCenterColumn />
      <PluginRightColumn />
    </ColumnLayout>
  );
}
