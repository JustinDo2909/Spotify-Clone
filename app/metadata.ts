// metadata.ts
export interface Metadata {
  title: string;
  description: string;
  icons: {
    icon: {
      url: string;
    }[];
  };
}

export const metadata: Metadata = {
  title: "Justin Spotify", // Ensure this is always a string
  description: "A brief description of your app.",
  icons: {
    icon: [{ url: "/favicon.ico?v=4" }],
  },
};
