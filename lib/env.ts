export const validateEnv = () => {
  const requiredVars = [
    'GEMINI_API_KEY',
    'MONGODB_URI',
    'SUPABASE_URL',
    'SUPABASE_ANON_KEY'
  ];

  const missing = requiredVars.filter(varName => !process.env[varName]);

  if (missing.length > 0) {
    throw new Error(`Missing environment variables: ${missing.join(', ')}`);
  }
};

// Call in critical paths (e.g., top of API routes)