import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/styles';

const Loader = styled(motion.div)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
  // background: '#18315B',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column'
}));

export default function Loading() {
  const theme: any = useTheme();
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '7%',
          [theme.breakpoints.up('xs')]: { paddingTop: '15%' },
          [theme.breakpoints.up('sm')]: { paddingTop: '10%' },
          [theme.breakpoints.up('md')]: { paddingTop: '6%' },
          [theme.breakpoints.up('lg')]: { paddingTop: '5%' }
        }}
      >
        <Loader>
          <motion.div
            style={{
              height: '50px',
              background: theme.palette.primary.main,
              width: '50px',
              borderRadius: '2% 50%'
            }}
            animate={{
              rotate: 360
            }}
            transition={{
              flip: Infinity,
              duration: 1,
              ease: 'easeInOut'
            }}
          ></motion.div>
        </Loader>
      </Box>
    </>
  );
}
