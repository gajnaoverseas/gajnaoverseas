// Banner data for the Hero component

export interface BannerSlide {
  title: string;
  background: string;
  mobileBackground: string; // Mobile-specific background image
  description: string; // Single paragraph description
}

const bannerData: BannerSlide[] = [
     {
    title: "Diverse Ecosystem",
    background: "/banners/b9.webp", // Using placeholder until proper image is added
    mobileBackground: "/banners/b5.webp",
    description: "Diverse ecosystem with rich flora and fauna"
   },
  {
    title: "Shade Grown",
    background: "/banners/b1.webp",
    mobileBackground: "/banners/b1.webp", // Using same image for mobile for now
    description: "100% of Indian Coffee is grown under India's forest canopy"
  },
  
  {
    title: "Hand Picked",
    background: "/banners/b8.webp", // Using placeholder until proper image is added
    mobileBackground: "/banners/b8.webp",
    description: "Handpicked on India's coffee slopes"
  },
  {
    title: "Sun Dried",
    background: "/banners/b2.webp", // Using placeholder until proper image is added
    mobileBackground: "/banners/b2.webp",       
    description: "Sun-dried on open Indian patios"
  },
  {
    title: "Intercropping",
    background: "/banners/b3.webp", // Using placeholder until proper image is added
    mobileBackground: "/banners/b3.webp",
    description: "Intercropped with spices and fruits"
   },
   {
    title: "High Grown",
    background: "/banners/b5.webp", // Using placeholder until proper image is added
    mobileBackground: "/banners/b5.webp",
    description: "Mostly high grown at altitudes above 1000m"
   },

   {
    title: "Eco-Friendly Techniques",
    background: "/banners/b6.webp", // Using placeholder until proper image is added   
    mobileBackground: "/banners/b6.webp",
    description: "Eco-friendly cultivation techniques"
   },
   {
    title: "Dense Beans",
    background: "/banners/b10.webp", // Using placeholder until proper image is added   
    mobileBackground: "/banners/b10.webp",
    description: "Full-bodied, slightly acidic with exciting aroma"
   },
 ];

export default bannerData;