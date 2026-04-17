import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE_NAME, SOCIAL_IMAGE_ALT } from "@/constants/site-metadata";

export const SOCIAL_IMAGE_SIZE = {
  width: 1200,
  height: 630,
} as const;

export const SOCIAL_IMAGE_CONTENT_TYPE = "image/png";
export const SOCIAL_IMAGE_BADGES = [
  "Direct supplies",
  "Astana, Kazakhstan",
  "Modern farm equipment",
] as const;

let logoDataUrlPromise: Promise<string> | null = null;

const getLogoDataUrl = async () => {
  if (!logoDataUrlPromise) {
    logoDataUrlPromise = readFile(join(process.cwd(), "public/logo.png")).then(
      (logo) => `data:image/png;base64,${logo.toString("base64")}`,
    );
  }

  return logoDataUrlPromise;
};

export async function renderBrandSocialImage() {
  const logoSrc = await getLogoDataUrl();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, #16110d 0%, #4b2a23 48%, #c97c50 100%)",
        color: "#fffaf2",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          background:
            "radial-gradient(circle at 16% 18%, rgba(252, 227, 188, 0.24) 0%, rgba(252, 227, 188, 0) 34%), radial-gradient(circle at 84% 22%, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0) 28%), radial-gradient(circle at 78% 82%, rgba(249, 194, 118, 0.28) 0%, rgba(249, 194, 118, 0) 30%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 34,
          display: "flex",
          border: "1px solid rgba(255, 255, 255, 0.16)",
          borderRadius: 36,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: -110,
          bottom: -170,
          width: 460,
          height: 460,
          display: "flex",
          borderRadius: 999,
          background: "rgba(255, 255, 255, 0.06)",
        }}
      />

      <div
        style={{
          position: "absolute",
          right: 86,
          top: 84,
          width: 180,
          height: 180,
          display: "flex",
          borderRadius: 999,
          border: "1px solid rgba(255, 255, 255, 0.14)",
        }}
      />

      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 62px",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 22,
            }}
          >
            <div
              style={{
                width: 108,
                height: 108,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 28,
                background: "rgba(255, 255, 255, 0.11)",
                border: "1px solid rgba(255, 255, 255, 0.16)",
              }}
            >
              {/* ImageResponse uses a regular img element instead of next/image. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logoSrc}
                alt={SOCIAL_IMAGE_ALT}
                width={76}
                height={58}
                style={{ objectFit: "contain" }}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 18,
                  letterSpacing: 6,
                  textTransform: "uppercase",
                  color: "#f0d2af",
                }}
              >
                {SITE_NAME}
              </div>

              <div
                style={{
                  display: "flex",
                  fontSize: 24,
                  color: "#fff8f0",
                }}
              >
                Agricultural machinery and mounted equipment
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "14px 22px",
              borderRadius: 999,
              background: "rgba(255, 255, 255, 0.09)",
              border: "1px solid rgba(255, 255, 255, 0.16)",
              fontSize: 18,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#fff3e0",
            }}
          >
            Astana
          </div>
        </div>

        <div
          style={{
            maxWidth: 780,
            display: "flex",
            flexDirection: "column",
            gap: 22,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: "#f0d2af",
            }}
          >
            Agro business for modern farms
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 76,
              lineHeight: 1.02,
              fontWeight: 700,
              letterSpacing: -2,
            }}
          >
            Equipment that works in the field, not only in the catalog
          </div>

          <div
            style={{
              display: "flex",
              maxWidth: 760,
              fontSize: 28,
              lineHeight: 1.35,
              color: "rgba(255, 248, 240, 0.82)",
            }}
          >
            Direct supplies of mowers, sprayers, disc harrows and other agro
            equipment for farms across Kazakhstan.
          </div>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 14,
            }}
          >
            {SOCIAL_IMAGE_BADGES.map((badge) => (
              <div
                key={badge}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "12px 18px",
                  borderRadius: 999,
                  border: "1px solid rgba(255, 255, 255, 0.14)",
                  background: "rgba(255, 255, 255, 0.07)",
                  fontSize: 17,
                  color: "rgba(255, 248, 240, 0.92)",
                }}
              >
                {badge}
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 20,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#f0d2af",
            }}
          >
            agro business astana
          </div>
        </div>
      </div>
    </div>
  );
}
