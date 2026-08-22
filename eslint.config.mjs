import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const config = [
  {
    ignores: [".next-dev-final/**", ".next-playwright/**", "tmp/**", "output/**"],
  },
  ...nextCoreWebVitals,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "react/no-unescaped-entities": "off",
    },
  },
];

export default config;
