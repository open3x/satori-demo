import satori from "satori";
import { html } from "satori-html";

export default eventHandler(async (event) => {
  const { address, value } = getQuery(event);
  if (!address || !value) {
    setResponseStatus(event, 400);
    return { error: "address and value are required" };
  }

  const robotoBold = await useStorage("assets:server").getItemRaw("Roboto-Bold.ttf");
  const image = await useStorage("assets:server").getItemRaw("p.png");
  const imageData = `data:image/png;base64,${Buffer.from(image).toString("base64")}`;
  const el = html(`
    <div style="width: 512px; height: 512px; display: flex; justify-content: center; align-items: center;">
      <div style="display: flex; align-items: center; gap: 16px;">
        <img src="${imageData}" style="width: 96px; height: 96px;" />
        <p style="font-family: Roboto; font-size: 68px; font-weight: 700; text-align: center;">${value.toLocaleString()}</p>
      </div>
    </div>
  `);
  const artwork = await satori(
    el,
    {
      width: 512,
      height: 512,
      fonts: [{ name: "Roboto", data: robotoBold, weight: 700, style: "normal" }],
    },
  )

  setHeaders(event, { "Content-Type": "image/svg+xml" });
  setResponseStatus(event, 200);
  return artwork;
});
