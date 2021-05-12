import { Button } from '@material-ui/core';
import clsx from 'clsx';
import { useState } from 'react';

import { InstallModal } from './InstallModal';

interface Props {
  className?: string;
}

/**
 * Component that renders the CTA button and installation modal.  Clicking the
 * install button will render the modal visible.
 */
export function CallToActionButton({ className }: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <InstallModal onClose={() => setVisible(false)} visible={visible} />

      <Button
        className={clsx(
          className,

          // Keep button on screen when scrolling on 2xl.
          '2xl:fixed',

          // Dimensions
          'h-12 w-full lg:max-w-napari-side-col',

          // Font
          'font-bold',
        )}
        disableElevation
        onClick={() => setVisible(true)}
        variant="contained"
        color="primary"
      >
        Install
      </Button>
    </>
  );
}
