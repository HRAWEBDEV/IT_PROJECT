import { PropsWithChildren } from 'react';
import { motion } from 'motion/react';

type Props = { isOpen: boolean };

export default function Options({
 children,
 isOpen,
}: PropsWithChildren & Props) {
 return (
  <>
   {isOpen ? (
    <motion.nav
     initial={{
      opacity: 0,
      y: -20,
     }}
     animate={{
      opacity: 1,
      y: 0,
     }}
     className='absolute top-full start-0 rounded-lg bg-background p-4 shadow-lg text-foreground min-w-[20rem]'
    >
     {children}
    </motion.nav>
   ) : null}
  </>
 );
}
