import lookupDirectory from "./utils/loadLibrary";
import settings from "./utils/settings";

export default function runStartupTasks() {
  lookupDirectory(settings.library.path.get(), true)
    .catch(e => console.error(3));
}