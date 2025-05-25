import { type ServiceCategory } from '@/services/api-actions/globalApiActions';
import { type WithDictionary } from '@/localization/locales';
import Chip from '@mui/material/Chip';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

type Props = {
 tags: ServiceCategory[];
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
     <li key={tag.id}>
      <Chip sx={chipStyle} label={tag.name} size='medium' />
     </li>
    ))}
   </ul>
  </section>
 );
}
