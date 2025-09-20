import { pathsToModuleNameMapper } from "ts-jest";
import p from "./tsconfig.json" with {type: "json"};
import type { Config } from "jest";

const jestConfig: Config = {
  testEnvironment: 'jsdom',
  transform: {
    ".(ts|tsx)": "ts-jest"
  },
  setupFiles: ['<rootDir>/jest.setup.ts'],
  modulePaths: ['<rootDir>'],
  roots: ['<rootDir>'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(p.compilerOptions.paths, { prefix: '<rootDir>/' }),
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy"
  }
};

export default jestConfig;