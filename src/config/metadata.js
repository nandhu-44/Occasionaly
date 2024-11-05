// src/config/metadata.js
export const siteConfig = {
  name: "Occasionaly",
  description: "Make your occasions memorable",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://www.occasionaly.co",
  ogImage: "/og-image.jpg",
  links: {
    github: "https://github.com/nandhu-44/occasionaly",
  },
  creator: "nandhu-44",
};

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  noIndex = false,
} = {}) {
  return {
    title: {
      default: title,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    openGraph: {
      title,
      description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      images: [{ url: image }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@" + siteConfig.links.twitter.split("/").pop(),
    },
    icons: {
      icon: "/logo.svg",
      shortcut: "/logo.svg",
      apple: "/apple-touch-icon.png",
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
      },
    },
  };
}
