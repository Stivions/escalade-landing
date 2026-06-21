import { cpSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const standaloneRoot = join(root, ".next", "standalone");
const standaloneNextRoot = join(standaloneRoot, ".next");

if (!existsSync(standaloneRoot)) {
  throw new Error("Standalone output was not generated. Run `next build` first.");
}

mkdirSync(standaloneNextRoot, { recursive: true });

cpSync(join(root, ".next", "static"), join(standaloneNextRoot, "static"), {
  recursive: true,
  force: true,
});

if (existsSync(join(root, "public"))) {
  cpSync(join(root, "public"), join(standaloneRoot, "public"), {
    recursive: true,
    force: true,
  });
}

console.log("Standalone assets copied.");
