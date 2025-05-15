/**
 * VTubersTV Public Version Mapping
 * Contains the complete version history with rich metadata
 */

export interface FeatureFlag {
  name: string;
  description: string;
  enabled: boolean;
  rolloutPercentage?: number;
  requirements?: string[];
}

export interface ReleaseNote {
  type: "feature" | "enhancement" | "bugfix" | "security" | "breaking";
  title: string;
  description: string;
  issueId?: string;
  prId?: string;
}

export interface Contributor {
  username: string;
  role: "author" | "reviewer" | "tester";
  contributions: string[];
}

export interface VersionMetrics {
  performanceScore?: number;
  stabilityScore?: number;
  userSatisfaction?: number;
  activeUsers?: number;
  averageStreamDuration?: number;
}

export interface PublicVersionData {
  internalVersion: string;
  publicVersion: string;
  releaseDate: string;
  theme: {
    name: string;
    description: string;
    color: string;
    inspiration?: string;
  };
  status: "alpha" | "beta" | "rc" | "stable" | "deprecated";
  deprecationDate?: string;
  securityUpdates: boolean;
}

export const versionHistory: PublicVersionData[] = [
  {
    internalVersion: "1.0.0",
    publicVersion: "Aurora-1.0",
    releaseDate: "2024-01-15",
    theme: {
      name: "Aurora",
      description: "The first version of VTubersTV",
      color: "#7B68EE",
      inspiration: "Northern Lights",
    },
    status: "stable",
    securityUpdates: true,
  },
];

export const approvedThemes = versionHistory.map((v) => v.theme.name);

/**
 * Get version data by public version string
 */
export function getVersionData(
  publicVersion: string
): PublicVersionData | undefined {
  return versionHistory.find((v) => v.publicVersion === publicVersion);
}

/**
 * Get version data by internal version string
 */
export function getVersionByInternal(
  internalVersion: string
): PublicVersionData | undefined {
  return versionHistory.find((v) => v.internalVersion === internalVersion);
}

/**
 * Get all versions with a specific status
 */
export function getVersionsByStatus(
  status: PublicVersionData["status"]
): PublicVersionData[] {
  return versionHistory.filter((v) => v.status === status);
}

/**
 * Get the latest stable version
 */
export function getLatestStableVersion(): PublicVersionData | undefined {
  return versionHistory
    .filter((v) => v.status === "stable")
    .sort(
      (a, b) =>
        new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
    )[0];
}
