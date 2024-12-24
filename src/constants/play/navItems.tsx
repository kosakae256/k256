import { AiFillHome, AiOutlineHome } from 'react-icons/ai';
import { PiMicrophoneStage, PiMicrophoneStageFill } from 'react-icons/pi';

export const navItems = [
  {
    name: 'PlayHome',
    href: '/play',
    iconEnable: AiFillHome,
    iconDisable: AiOutlineHome,
  },
  {
    name: 'Karaoke',
    href: '/play/karaoke',
    iconEnable: PiMicrophoneStageFill,
    iconDisable: PiMicrophoneStage,
  },
];
