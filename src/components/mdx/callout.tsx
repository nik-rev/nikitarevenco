// INFO: Classes that style items inside of callouts are placed within tailwind.config

import {
  Flame,
  Info,
  Lightbulb,
  type LucideIcon,
  PartyPopper,
  TriangleAlert,
} from "lucide-react";

import { type AlertColor } from "@/lib/callout-accent";

import { H4 } from "./heading";

type AlertData = {
  icon: LucideIcon;
  accent: Lowercase<AlertColor>;
};

const alertTypes = {
  note: {
    icon: Info,
    accent: "blue",
  },
  tip: {
    icon: Lightbulb,
    accent: "teal",
  },
  warning: {
    icon: TriangleAlert,
    accent: "yellow",
  },
  danger: {
    icon: Flame,
    accent: "red",
  },
  fact: {
    icon: PartyPopper,
    accent: "pink",
  },
} as const satisfies Record<string, AlertData>;

type AlertType = keyof typeof alertTypes;

export const isValidCalloutType = (str: string): str is AlertType =>
  Object.keys(alertTypes).includes(str);

export function Callout({
  alertType,
  title,
  children,
}: {
  alertType: AlertType;
  title: string;
  children: React.ReactNode;
}) {
  /* eslint security/detect-object-injection: off -- No user input here */
  const data = alertTypes[alertType];

  const icon = (
    <span className={`flex gap-x-2 text-${data.accent}`}>
      <span className="font-bold uppercase">{alertType}</span>
      <data.icon strokeWidth={2.4} />
    </span>
  );

  return (
    <aside
      className={`group relative block overflow-x-auto border-l-4 bleed max-sm:text-sm border-l-${data.accent} bg-${data.accent}/5 ${data.accent.toUpperCase()}`}
    >
      {title !== "" && (
        <span className="align-center -mb-2 mt-0 flex justify-between">
          {title !== "" && <H4 className="mt-0">{title}</H4>}
          {icon}
        </span>
      )}
      {children}
      {title === "" && (
        <span
          className={`absolute right-4 top-4 md:right-8 md:top-8 text-${data.accent}`}
        >
          {icon}
        </span>
      )}
    </aside>
  );
}