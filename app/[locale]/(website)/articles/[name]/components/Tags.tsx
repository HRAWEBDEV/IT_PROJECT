import { type BlogTag } from '@/services/api-actions/globalApiActions';
import { type WithDictionary } from '@/localization/locales';
import Chip from '@mui/material/Chip';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Link from 'next/link';

type Props = {
 tags: BlogTag[];
};

const chipStyle = {
 minWidth: '8rem',
 borderRadius: '0.5rem',
};

export default function Tags({ dic, tags }: Props & WithDictionary) {
 return (
  <section className='container flex gap-4'>
   <div className='flex gap-2'>
    <LocalOfferIcon />
    <h6 className='text-lg font-medium'>{dic.tags as string}: </h6>
   </div>
   <ul className='flex gap-4 items-center flex-wrap'>
    {tags.map((tag) => (
     <li key={tag.tagID}>
      <Link
       href={`/articles?tagID=${tag.tagID}&tagName=${tag.tagName}`}
       className='w-full'
      >
       <Chip sx={chipStyle} label={tag.tagName} size='medium' />
      </Link>
     </li>
    ))}
   </ul>
  </section>
 );
}
