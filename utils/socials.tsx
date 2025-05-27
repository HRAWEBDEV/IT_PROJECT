import { FaPhoneSquareAlt } from 'react-icons/fa';
import { FaTelegramPlane } from 'react-icons/fa';
import { IoLogoWhatsapp } from 'react-icons/io';
import { TfiInstagram } from 'react-icons/tfi';
import { FaLinkedin } from 'react-icons/fa';
import { MdAlternateEmail } from 'react-icons/md';

const fontSize = '2rem';
export const socials = [
 {
  name: 'telegram',
  urlPrefix: 'https://t.me/',
  icon: <FaTelegramPlane fontSize={fontSize} />,
 },
 {
  name: 'instagram',
  urlPrefix: 'https://www.instagram.com/',
  icon: <TfiInstagram fontSize={fontSize} />,
 },
 {
  name: 'linkedin',
  urlPrefix: 'https://www.linkedin.com/in/',
  icon: <FaLinkedin fontSize={fontSize} />,
 },
 {
  name: 'whatsapp',
  urlPrefix: 'https://wa.me/',
  icon: <IoLogoWhatsapp fontSize={fontSize} />,
 },
 {
  name: 'phone',
  urlPrefix: 'tel:',
  icon: <FaPhoneSquareAlt fontSize={fontSize} />,
 },
 {
  name: 'email',
  urlPrefix: 'mailto:',
  icon: <MdAlternateEmail fontSize={fontSize} />,
 },
] as const;
