npm run clean

echo "Run type checking before build"
npm run typecheck

echo "Building..."
npm run build

echo "Publish..."
npm publish