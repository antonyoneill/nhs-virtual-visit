import { SCHEDULED, COMPLETE } from "../../src/helpers/visitStatus";

const retrieveVisitById = ({ getDb }) => async ({ id, wardId }) => {
  if (!id) {
    return { scheduledCall: null, error: "An id must be provided." };
  }
  if (!wardId) {
    return { scheduledCall: null, error: "A wardId must be provided." };
  }

  const db = await getDb();

  try {
    const scheduledCall = await db.one(
      `SELECT * FROM scheduled_calls_table
         WHERE id = $1 AND ward_id = $2 AND status = ANY(ARRAY[$3,$4]::text[]) AND pii_cleared_at IS NULL
         LIMIT 1`,
      [id, wardId, SCHEDULED, COMPLETE]
    );

    return {
      scheduledCall: {
        id: scheduledCall.id,
        patientName: scheduledCall.patient_name,
        recipientName: scheduledCall.recipient_name,
        recipientNumber: scheduledCall.recipient_number,
        recipientEmail: scheduledCall.recipient_email,
        callTime: scheduledCall.call_time,
        callId: scheduledCall.call_id,
        provider: scheduledCall.provider,
        callPassword: scheduledCall.call_password,
        status: scheduledCall.status,
      },
      error: null,
    };
  } catch (error) {
    return {
      scheduledCall: null,
      error: error.message,
    };
  }
};

export default retrieveVisitById;