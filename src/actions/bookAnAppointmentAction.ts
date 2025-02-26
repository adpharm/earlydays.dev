import { bookAnAppointmentFormSchema } from "@/components/form/bookAnAppointmentFormSchema";
import { db } from "@/db/db";
import { bookAnAppointmentSubmissionsTable } from "@/db/schema";
import { sendBookingConfirmationEmail } from "@/lib/email/sendBookingConfirmationEmail.server";
import { ActionError, defineAction } from "astro:actions";
import { createInsertSchema } from "drizzle-zod";

export const bookAnAppointmentAction = {
  /**
   *
   *
   *
   *
   * Recieves the form submission to Book an appointment
   */
  bookAnAppointment: defineAction({
    input: bookAnAppointmentFormSchema,
    handler: async (inputData, context) => {
      // try to parse input data
      const parsedData = createInsertSchema(
        bookAnAppointmentSubmissionsTable
      ).parse({
        ...inputData.page1,
        ...inputData.page2,
        ...inputData.page3,

        is_first_visit:
          inputData.page1?.is_first_visit === "yes"
            ? true
            : inputData.page1?.is_first_visit === "no"
            ? false
            : null,
      });

      // try to insert the data into the database
      const newAppointmentSubmission = (
        await db
          .insert(bookAnAppointmentSubmissionsTable)
          .values(parsedData)
          .returning()
      ).at(0);

      if (!newAppointmentSubmission) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create appointment",
        });
      }

      // send the confirmation email
      await sendBookingConfirmationEmail(newAppointmentSubmission);

      return {
        success: true,
        data: newAppointmentSubmission,
      };
    },
  }),
};
