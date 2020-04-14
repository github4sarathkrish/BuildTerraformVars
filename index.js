const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `who-to-greet` input defined in action metadata file
  var inputJson = core.getInput('input-json');
  var workSpaceId = core.getInput('workspaceid');
  console.log(`Input ${inputJson}`);
  var outJson = {};
  outJson.data=$JSON.parse(inputJson);
  outJson.relationships = {};
  outJson.relationships.workspace={};
  outJson.relationships.workspace.data = {};
  outJson.relationships.workspace.data.id = workSpaceId;
  outJson.relationships.workspace.data.type = "workspaces"
  core.setOutput("output-json", JSON.stringify(outJson));
  const out = JSON.stringify(outJson);
  console.log(`Out: ${out}`);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}