import { useEffect, useState } from 'react';
import { Blurhash } from 'react-blurhash';
import Box from '@mui/material/Box';

export function LazyImage({
  src,
  blurhash = 'LBPs*Lxv~pjC?a-;NH0K~pM_IUxv',
  ...otherProps
}: {
  src: string;
  blurhash?: string;
} & React.ImgHTMLAttributes<HTMLImageElement>) {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  useEffect(() => {
    const img = new Image();

    img.onload = () => {
      setImageLoaded(true);
    };

    img.src = src;
  }, [src]);

  return (
    <>
      <Box sx={{ display: imageLoaded ? 'none' : 'inline' }}>
        <Blurhash hash={blurhash} width="100%" height="100%" resolutionX={32} resolutionY={32} punch={1} />
      </Box>
      <img src={src} style={{ display: imageLoaded ? 'inline' : 'none' }} {...otherProps} loading="lazy" />
    </>
  );
}
