import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/download")({
  head: () => ({
    meta: [
      { title: "Download do plugin | Savior Jordâni Studio" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => <Navigate to="/dashboard/download" replace />,
});
