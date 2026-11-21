// Cloudinary resizes on the fly when the size goes into the URL, so a grid never downloads the full photo.
export function sized(src: string, width: number) {
  if (!src.includes("res.cloudinary.com") || !src.includes("/upload/")) return src
  return src.replace("/upload/", `/upload/c_limit,w_${width},q_auto,f_auto/`)
}
