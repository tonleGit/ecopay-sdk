npm run clean

echo "Run type checking before build"
npm run typecheck

echo "Building..."
npm run build && rm -rf lib/test*

echo "Publish..."
npm publish