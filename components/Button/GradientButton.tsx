import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';

export const GradientButton = styled((props: ButtonProps) => (
 <Button variant='contained' {...props} />
))(({ theme }) => ({
 background: `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.light})`,
 '&:is(:hover,:focus)': {
  background: `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.light})`,
 },
}));
