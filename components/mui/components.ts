import { Components } from '@mui/material/styles/components';
import { Theme } from '@mui/material/styles/createTheme';
import type {} from '@mui/x-data-grid/themeAugmentation';
import { gridClasses } from '@mui/x-data-grid';
import { alpha } from '@mui/material/styles';

export const components: Components<Omit<Theme, 'components'>> = {
 MuiIconButton: {
  styleOverrides: {
   root: {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'inherit',
   },
  },
 },
 MuiInputLabel: {
  styleOverrides: {
   root: {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'inherit',
   },
  },
 },
 MuiAutocomplete: {
  styleOverrides: {
   root: {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'inherit',
   },
   paper: {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'inherit',
   },
  },
 },
 MuiDataGrid: {
  styleOverrides: {
   root: ({ theme }) => {
    const selectOpacity = 0.1;
    const hoverOpacity = 0.3;
    const hoverColor =
     theme.palette.mode === 'light'
      ? theme.palette.neutral[300]
      : theme.palette.neutral[600];
    const rowSelectColor = theme.palette.neutral[400];
    return {
     fontSize: 'inherit',
     [`& .${gridClasses.row}.strip`]: {
      backgroundColor:
       theme.palette.mode === 'light'
        ? theme.palette.neutral[50]
        : theme.palette.neutral[800],
     },
     [`& .${gridClasses.row}`]: {
      '&:hover, &.Mui-hovered': {
       backgroundColor: alpha(hoverColor, hoverOpacity),
       '@media (hover: none)': {
        backgroundColor: 'transparent',
       },
      },
      '&.Mui-selected': {
       backgroundColor: alpha(
        rowSelectColor,
        selectOpacity + theme.palette.action.selectedOpacity
       ),
       '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
         rowSelectColor,
         selectOpacity +
          theme.palette.action.selectedOpacity +
          theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
         backgroundColor: alpha(
          rowSelectColor,
          selectOpacity + theme.palette.action.selectedOpacity
         ),
        },
       },
      },
     },
    };
   },
   columnHeader: ({ theme }) => ({
    fontSize: 'inherit',
    backgroundColor:
     theme.palette.mode == 'light'
      ? theme.palette.sky[100]
      : theme.palette.sky[900],
   }),
   toolbarContainer: ({ theme }) => ({
    padding: theme.spacing(2),
    borderBottom: `1px solid ${
     theme.palette.mode == 'light'
      ? theme.palette.neutral[200]
      : theme.palette.neutral[700]
    }`,
   }),
  },
  defaultProps: {
   initialState: {
    density: 'compact',
   },
   disableColumnSorting: true,
   showCellVerticalBorder: true,
   showColumnVerticalBorder: true,
  },
 },
 MuiBadge: {
  styleOverrides: {
   badge: {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'inherit',
   },
  },
 },
 MuiInputBase: {
  styleOverrides: {
   input: {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'normal',
   },
  },
 },
 MuiFormControlLabel: {
  styleOverrides: {
   label: {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'normal',
   },
  },
 },
 MuiBreadcrumbs: {
  styleOverrides: {
   root: {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'normal',
   },
   separator: {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'normal',
   },
  },
 },
 MuiChip: {
  styleOverrides: {
   label: {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'normal',
   },
  },
 },
 MuiTab: {
  styleOverrides: {
   root: {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'normal',
   },
  },
 },
 MuiTooltip: {
  styleOverrides: {
   tooltip: {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'normal',
   },
  },
 },
 MuiButtonBase: {
  styleOverrides: {
   root: {
    fontFamily: 'inherit',
    fontWeight: 'normal',
    fontSize: 'inherit',
   },
  },
 },
 MuiButton: {
  styleOverrides: {
   root: {
    fontFamily: 'inherit',
    fontWeight: 'normal',
    fontSize: 'inherit',
   },
  },
 },
};
