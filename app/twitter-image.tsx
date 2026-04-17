import { ImageResponse } from "next/og";
import {
  SOCIAL_IMAGE_CONTENT_TYPE,
  SOCIAL_IMAGE_SIZE,
  renderBrandSocialImage,
} from "./brand-social-image";
import { SOCIAL_IMAGE_ALT } from "@/constants/site-metadata";

export const alt = SOCIAL_IMAGE_ALT;
export const size = SOCIAL_IMAGE_SIZE;
export const contentType = SOCIAL_IMAGE_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(await renderBrandSocialImage(), {
    ...size,
  });
}
