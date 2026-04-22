import { getNextSequence } from "./getNextSequence.js";

/**
 * Format:
 * #OD0001
 * #OD0002
 */
export const generateOrderCode = async () => {
  const seq = await getNextSequence("order");

  return `#OD${String(seq).padStart(4, "0")}`;
};