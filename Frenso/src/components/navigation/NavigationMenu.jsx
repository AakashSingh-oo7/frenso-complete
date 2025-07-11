import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GroupIcon from '@mui/icons-material/Group';
import VerifiedIcon from '@mui/icons-material/Verified';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const navigationmenu = [
  {
    title: "Home",
    icon: <HomeIcon />,
    path: "/home",
  },
  {
    title: "Explore",
    icon: <ExploreIcon />,
    path: "/explore",
  },
  {
    title: "Notifications",
    icon: <NotificationsIcon />,
    path: "/notifications",
  },
  {
    title: "Messages",
    icon: <MessageIcon />,
    path: "/messages",
  },
  {
    title: "Lists",
    icon: <ListAltIcon />,
    path: "/lists",
  },
  {
    title: "Groups",
    icon: <GroupIcon />,
    path: "/groups",
  },
  {
    title: "Verified",
    icon: <VerifiedIcon />,
    path: "/verified",
  },
  {
    title: "Profile",
    icon: <AccountCircleIcon />,
    path: "/profile",
  },
];
