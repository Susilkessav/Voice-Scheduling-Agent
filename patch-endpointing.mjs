const assistantId = "c0bfba13-71f0-40d3-9422-bc75f3fe1b7e";
const apiKey = "4d82d132-3008-45a5-8b6e-079d302fd7eb";

// Update the startSpeakingPlan to add more delay
// Default onPunctuationSeconds was 0.1 (too fast), let's increase to 1.0
// waitSeconds helps delay before actually speaking after endpointing
const patchPayload = {
  startSpeakingPlan: {
    waitSeconds: 0.6,
    transcriptionEndpointingPlan: {
      onPunctuationSeconds: 1.0,
      onNoPunctuationSeconds: 2.0,
      onNumberSeconds: 1.0
    }
  }
};

console.log("Patching assistant endpointing plan...");
const res = await fetch('https://api.vapi.ai/assistant/' + assistantId, {
    method: 'PATCH',
    headers: {
        'Authorization': 'Bearer ' + apiKey,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(patchPayload)
});

const result = await res.json();
console.log(result.id ? "Successfully patched!" : "Failed: " + JSON.stringify(result));
