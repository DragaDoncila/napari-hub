import { Button, Dialog, IconButton } from '@material-ui/core';
import clsx from 'clsx';
import Image from 'next/image';

import { Close, Copy } from '@/components/common/icons';
import { MediaFragment } from '@/components/common/media';
import { usePluginState } from '@/context/plugin';

import styles from './InstallModal.module.scss';

/**
 * Component that renders an inline button for copying the plugin name to the
 * user's clipboard.
 */
function CopyPluginNameButton() {
  const { plugin } = usePluginState();

  return (
    <Button
      className={clsx(
        // Button colors
        'bg-napari-primary-light hover:bg-napari-primary',

        // Show button inline with text.
        'inline',

        // Font
        'font-bold',

        // Padding
        'px-2',
      )}
      disableElevation
      endIcon={<Copy />}
      onClick={() => navigator.clipboard.writeText(plugin.name)}
      variant="contained"
    >
      {plugin.name}
    </Button>
  );
}

interface Closeable {
  /**
   * Callback to close the modal when the user clicks away or clicks the close
   * buttons.
   */
  onClose(): void;
}

/**
 * Component showing modal title and close button.
 */
function InstallModalHeader({ onClose }: Closeable) {
  return (
    <header className="flex justify-between mb-9">
      <h2 id="modal-title" className="font-bold text-2xl">
        Installing a plugin with napari
      </h2>

      {/* Close button */}
      <MediaFragment greaterThanOrEqual="sm">
        <IconButton onClick={onClose}>
          <Close className={styles.closeIcon} />
        </IconButton>
      </MediaFragment>
    </header>
  );
}

/**
 * Component that renders the modal body.  This includes the instructions on
 * how to install the napari plugin and a button to copy the plugin name.
 */
function InstallModalBody() {
  return (
    // Numbered list of instructions for installing a plugin
    <ol id="modal-content" className="list-decimal list-inside font-bold">
      <li>
        <p className="font-normal inline leading-8">
          From the “Plugins” menu within the napari application, select
          “Install/Uninstall Package(s)...”.
        </p>

        <div className="my-3">
          <Image
            src="/images/plugin-install-menu.png"
            alt="napari plugin install menu"
            width={141}
            height={74}
          />
        </div>
      </li>

      <li>
        <p className="font-normal inline leading-8">
          Copy <CopyPluginNameButton /> and paste it where it says “Install by
          name/url…”
        </p>

        <div className="my-3">
          <Image
            src="/images/plugin-list.png"
            alt="napari plugin list"
            width={430}
            height={191}
          />
        </div>
      </li>

      <li>
        <p className="font-normal inline">Click “Install”.</p>
        <p className="font-normal italic text-xs my-6">
          To get started with napari, visit{' '}
          <a
            className="underline hover:text-napari-primary"
            href="https://napari.org"
            target="_blank"
            rel="noreferrer"
          >
            napari.org
          </a>
          .
        </p>
      </li>
    </ol>
  );
}

/**
 * Component that renders the modal footer. This includes the primary modal
 * close button.
 */
function InstallModalFooter({ onClose }: Closeable) {
  return (
    <div className="flex justify-end">
      <Button
        className="border-2 border-napari-primary py-3 px-6"
        onClick={onClose}
        variant="outlined"
      >
        Close
      </Button>
    </div>
  );
}

interface InstallModalProps extends Closeable {
  /**
   * Determines if the modal should be visible or not.
   */
  visible: boolean;
}

/**
 * Component for rendering the installation modal.  This component handles
 * animating the modal into / out of view, displaying an overlay when the modal
 * is visible, and closing the modal when the user clicks away from it.
 */
export function InstallModal({ onClose, visible }: InstallModalProps) {
  return (
    <Dialog
      aria-labelledby="modal-title"
      aria-describedby="modal-content"
      className="flex items-center justify-center"
      classes={{
        paper: clsx(
          // Enforce min and max widths
          'min-w-[270px] max-w-napari-center-col',

          // Remove margin set by MUI
          'm-0',

          // Padding
          'p-6 md:p-12',
        ),
      }}
      open={visible}
      onClose={onClose}
    >
      <InstallModalHeader onClose={onClose} />
      <InstallModalBody />
      <InstallModalFooter onClose={onClose} />
    </Dialog>
  );
}
