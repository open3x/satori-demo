import satori from 'satori'

export async function getArtwork() {
  const robotoBold = await useStorage("assets:server").getItemRaw("Roboto-Bold.ttf");
  return satori(
    {
      type: 'div',
      props: {
        children: 'hello, world',
        style: { color: 'black' },
      },
    },
    {
      width: 512,
      height: 512,
      fonts: [{
      name: 'Roboto',
      data: robotoBold,
      weight: 700,
      style: 'normal'
    }],
    },
  )
}

export default eventHandler(async (event) => {
  const artwork = await getArtwork();
  setHeaders(event, { "Content-Type": "image/svg+xml" });
  setResponseStatus(event, 200);
  return artwork;
});
