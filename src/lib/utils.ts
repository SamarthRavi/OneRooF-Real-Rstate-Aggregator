
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  amount: number,
  currency: string = "INR",
  locale: string = "en-IN"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Get a property type label with proper capitalization
export function getPropertyTypeLabel(type: string): string {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

// Helper function to get city-specific images
export function getCityImage(city: string, index: number): string {
  // Define image IDs for each specific city
  const cityImages: Record<string, string> = {
    'Mumbai': '1566552881978-c07962d91f8e?auto=format&fit=crop&w=600&h=350&q=80', // Mumbai Marine Drive
    'Delhi': '1587474260771-304f4d9d4c6d?auto=format&fit=crop&w=600&h=350&q=80', // India Gate in Delhi
    'Bangalore': '1596005554388-7e0586850bb2?auto=format&fit=crop&w=600&h=350&q=80', // Bangalore cityscape
    'Hyderabad': '1605649471620-3249a77810b8?auto=format&fit=crop&w=600&h=350&q=80', // Charminar in Hyderabad
    'Chennai': '1613454650525-cef65f6e8b61?auto=format&fit=crop&w=600&h=350&q=80', // Marina Beach in Chennai
    'Kolkata': '1588416499018-b8646b506aa8?auto=format&fit=crop&w=600&h=350&q=80', // Howrah Bridge in Kolkata
    'Pune': '1590353891071-ab0b078ffd6c?auto=format&fit=crop&w=600&h=350&q=80', // Pune cityscape
    'Ahmedabad': '1593938554668-3db6d0e8051a?auto=format&fit=crop&w=600&h=350&q=80', // Sabarmati Riverfront
    'Jaipur': '1563006814304-415a200d8eca?auto=format&fit=crop&w=600&h=350&q=80', // Hawa Mahal in Jaipur
    'Surat': '1574870399767-192305a550a5?auto=format&fit=crop&w=600&h=350&q=80', // Surat cityscape
  };
  
  // Better default fallback images for cities without specific images
  const defaultImages = [
    '1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&h=350&q=80', // Modern luxury home
    '1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&h=350&q=80', // White house with pool
    '1600210492493-0946911123ea?auto=format&fit=crop&w=600&h=350&q=80', // Modern apartment building
    '1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&h=350&q=80', // Beautiful house by lake
    '1568605114967-8130f3a36994?auto=format&fit=crop&w=600&h=350&q=80'  // Modern architecture
  ];
  
  return cityImages[city] || defaultImages[index % defaultImages.length];
}
