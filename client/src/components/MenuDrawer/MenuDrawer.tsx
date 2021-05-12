import { IconButton, List, ListItem, SwipeableDrawer } from '@material-ui/core';

import { Link } from '@/components/common';
import { Close } from '@/components/common/icons';

import { MenuDrawerItem } from './types';

interface Props {
  items: MenuDrawerItem[];
  onClose: () => void;
  onOpen: () => void;
  visible: boolean;
}

/**
 * Navigation drawer that slides out from the right. The drawer can be opened by
 * pressing the menu button or by swiping left from the right side of the
 * screen. Conversely, the drawer can be closed by clickig the close button,
 * swiping the drawer right, or clicking outside of the drawer area.
 */
export function MenuDrawer({ items, onOpen, onClose, visible }: Props) {
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <SwipeableDrawer
      anchor="right"
      classes={{ paper: 'bg-black flex-row w-9/12 p-6' }}
      disableDiscovery={iOS}
      onClose={onClose}
      onOpen={onOpen}
      open={visible}
    >
      <List className="text-white flex-grow">
        {items.map((item) => (
          <ListItem key={item.title}>
            <Link href={item.link} onClick={onClose}>
              {item.title}
            </Link>
          </ListItem>
        ))}
      </List>

      <IconButton
        className="self-start"
        data-testid="drawerClose"
        onClick={onClose}
      >
        <Close />
      </IconButton>
    </SwipeableDrawer>
  );
}
