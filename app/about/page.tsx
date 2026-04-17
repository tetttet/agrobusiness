import type { Metadata } from "next";
import AboutUs from "@/components/sections/about-us";
import {
  ABOUT_DESCRIPTION,
  createPageTitle,
} from "@/constants/site-metadata";

export const metadata: Metadata = {
  title: createPageTitle("О компании"),
  description: ABOUT_DESCRIPTION,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: createPageTitle("О компании"),
    description: ABOUT_DESCRIPTION,
    url: "/about",
  },
  twitter: {
    title: createPageTitle("О компании"),
    description: ABOUT_DESCRIPTION,
  },
};

const Page = () => {
  return (
    <div>
      <AboutUs />
    </div>
  );
};

export default Page;
