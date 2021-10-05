import * as functions from "firebase-functions";
import axios from "axios";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
  // [END onCreateTrigger]
  // [START eventAttributes]
  const email = user.email; // The email of the user.
  const displayName = user.displayName; // The display name of the user.
  // [END eventAttributes]

  return sendWelcomeEmail(email, displayName);
});

// Sends a welcome email to the given user.
async function sendWelcomeEmail(email: string | undefined, displayName: string | undefined) {
  const FLOW_WEBOOK_URL = "https://app.flowabl.io/services/listener/webhook";
  const JOIN_EMAIL_WORKFLOW_ID = "61454e2d1000b141daa8f85f";
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
