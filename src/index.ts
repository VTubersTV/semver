/**
 * Semantic Versioning Parser and Validator
 * Implements SemVer 2.0.0 specification with VTubersTV extensions
 */

import { approvedThemes } from "./pub";
interface Version {
  major: number;
  minor: number;
  patch: number;
  prerelease?: string[];
  buildMetadata?: string;
}

interface PublicVersion {
  theme: string;
  version: string;
  status?: string;
}

interface VersionMapping {
  internalVersion: string;
  publicVersion: string;
  releaseDate: string;
  theme: string;
  status: string;
}

class SemVer {
  private static versionRegex =
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
  private static publicVersionRegex =
    /^([A-Z][a-zA-Z]+)-(\d+\.\d+)(?:-(alpha|beta|rc))?$/;

  // Approved themes for public versioning
  private static approvedThemes = approvedThemes;

  /**
   * Parse a version string into its components
   */
  static parse(version: string): Version {
    const match = version.trim().match(this.versionRegex);
    if (!match) {
      throw new Error("Invalid version string");
    }

    const [, major, minor, patch, prerelease, buildMetadata] = match;

    return {
      major: parseInt(major),
      minor: parseInt(minor),
      patch: parseInt(patch),
      prerelease: prerelease ? prerelease.split(".") : undefined,
      buildMetadata: buildMetadata || undefined,
    };
  }

  /**
   * Parse a public version string (e.g., Aurora-1.1-beta)
   */
  static parsePublicVersion(version: string): PublicVersion {
    const match = version.trim().match(this.publicVersionRegex);
    if (!match) {
      throw new Error("Invalid public version string");
    }

    const [, theme, ver, status] = match;

    if (!this.approvedThemes.includes(theme)) {
      throw new Error(
        `Invalid theme name. Must be one of: ${this.approvedThemes.join(", ")}`
      );
    }

    return {
      theme,
      version: ver,
      status: status || "stable",
    };
  }

  /**
   * Create a version mapping between internal and public versions
   */
  static createVersionMapping(
    internalVersion: string,
    publicVersion: string,
    releaseDate: string
  ): VersionMapping {
    const internal = this.parse(internalVersion);
    const public_ = this.parsePublicVersion(publicVersion);

    return {
      internalVersion,
      publicVersion,
      releaseDate,
      theme: public_.theme,
      status: public_.status || "stable",
    };
  }

  /**
   * Validate if a string is a valid SemVer version
   */
  static isValid(version: string): boolean {
    try {
      this.parse(version);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Validate if a string is a valid public version
   */
  static isValidPublicVersion(version: string): boolean {
    try {
      this.parsePublicVersion(version);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Compare two versions
   * Returns: 1 if v1 > v2, -1 if v1 < v2, 0 if equal
   */
  static compare(v1: string, v2: string): number {
    const ver1 = this.parse(v1);
    const ver2 = this.parse(v2);

    // Compare major.minor.patch
    if (ver1.major !== ver2.major) return ver1.major > ver2.major ? 1 : -1;
    if (ver1.minor !== ver2.minor) return ver1.minor > ver2.minor ? 1 : -1;
    if (ver1.patch !== ver2.patch) return ver1.patch > ver2.patch ? 1 : -1;

    // Compare pre-release if present
    if (!ver1.prerelease && !ver2.prerelease) return 0;
    if (!ver1.prerelease) return 1;
    if (!ver2.prerelease) return -1;

    const minLength = Math.min(ver1.prerelease.length, ver2.prerelease.length);
    for (let i = 0; i < minLength; i++) {
      const a = ver1.prerelease[i];
      const b = ver2.prerelease[i];

      const aNum = parseInt(a);
      const bNum = parseInt(b);

      if (isNaN(aNum) && isNaN(bNum)) {
        if (a > b) return 1;
        if (a < b) return -1;
        continue;
      }

      if (isNaN(aNum)) return 1;
      if (isNaN(bNum)) return -1;
      if (aNum > bNum) return 1;
      if (aNum < bNum) return -1;
    }

    return ver1.prerelease.length - ver2.prerelease.length;
  }

  /**
   * Custom version increment with optional pre-release and build metadata
   */
  static increment(
    version: string,
    type: "major" | "minor" | "patch",
    prerelease?: string,
    buildMetadata?: string
  ): string {
    const ver = this.parse(version);

    switch (type) {
      case "major":
        ver.major++;
        ver.minor = 0;
        ver.patch = 0;
        break;
      case "minor":
        ver.minor++;
        ver.patch = 0;
        break;
      case "patch":
        ver.patch++;
        break;
    }

    ver.prerelease = prerelease ? [prerelease] : undefined;
    ver.buildMetadata = buildMetadata;

    return this.stringify(ver);
  }

  /**
   * Convert Version object back to string
   */
  static stringify(version: Version): string {
    let str = `${version.major}.${version.minor}.${version.patch}`;
    if (version.prerelease?.length) {
      str += `-${version.prerelease.join(".")}`;
    }
    if (version.buildMetadata) {
      str += `+${version.buildMetadata}`;
    }
    return str;
  }

  /**
   * Convert PublicVersion object back to string
   */
  static stringifyPublicVersion(version: PublicVersion): string {
    let str = `${version.theme}-${version.version}`;
    if (version.status && version.status !== "stable") {
      str += `-${version.status}`;
    }
    return str;
  }

  /**
   * Check if version satisfies a range (basic implementation)
   */
  static satisfies(version: string, range: string): boolean {
    // Simple range check implementation
    // Could be extended for more complex ranges like ^1.2.3, ~1.2.3, etc.
    const ver = this.parse(version);
    const rangeVer = this.parse(range);

    return (
      ver.major === rangeVer.major &&
      ver.minor === rangeVer.minor &&
      ver.patch === rangeVer.patch
    );
  }
}

export default SemVer;
