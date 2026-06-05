import { after } from "next/server";
import { sendBookingNotification, sendBookingAcknowledgment } from "@/lib/email";
import { errorResponse, successResponse, checkRateLimit } from "@/lib/api-helpers";

const bookingSchema = {
  validate(data: Record<string, unknown>): string | null {
    if (!data.vehicleName || typeof data.vehicleName !== "string" || data.vehicleName.trim().length < 1)
      return "Vehicle name is required";
    if (!data.serviceType || typeof data.serviceType !== "string")
      return "Service type is required";
    if (!data.pickupDate || typeof data.pickupDate !== "string")
      return "Pickup date is required";
    if (!data.pickupTime || typeof data.pickupTime !== "string")
      return "Pickup time is required";
    if (!data.fullName || typeof data.fullName !== "string" || data.fullName.trim().length < 2)
      return "Full name must be at least 2 characters";
    if (!data.mobile || typeof data.mobile !== "string" || data.mobile.trim().length < 5)
      return "Valid mobile number is required";
    if (!data.email || typeof data.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      return "Valid email is required";
    if (!data.city || typeof data.city !== "string" || data.city.trim().length < 1)
      return "City is required";
    if (data.agreeToContact !== true)
      return "You must agree to be contacted";
    return null;
  },
};

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(`booking:${ip}`, 5, 60_000)) {
      return errorResponse("Too many requests. Please try again later.", 429);
    }

    const body = await request.json();
    const validationError = bookingSchema.validate(body);
    if (validationError) {
      return errorResponse(validationError, 400);
    }

    const {
      vehicleName,
      serviceType,
      price,
      pickupDate,
      returnDate,
      pickupTime,
      pickupLocation,
      dropLocation,
      fullName,
      mobile,
      email,
      city,
      specialRequirements,
    } = body as {
      vehicleName: string;
      serviceType: string;
      price: string;
      pickupDate: string;
      returnDate?: string;
      pickupTime: string;
      pickupLocation?: string;
      dropLocation?: string;
      fullName: string;
      mobile: string;
      email: string;
      city: string;
      specialRequirements?: string;
    };

    after(async () => {
      try {
        await Promise.all([
          sendBookingNotification({
            vehicleName,
            serviceType,
            price,
            pickupDate,
            returnDate,
            pickupTime,
            pickupLocation,
            dropLocation,
            fullName,
            mobile,
            email,
            city,
            specialRequirements,
          }),
          sendBookingAcknowledgment({
            vehicleName,
            serviceType,
            price,
            pickupDate,
            returnDate,
            pickupTime,
            pickupLocation,
            dropLocation,
            fullName,
            mobile,
            email,
            city,
            specialRequirements,
          }),
        ]);
      } catch (err) {
        console.error("Failed to send booking emails:", err);
      }
    });

    return successResponse(
      { message: "Your inquiry has been sent successfully! Our team will contact you shortly." },
      200,
    );
  } catch {
    return errorResponse("Invalid request payload.", 400);
  }
}
