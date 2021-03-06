import imageDataLoader from './image-data-loader';

export const getRandom = (value) => {
  const floor = -value;
  return floor + Math.random() * value * 2;
};

export const initAttributes = async (imgUrl, duration, phenomenon) => {
  const { pixels, width:imgWidth, height:imgHeight} = await imageDataLoader(imgUrl);
  const multiplier = pixels.length;
  const {canvas} = phenomenon;
  const canvasCenterX = canvas.width / 2;
  const canvasCenterY = canvas.height / 2;
  const offsetX = canvasCenterX - imgWidth / 2;
  const offsetY = canvasCenterY - imgHeight / 2;

  // Every attribute must have:
  // - Name (used in the shader)
  // - Data (returns data for every particle)
  // - Size (amount of variables in the data)

  const attributes = [
    {
      name: 'aColor',
      data: (i) => [pixels[i].r / 255, pixels[i].g / 255, pixels[i].b / 255],
      size: 3,
    },
    {
      name: 'aAlpha',
      data: (i) => pixels[i].a / 255,
      size: 1,
    },
    {
      name: 'aPositionStart',
      data: (i) => [getRandom(2), getRandom(2), getRandom(2)],
      size: 3,
    },
    {
      name: 'aControlPointOne',
      data: () => [getRandom(2), getRandom(2), getRandom(2)],
      size: 3,
    },
    {
      name: 'aControlPointTwo',
      data: () => [getRandom(2.5), getRandom(2.5), getRandom(2.5)],
      size: 3,
    },
    {
      name: 'aPositionEndScreen',
      data: (i) => {
        return [offsetX + pixels[i].x, canvas.height - (offsetY + pixels[i].y), 1.0];
      },
      size: 3,
    },
    {
      name: "aOffset",
      data: i => [(getRandom(Math.floor(pixels.length / 2)) + Math.floor(pixels.length / 2)) * ((1 - duration) / (multiplier - 1))],
      size: 1
    }
  ];
  return { multiplier, attributes };
};
