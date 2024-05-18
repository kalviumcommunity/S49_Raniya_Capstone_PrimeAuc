
import * as React from 'react';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import AlbumRoundedIcon from '@mui/icons-material/AlbumRounded';

export default function ImageCover({item}) {
  return (
    <Card sx={{ minHeight: '280px', width: 320 }}>
      <CardCover>
        <img
          src={item.image}
         
          loading="lazy"
          alt={item.title}
        />
      </CardCover>
      <CardCover
        sx={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
        }}
      />
      <CardContent sx={{ justifyContent: 'flex-end' }}>
        <Typography level="title-lg" textColor="#fff">
{item.title}        </Typography>
        <Typography
          startDecorator={<AlbumRoundedIcon />}
          textColor="neutral.300"
        >
          {item.lot_no}
        </Typography>
      </CardContent>
    </Card>
  );
}