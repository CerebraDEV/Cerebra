import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatEther, parseEther, keccak256, stringToHex } from "viem"

/**
 * Combines class names using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats an Ethereum address to a shorter version
 */
export function formatAddress(address: string | undefined): string {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

/**
 * Formats an Ethereum balance to a human-readable format
 */
export function formatBalance(balance: bigint | undefined): string {
  if (balance === undefined) return '0'
  return formatEther(balance)
}

/**
 * Parses a human-readable Ethereum amount to wei
 */
export function parseBalance(amount: string): bigint {
  return parseEther(amount)
}

/**
 * Truncates a string to a specified length
 */
export function truncateString(str: string, length: number): string {
  if (str.length <= length) return str
  return `${str.slice(0, length)}...`
}

/**
 * Generates a random color based on a string
 */
export function generateColorFromString(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  let color = '#'
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    color += ('00' + value.toString(16)).substr(-2)
  }
  return color
}

/**
 * Formats a date to a human-readable format
 */
export function formatDate(date: Date | number | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/**
 * Formats a number with commas
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('en-US')
}

/**
 * Calculates time ago from a date
 */
export function timeAgo(date: Date | number | string): string {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000)
  
  let interval = seconds / 31536000
  if (interval > 1) return Math.floor(interval) + ' years ago'
  
  interval = seconds / 2592000
  if (interval > 1) return Math.floor(interval) + ' months ago'
  
  interval = seconds / 86400
  if (interval > 1) return Math.floor(interval) + ' days ago'
  
  interval = seconds / 3600
  if (interval > 1) return Math.floor(interval) + ' hours ago'
  
  interval = seconds / 60
  if (interval > 1) return Math.floor(interval) + ' minutes ago'
  
  return Math.floor(seconds) + ' seconds ago'
}

/**
 * Generates a hash from a string input
 * @param input The string to hash
 * @returns A hex string of the hash
 */
export function generateHash(input: string): string {
  if (!input) return '';
  const hexInput = stringToHex(input, { size: 32 });
  return keccak256(hexInput);
}

/**
 * Validates if a string is a valid hash
 * @param hash The hash string to validate
 * @returns boolean indicating if the hash is valid
 */
export function isValidHash(hash: string): boolean {
  if (!hash) return false;
  // Check if it's a hex string of length 66 (0x + 64 chars)
  return /^0x[a-fA-F0-9]{64}$/.test(hash);
}

/**
 * Formats a number as ETH with specified decimals
 * @param value The value to format
 * @param decimals Number of decimal places
 * @returns Formatted ETH string
 */
export function formatETH(value: bigint | number, decimals = 4): string {
  const num = typeof value === 'bigint' ? Number(value) / 1e18 : value;
  return num.toFixed(decimals);
}

/**
 * Converts a file to a data URL
 * @param file The file to convert
 * @returns Promise that resolves to a data URL
 */
export function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Generates a token URI from metadata
 * @param name The name of the NFT
 * @param description The description of the NFT
 * @param imageUrl The URL of the NFT image
 * @param attributes Additional attributes for the NFT
 * @returns A token URI string
 */
export function generateTokenURI(
  name: string,
  description: string,
  imageUrl: string,
  attributes: Record<string, any> = {}
): string {
  const metadata = {
    name,
    description,
    image: imageUrl,
    attributes,
  };
  
  // In a real application, you would upload this to IPFS or another storage service
  // For now, we'll return a data URL
  return `data:application/json;base64,${btoa(JSON.stringify(metadata))}`;
}

/**
 * Validates if a string is a valid token URI
 * @param uri The URI to validate
 * @returns boolean indicating if the URI is valid
 */
export function isValidTokenURI(uri: string): boolean {
  if (!uri) return false;
  
  // Check if it's a data URL
  if (uri.startsWith('data:')) return true;
  
  // Check if it's a valid HTTP(S) URL
  try {
    new URL(uri);
    return uri.startsWith('http://') || uri.startsWith('https://');
  } catch {
    return false;
  }
} 