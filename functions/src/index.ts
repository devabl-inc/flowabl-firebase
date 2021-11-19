import * as functions from "firebase-functions";
import axios from "axios";

// Firebase Functions for different events

// See auth trigger documentation https://firebase.google.com/docs/functions/auth-events
exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
  const email = user.email;
  const displayName = user.displayName;
  return sendWelcomeEmail(email, displayName);
});

// Sends a welcome email to the given user.
async function sendWelcomeEmail(email: string | undefined, displayName: string | undefined) {
  const FLOW_WEBOOK_URL = "https://app.flowabl.io/services/listener/webhook";
  const JOIN_EMAIL_WORKFLOW_ID = "61454e2d1000b141daa8f85f";

  // See env config https://firebase.google.com/docs/functions/config-env
  const FLOW_ACCESS_TOKEN = functions.config().welcome_email.flow_access_token;

  try {
    await axios.post(
      `${FLOW_WEBOOK_URL}?workflowId=${JOIN_EMAIL_WORKFLOW_ID}&type=generic&access_token=${FLOW_ACCESS_TOKEN}`,
      { name: displayName, email }
    );
  } catch (err) {
    console.log(err);
  }
  return null;
}
