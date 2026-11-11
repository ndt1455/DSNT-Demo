/**
 * Mock service layer. UI code imports services ONLY from "@/lib/mock" (later: "@/lib/api"),
 * never from fetch() directly, so swapping to a real backend touches this folder only.
 */
export * from "./delay";
export * from "./identity";
export * from "./otp";
export * from "./products";
