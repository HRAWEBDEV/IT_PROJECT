import { FaPhoneSquareAlt } from 'react-icons/fa';
import { FaTelegramPlane } from 'react-icons/fa';
import { IoLogoWhatsapp } from 'react-icons/io';
import { TfiInstagram } from 'react-icons/tfi';
// import { FaLinkedin } from 'react-icons/fa';
// import { MdAlternateEmail } from 'react-icons/md';

const fontSize = '2rem';
export const socials = [
 {
  id: 1,
  name: 'telegram',
  urlPrefix: 'https://t.me/',
  placeholder: 't.me/',
  icon: <FaTelegramPlane fontSize={fontSize} />,
  color: 'info',
 },
 {
  id: 2,
  name: 'instagram',
  urlPrefix: 'https://www.instagram.com/',
  placeholder: 'www.instagram.com/',
  icon: <TfiInstagram fontSize={fontSize} />,
  color: 'error',
 },
 {
  id: 3,
  name: 'whatsapp',
  urlPrefix: 'https://wa.me/',
  placeholder: 'wa.me/',
  icon: <IoLogoWhatsapp fontSize={fontSize} />,
  color: 'success',
 },
 {
  id: 4,
  name: 'phone',
  urlPrefix: 'tel:',
  placeholder: '',
  icon: <FaPhoneSquareAlt fontSize={fontSize} />,
  color: 'warning',
 },
 // {
 //  id: 5,
 //  name: 'email',
 //  urlPrefix: 'mailto:',
 //  icon: <MdAlternateEmail fontSize={fontSize} />,
 // },
 // {
 //  id: 6,
 //  name: 'linkedin',
 //  urlPrefix: 'https://www.linkedin.com/in/',
 //  icon: <FaLinkedin fontSize={fontSize} />,
 // },
] as const;
