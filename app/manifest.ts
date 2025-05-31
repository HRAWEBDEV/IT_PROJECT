import { MetadataRoute } from 'next';

const manifest = (): MetadataRoute.Manifest => {
 return {
  theme_color: '#007aff',
  background_color: '#ffffff',
  icons: [
   {
    purpose: 'maskable',
    sizes: '512x512',
    src: 'favs/icon512_maskable.png',
    type: 'image/png',
   },
   {
    purpose: 'any',
    sizes: '512x512',
    src: 'favs/icon512_rounded.png',
    type: 'image/png',
   },
  ],
  orientation: 'any',
  display: 'standalone',
  dir: 'auto',
  lang: 'fa-IR',
  name: 'نرم افزار آی تی نترا',
  short_name: 'آی تی نترا',
  start_url: '/',
  scope: '.',
 };
};

export default manifest;
