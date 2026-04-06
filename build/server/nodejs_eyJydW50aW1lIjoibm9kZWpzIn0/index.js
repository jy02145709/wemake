import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, Link, redirect, UNSAFE_withComponentProps, useLocation, useNavigation, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts, useFetcher, data, useSearchParams, Form, NavLink, useOutletContext, useActionData } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import * as React from "react";
import React__default, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDownIcon, CheckIcon, MessageCircleIcon, BellIcon, LayoutDashboardIcon, UserIcon, SettingsIcon, LogOutIcon, EyeIcon, ChevronUpIcon, DotIcon, HeartIcon, LockIcon, ChevronLeftIcon, MoreHorizontalIcon, ChevronRightIcon, ChevronDown, ChevronUp, Check, StarIcon, XIcon, GithubIcon, FacebookIcon, LoaderCircle, ChevronRight, HomeIcon, SparklesIcon, RocketIcon, SendIcon } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { Settings, DateTime } from "luxon";
import { createBrowserClient, createServerClient, serializeCookieHeader, parseCookieHeader } from "@supabase/ssr";
import z$1, { z } from "zod";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as SelectPrimitive from "@radix-ui/react-select";
import { getDefaultClassNames, DayPicker } from "react-day-picker";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { OpenAI } from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { createClient } from "@supabase/supabase-js";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as RechartsPrimitive from "recharts";
import { LineChart, CartesianGrid, XAxis, Line, AreaChart, Area } from "recharts";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders
    });
  }
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const stylesheet = "/assets/app-BnvFh2Ls.css";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SeparatorPrimitive.Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    NavigationMenuPrimitive.Root,
    {
      "data-slot": "navigation-menu",
      "data-viewport": viewport,
      className: cn(
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        className
      ),
      ...props,
      children: [
        children,
        viewport && /* @__PURE__ */ jsx(NavigationMenuViewport, {})
      ]
    }
  );
}
function NavigationMenuList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    NavigationMenuPrimitive.List,
    {
      "data-slot": "navigation-menu-list",
      className: cn(
        "group flex flex-1 list-none items-center justify-center gap-1",
        className
      ),
      ...props
    }
  );
}
function NavigationMenuItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    NavigationMenuPrimitive.Item,
    {
      "data-slot": "navigation-menu-item",
      className: cn("relative", className),
      ...props
    }
  );
}
const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1"
);
function NavigationMenuTrigger({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    NavigationMenuPrimitive.Trigger,
    {
      "data-slot": "navigation-menu-trigger",
      className: cn(navigationMenuTriggerStyle(), "group", className),
      ...props,
      children: [
        children,
        " ",
        /* @__PURE__ */ jsx(
          ChevronDownIcon,
          {
            className: "relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180",
            "aria-hidden": "true"
          }
        )
      ]
    }
  );
}
function NavigationMenuContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    NavigationMenuPrimitive.Content,
    {
      "data-slot": "navigation-menu-content",
      className: cn(
        "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto",
        "group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none",
        className
      ),
      ...props
    }
  );
}
function NavigationMenuViewport({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "absolute top-full left-0 isolate z-50 flex justify-center"
      ),
      children: /* @__PURE__ */ jsx(
        NavigationMenuPrimitive.Viewport,
        {
          "data-slot": "navigation-menu-viewport",
          className: cn(
            "origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow md:w-[var(--radix-navigation-menu-viewport-width)]",
            className
          ),
          ...props
        }
      )
    }
  );
}
function NavigationMenuLink({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    NavigationMenuPrimitive.Link,
    {
      "data-slot": "navigation-menu-link",
      className: cn(
        "data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      "data-variant": variant,
      "data-size": size,
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
function DropdownMenu({
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Root, { "data-slot": "dropdown-menu", ...props });
}
function DropdownMenuTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Trigger,
    {
      "data-slot": "dropdown-menu-trigger",
      ...props
    }
  );
}
function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Content,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset,
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
        className
      ),
      ...props
    }
  ) });
}
function DropdownMenuGroup({
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Group, { "data-slot": "dropdown-menu-group", ...props });
}
function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": inset,
      "data-variant": variant,
      className: cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    DropdownMenuPrimitive.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      className: cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      checked,
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(CheckIcon, { className: "size-4" }) }) }),
        children
      ]
    }
  );
}
function DropdownMenuLabel({
  className,
  inset,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Label,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": inset,
      className: cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className
      ),
      ...props
    }
  );
}
function DropdownMenuSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: cn("bg-border -mx-1 my-1 h-px", className),
      ...props
    }
  );
}
function Avatar({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AvatarPrimitive.Root,
    {
      "data-slot": "avatar",
      className: cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      ),
      ...props
    }
  );
}
function AvatarImage({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AvatarPrimitive.Image,
    {
      "data-slot": "avatar-image",
      className: cn("aspect-square size-full", className),
      ...props
    }
  );
}
function AvatarFallback({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AvatarPrimitive.Fallback,
    {
      "data-slot": "avatar-fallback",
      className: cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      ),
      ...props
    }
  );
}
const menus = [
  {
    name: "Products",
    to: "/products",
    items: [
      {
        name: "Leaderboards",
        description: "See the top performers in your community",
        to: "/products/leaderboards"
      },
      {
        name: "Categories",
        description: "See the top categories in your community",
        to: "/products/categories"
      },
      {
        name: "Search",
        description: "Search for a product",
        to: "/products/search"
      },
      {
        name: "Submit a Product",
        description: "Submit a product to our community",
        to: "/products/submit"
      },
      {
        name: "Promote",
        description: "Promote a product to our community",
        to: "/products/promote"
      }
    ]
  },
  {
    name: "Jobs",
    to: "/jobs",
    items: [
      {
        name: "Remote Jobs",
        description: "Find a remote job in our community",
        to: "/jobs?location=remote"
      },
      {
        name: "Full-Time Jobs",
        description: "Find a full-time job in our community",
        to: "/jobs?type=full-time"
      },
      {
        name: "Freelance Jobs",
        description: "Find a freelance job in our community",
        to: "/jobs?type=freelance"
      },
      {
        name: "Internships",
        description: "Find an internship in our community",
        to: "/jobs?type=internship"
      },
      {
        name: "Submit a Job",
        description: "Submit a job to our community",
        to: "/jobs/submit"
      }
    ]
  },
  {
    name: "Community",
    to: "/community",
    items: [
      {
        name: "All Posts",
        description: "See all posts in our community",
        to: "/community"
      },
      {
        name: "Top Posts",
        description: "See the top posts in our community",
        to: "/community?sort=top"
      },
      {
        name: "New Posts",
        description: "See the new posts in our community",
        to: "/community?sort=new"
      },
      {
        name: "Create a Post",
        description: "Create a post in our community",
        to: "/community/submit"
      }
    ]
  },
  {
    name: "IdeasGPT",
    to: "/ideas"
  },
  {
    name: "Teams",
    to: "/teams",
    items: [
      {
        name: "All Teams",
        description: "See all teams in our community",
        to: "/teams"
      },
      {
        name: "Create a Team",
        description: "Create a team in our community",
        to: "/teams/create"
      }
    ]
  }
];
function Navigation({
  isLoggedIn,
  hasNotifications,
  hasMessages,
  username,
  avatar,
  name
}) {
  return /* @__PURE__ */ jsxs("nav", { className: "flex px-20 h-16 items-center justify-between backdrop-blur fixed top-0 left-0 right-0 z-50 bg-background/50", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "font-bold tracking-tighter text-lg", children: "wemake" }),
      /* @__PURE__ */ jsx(Separator, { orientation: "vertical", className: "h-6 mx-4" }),
      /* @__PURE__ */ jsx(NavigationMenu, { children: /* @__PURE__ */ jsx(NavigationMenuList, { children: menus.map((menu) => /* @__PURE__ */ jsx(NavigationMenuItem, { children: menu.items ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Link, { to: menu.to, prefetch: "intent", children: /* @__PURE__ */ jsx(NavigationMenuTrigger, { children: menu.name }) }),
        /* @__PURE__ */ jsx(NavigationMenuContent, { children: /* @__PURE__ */ jsx("ul", { className: "grid w-[600px] font-light gap-3 p-4 grid-cols-2", children: menu.items?.map((item) => /* @__PURE__ */ jsx(
          NavigationMenuItem,
          {
            className: cn([
              "select-none rounded-md transition-colors focus:bg-accent  hover:bg-accent",
              item.to === "/products/promote" && "col-span-2 bg-primary/10 hover:bg-primary/20 focus:bg-primary/20",
              item.to === "/jobs/submit" && "col-span-2 bg-primary/10 hover:bg-primary/20 focus:bg-primary/20"
            ]),
            children: /* @__PURE__ */ jsx(NavigationMenuLink, { asChild: true, children: /* @__PURE__ */ jsxs(
              Link,
              {
                className: "p-3 space-y-1 block leading-none no-underline outline-none",
                to: item.to,
                children: [
                  /* @__PURE__ */ jsx("span", { className: "text-sm font-medium leading-none", children: item.name }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm leading-snug text-muted-foreground", children: item.description })
                ]
              }
            ) })
          },
          item.name
        )) }) })
      ] }) : /* @__PURE__ */ jsx(Link, { className: navigationMenuTriggerStyle(), to: menu.to, children: menu.name }) }, menu.name)) }) })
    ] }),
    isLoggedIn ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", asChild: true, className: "relative", children: /* @__PURE__ */ jsxs(Link, { to: "/my/messages", children: [
        /* @__PURE__ */ jsx(MessageCircleIcon, { className: "w-4 h-4" }),
        hasMessages && /* @__PURE__ */ jsx("div", { className: "absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full", children: hasMessages })
      ] }) }),
      /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", asChild: true, className: "relative", children: /* @__PURE__ */ jsxs(Link, { to: "/my/notifications", children: [
        /* @__PURE__ */ jsx(BellIcon, { className: "w-4 h-4" }),
        hasNotifications && /* @__PURE__ */ jsx("div", { className: "absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full", children: hasNotifications })
      ] }) }),
      /* @__PURE__ */ jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Avatar, { children: avatar ? /* @__PURE__ */ jsx(AvatarImage, { className: "object-cover", src: avatar }) : /* @__PURE__ */ jsx(AvatarFallback, { children: name?.[0] }) }) }),
        /* @__PURE__ */ jsxs(DropdownMenuContent, { className: "w-56", children: [
          /* @__PURE__ */ jsxs(DropdownMenuLabel, { className: "flex flex-col", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: name }),
            /* @__PURE__ */ jsxs("span", { className: "text-xs text-muted-foreground", children: [
              "@",
              username
            ] })
          ] }),
          /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
          /* @__PURE__ */ jsxs(DropdownMenuGroup, { children: [
            /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, className: "cursor-pointer", children: /* @__PURE__ */ jsxs(Link, { to: "/my/dashboard", children: [
              /* @__PURE__ */ jsx(LayoutDashboardIcon, { className: "w-4 h-4 mr-2" }),
              "Dashboard"
            ] }) }),
            /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, className: "cursor-pointer", children: /* @__PURE__ */ jsxs(Link, { to: "/my/profile", children: [
              /* @__PURE__ */ jsx(UserIcon, { className: "w-4 h-4 mr-2" }),
              "Profile"
            ] }) }),
            /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, className: "cursor-pointer", children: /* @__PURE__ */ jsxs(Link, { to: "/my/settings", children: [
              /* @__PURE__ */ jsx(SettingsIcon, { className: "w-4 h-4 mr-2" }),
              "Settings"
            ] }) }),
            /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
            /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, className: "cursor-pointer", children: /* @__PURE__ */ jsxs(Link, { to: "/auth/logout", children: [
              /* @__PURE__ */ jsx(LogOutIcon, { className: "w-4 h-4 mr-2" }),
              "Logout"
            ] }) })
          ] })
        ] })
      ] })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsx(Button, { asChild: true, variant: "secondary", children: /* @__PURE__ */ jsx(Link, { to: "auth/login", children: "Login" }) }),
      /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "auth/join", children: "Join" }) })
    ] })
  ] });
}
const browserclient = createBrowserClient(
  "https://udrutdhrerteuakoxyyg.supabase.co",
  "sb_publishable_mFGMaV45wTbsZKSHXC6pPg_VqfjNhgM"
);
const makeSSRClient = (request) => {
  const headers = new Headers();
  const serverSideClient = createServerClient(
    "https://udrutdhrerteuakoxyyg.supabase.co",
    "sb_publishable_mFGMaV45wTbsZKSHXC6pPg_VqfjNhgM",
    {
      cookies: {
        getAll() {
          const parsed = parseCookieHeader(request.headers.get("Cookie") ?? "");
          return parsed.filter(
            (cookie) => typeof cookie.value === "string"
          ).map((cookie) => ({
            name: cookie.name,
            value: cookie.value
          }));
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            headers.append(
              "Set-Cookie",
              serializeCookieHeader(name, value, options)
            );
          });
        }
      }
    }
  );
  return {
    client: serverSideClient,
    headers
  };
};
const PAGE_SIZE = 10;
const productListSelect = `
product_id,
name,
tagline,
upvotes:stats->>upvotes,
views:stats->>views,
reviews:stats->>reviews
`;
const getProductsByDateRange = async (client, {
  startDate,
  endDate,
  limit,
  page = 1
}) => {
  const { data: data2, error } = await client.from("products").select(productListSelect).order("stats->>upvotes", { ascending: false }).gte("created_at", startDate.toISO()).lte("created_at", endDate.toISO()).range((page - 1) * limit, page * limit - 1);
  if (error) throw error;
  return data2;
};
const getProductPagesByDateRange = async (client, {
  startDate,
  endDate
}) => {
  const { count, error } = await client.from("products").select(`product_id`, { count: "exact", head: true }).gte("created_at", startDate.toISO()).lte("created_at", endDate.toISO());
  if (error) throw error;
  if (!count) return 1;
  return Math.ceil(count / PAGE_SIZE);
};
const getCategories = async (client) => {
  const { data: data2, error } = await client.from("categories").select("category_id, name, description");
  if (error) throw error;
  return data2;
};
const getCategory = async (client, { categoryId }) => {
  const { data: data2, error } = await client.from("categories").select("category_id, name, description").eq("category_id", categoryId).single();
  if (error) throw error;
  return data2;
};
const getProductsByCategory = async (client, {
  categoryId,
  page
}) => {
  const { data: data2, error } = await client.from("products").select(productListSelect).eq("category_id", categoryId).range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
  if (error) throw error;
  return data2;
};
const getCategoryPages = async (client, { categoryId }) => {
  const { count, error } = await client.from("products").select(`product_id`, { count: "exact", head: true }).eq("category_id", categoryId);
  if (error) throw error;
  if (!count) return 1;
  return Math.ceil(count / PAGE_SIZE);
};
const getProductsBySearch = async (client, { query, page }) => {
  const { data: data2, error } = await client.from("products").select(productListSelect).or(`name.ilike.%${query}%, tagline.ilike.%${query}%`).range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
  if (error) throw error;
  return data2;
};
const getPagesBySearch = async (client, { query }) => {
  const { count, error } = await client.from("products").select(`product_id`, { count: "exact", head: true }).or(`name.ilike.%${query}%, tagline.ilike.%${query}%`);
  if (error) throw error;
  if (!count) return 1;
  return Math.ceil(count / PAGE_SIZE);
};
const getProductById = async (client, { productId }) => {
  const { data: data2, error } = await client.from("product_overview_view").select("*").eq("product_id", Number(productId)).single();
  if (error) throw error;
  return data2;
};
const getReviews = async (client, { productId }) => {
  const { data: data2, error } = await client.from("reviews").select(
    `
        review_id,
        rating,
        review,
        created_at,
        user:profile!inner(
          name,username,avatar
        )
      `
  ).eq("product_id", Number(productId)).order("created_at", { ascending: false });
  if (error) throw error;
  return data2;
};
const getUserProfile = async (client, { username }) => {
  const { data: data2, error } = await client.from("profile").select(
    `
        profile_id,
        name,
        username,
        avatar,
        role,
        headline,
        bio
        `
  ).eq("username", username).single();
  if (error) {
    throw error;
  }
  return data2;
};
const getUserById = async (client, { id }) => {
  const { data: data2, error } = await client.from("profile").select(
    `
        profile_id,
        name,
        username,
        avatar,
        headline,
        bio,
        role
        `
  ).eq("profile_id", id).single();
  if (error) {
    throw error;
  }
  return data2;
};
const getUserProducts = async (client, { username }) => {
  const { data: data2, error } = await client.from("products").select(
    `
        ${productListSelect},
        profile!products_to_profile!inner (
            profile_id
        )
    `
  ).eq("profile.username", username);
  if (error) {
    throw error;
  }
  return data2;
};
const getUserPosts = async (client, { username }) => {
  const { data: data2, error } = await client.from("community_post_list_view").select("*").eq("author_username", username);
  if (error) {
    throw error;
  }
  return data2;
};
const getLoggedInUserId = async (client) => {
  const { data: data2, error } = await client.auth.getUser();
  if (error || data2.user === null) {
    throw redirect("/auth/login");
  }
  return data2.user.id;
};
const getProductsByUserId = async (client, { userId }) => {
  const { data: data2, error } = await client.from("products").select(`name, product_id`).eq("profile_id", userId);
  if (error) {
    throw error;
  }
  return data2;
};
const getNotifications = async (client, { userId }) => {
  const { data: data2, error } = await client.from("notifications").select(
    `
      notification_id,
      type,
      source:profile!source_id(
        profile_id,
        name,
        avatar
      ),
      product:products!product_id(
        product_id,
        name
      ),
      post:posts!post_id(
        post_id,
        title
      ),
      seen,
      created_at
      `
  ).eq("target_id", userId).order("created_at", { ascending: false });
  if (error) {
    throw error;
  }
  return data2;
};
const countNotifications = async (client, { userId }) => {
  const { count, error } = await client.from("notifications").select("*", { count: "exact", head: true }).eq("seen", false).eq("target_id", userId);
  if (error) {
    throw error;
  }
  return count ?? 0;
};
const getMessages = async (client, { userId }) => {
  const { data: data2, error } = await client.from("messages_view").select("*").eq("profile_id", userId).neq("other_profile_id", userId);
  if (error) {
    throw error;
  }
  return data2;
};
const getMessagesByMessagesRoomId = async (client, { messageRoomId, userId }) => {
  const { count, error: countError } = await client.from("message_room_members").select("*", { count: "exact", head: true }).eq("message_room_id", messageRoomId).eq("profile_id", userId);
  if (countError) {
    throw countError;
  }
  if (count === 0) {
    throw new Error("Message room not found");
  }
  const { data: data2, error } = await client.from("messages").select(
    `*
      `
  ).eq("message_room_id", messageRoomId).order("created_at", { ascending: true });
  if (error) {
    throw error;
  }
  return data2;
};
const getRoomsParticipant = async (client, { messageRoomId, userId }) => {
  const { count, error: countError } = await client.from("message_room_members").select("*", { count: "exact", head: true }).eq("message_room_id", messageRoomId).eq("profile_id", userId);
  if (countError) {
    throw countError;
  }
  if (count === 0) {
    throw new Error("Message room not found");
  }
  const { data: data2, error } = await client.from("message_room_members").select(
    `
      profile:profile!profile_id!inner(
        name,
        profile_id,
        avatar
      )
      `
  ).eq("message_room_id", messageRoomId).neq("profile_id", userId).single();
  if (error) {
    throw error;
  }
  return data2;
};
const sendMessageToRoom = async (client, {
  messageRoomId,
  message,
  userId
}) => {
  const { count, error: countError } = await client.from("message_room_members").select("*", { count: "exact", head: true }).eq("message_room_id", messageRoomId).eq("profile_id", userId);
  if (countError) {
    throw countError;
  }
  if (count === 0) {
    throw new Error("Message room not found");
  }
  const { error } = await client.from("messages").insert({
    content: message,
    message_room_id: Number(messageRoomId),
    sender_id: userId
  });
  if (error) {
    throw error;
  }
};
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}, {
  rel: "stylesheet",
  href: stylesheet
}];
function Layout({
  children
}) {
  Settings.defaultLocale = "ko";
  Settings.defaultZone = "Asia/Seoul";
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    className: "light",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [/* @__PURE__ */ jsx("main", {
        children
      }), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const loader$J = async ({
  request
}) => {
  const {
    client
  } = makeSSRClient(request);
  const {
    data: {
      user
    }
  } = await client.auth.getUser();
  if (user && user.id) {
    const profile = await getUserById(client, {
      id: user.id
    });
    const count = await countNotifications(client, {
      userId: user.id
    });
    return {
      user,
      profile,
      notificationsCount: count
    };
  }
  return {
    user: null,
    profile: null,
    notificationsCount: 0
  };
};
const root = UNSAFE_withComponentProps(function App({
  loaderData
}) {
  const {
    pathname
  } = useLocation();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const isLoggedIn = loaderData.user !== null;
  return /* @__PURE__ */ jsxs("div", {
    className: cn({
      "py-28 px-5 lg:px-20": !pathname.includes("/auth/"),
      "transition-opacity animate-pulse": isLoading
    }),
    children: [pathname.includes("/auth") ? null : /* @__PURE__ */ jsx(Navigation, {
      isLoggedIn,
      username: loaderData.profile?.username,
      avatar: loaderData.profile?.avatar,
      name: loaderData.profile?.name,
      hasNotifications: loaderData.notificationsCount > 0,
      hasMessages: false
    }), /* @__PURE__ */ jsx(Outlet, {
      context: {
        isLoggedIn,
        name: loaderData.profile?.name,
        userId: loaderData.user?.id,
        username: loaderData.profile?.username,
        avatar: loaderData.profile?.avatar
      }
    })]
  });
});
const ErrorBoundary$4 = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$4,
  Layout,
  default: root,
  links,
  loader: loader$J
}, Symbol.toStringTag, { value: "Module" }));
const Card = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    ),
    ...props
  }
));
Card.displayName = "Card";
const CardHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("text-2xl font-semibold leading-none tracking-tight", className),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex items-center p-6 pt-0", className),
    ...props
  }
));
CardFooter.displayName = "CardFooter";
function ProductCard({
  id,
  name,
  description,
  reviewsCount,
  viewsCount,
  votesCount
}) {
  return /* @__PURE__ */ jsx(Link, { to: `/products/${id}`, className: "block", children: /* @__PURE__ */ jsxs(Card, { className: "w-full flex items-center justify-between bg-transparent hover:bg-card/50", children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl font-semibold leading-none tracking-tight", children: name }),
      /* @__PURE__ */ jsx(CardDescription, { className: "text-muted-foreground", children: description }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mt-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-px text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsx(MessageCircleIcon, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsx("span", { children: reviewsCount })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-px text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsx(EyeIcon, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsx("span", { children: viewsCount })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(CardFooter, { className: "py-0", children: /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "flex flex-col h-14", children: [
      /* @__PURE__ */ jsx(ChevronUpIcon, { className: "size-4 shrink-0" }),
      /* @__PURE__ */ jsx("span", { children: votesCount })
    ] }) })
  ] }) });
}
function PostCard({
  id,
  title,
  author,
  authorAvatarUrl,
  category,
  postedAt,
  expanded = false,
  votesCount = 0,
  isUpvoted = false
}) {
  const fetcher = useFetcher();
  const optimisitcVotesCount = fetcher.state === "idle" ? votesCount : isUpvoted ? votesCount - 1 : votesCount + 1;
  const optimisitcIsUpvoted = fetcher.state === "idle" ? isUpvoted : !isUpvoted;
  const absorbClick = (e) => {
    e.preventDefault();
    fetcher.submit(null, {
      method: "POST",
      action: `/community/${id}/upvote`
    });
  };
  return /* @__PURE__ */ jsx(Link, { to: `/community/${id}`, className: "block", children: /* @__PURE__ */ jsxs(
    Card,
    {
      className: cn(
        "bg-transparent hover:bg-card/50 transition-colors",
        expanded ? "flex flex-row items-center justify-between" : ""
      ),
      children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center gap-2", children: [
          /* @__PURE__ */ jsxs(Avatar, { className: "size-14", children: [
            /* @__PURE__ */ jsx(AvatarFallback, { children: author[0] }),
            authorAvatarUrl && /* @__PURE__ */ jsx(AvatarImage, { src: authorAvatarUrl })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(CardTitle, { children: title }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2 text-sm leading-tight text-muted-foreground", children: [
              /* @__PURE__ */ jsxs("span", { children: [
                author,
                " on ",
                category
              ] }),
              /* @__PURE__ */ jsx(DotIcon, { className: "size-4" }),
              /* @__PURE__ */ jsx("span", { children: DateTime.fromISO(postedAt).toRelative() })
            ] })
          ] })
        ] }),
        !expanded && /* @__PURE__ */ jsx(CardFooter, { className: "flex justify-end", children: /* @__PURE__ */ jsx(Button, { variant: "link", children: "Reply →" }) }),
        expanded && /* @__PURE__ */ jsx(CardFooter, { className: "flex justify-end pb-0", children: /* @__PURE__ */ jsxs(
          Button,
          {
            onClick: absorbClick,
            variant: "outline",
            className: cn(
              "flex flex-col h-14",
              optimisitcIsUpvoted ? "border-primary text-primary" : ""
            ),
            children: [
              /* @__PURE__ */ jsx(ChevronUpIcon, { className: "size-4 shrink-0" }),
              /* @__PURE__ */ jsx("span", { children: optimisitcVotesCount })
            ]
          }
        ) })
      ]
    }
  ) });
}
function IdeaCard({
  id,
  title,
  owner,
  viewsCount,
  postedAt,
  likesCount,
  claimed
}) {
  return /* @__PURE__ */ jsxs(Card, { className: "bg-transparent hover:bg-card/50 transition-colors", children: [
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(Link, { to: claimed || owner ? "" : `/ideas/${id}`, children: /* @__PURE__ */ jsx(CardTitle, { className: "text-xl", children: /* @__PURE__ */ jsx(
      "span",
      {
        className: cn(
          claimed ? "bg-muted-foreground break-all selection:bg-muted-foreground text-muted-foreground" : ""
        ),
        children: title
      }
    ) }) }) }),
    owner ? null : /* @__PURE__ */ jsxs(CardContent, { className: "flex items-center text-sm", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsx(EyeIcon, { className: "w-4 h-4" }),
        /* @__PURE__ */ jsx("span", { children: viewsCount })
      ] }),
      /* @__PURE__ */ jsx(DotIcon, { className: "w-4 h-4" }),
      postedAt ? /* @__PURE__ */ jsx("span", { children: DateTime.fromISO(postedAt).toRelative() }) : null
    ] }),
    /* @__PURE__ */ jsx(CardFooter, { className: "flex justify-end gap-2", children: !claimed && !owner ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(Button, { variant: "outline", children: [
        /* @__PURE__ */ jsx(HeartIcon, { className: "w-4 h-4" }),
        /* @__PURE__ */ jsx("span", { children: likesCount })
      ] }),
      /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: `/ideas/${id}`, children: "Claim idea now →" }) })
    ] }) : /* @__PURE__ */ jsxs(Button, { variant: "outline", disabled: true, className: "cursor-not-allowed", children: [
      /* @__PURE__ */ jsx(LockIcon, { className: "size-4" }),
      "Claimed"
    ] }) })
  ] });
}
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
function JobCard({
  id,
  company,
  companyLogoUrl,
  companyHq,
  title,
  postedAt,
  type,
  positionLocation,
  salary
}) {
  return /* @__PURE__ */ jsx(Link, { to: `/jobs/${id}`, children: /* @__PURE__ */ jsxs(Card, { className: "bg-transparent transition-colors hover:bg-card/50", children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-4", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: companyLogoUrl,
            alt: `${company} Logo`,
            className: "size-10 rounded-full"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "space-x-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-accent-foreground", children: company }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: DateTime.fromISO(postedAt).toRelative() })
        ] })
      ] }),
      /* @__PURE__ */ jsx(CardTitle, { children: title })
    ] }),
    /* @__PURE__ */ jsxs(CardContent, { children: [
      /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "capitalize", children: type }),
      /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "capitalize", children: positionLocation })
    ] }),
    /* @__PURE__ */ jsxs(CardFooter, { className: "flex justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-muted-foreground", children: salary }),
        /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-muted-foreground", children: companyHq })
      ] }),
      /* @__PURE__ */ jsx(Button, { variant: "secondary", size: "sm", children: "Apply now" })
    ] })
  ] }) });
}
function TeamCard({
  id,
  leaderUsername,
  leaderAvatarUrl,
  positions,
  projectDescription
}) {
  return /* @__PURE__ */ jsx(Link, { to: `/teams/${id}`, className: "block", children: /* @__PURE__ */ jsxs(Card, { className: "bg-transparent hover:bg-card/50 flex flex-col justify-between transition-colors h-full", children: [
    /* @__PURE__ */ jsx(CardHeader, { className: "flex flex-row items-center", children: /* @__PURE__ */ jsxs(CardTitle, { className: "text-base leading-loose", children: [
      /* @__PURE__ */ jsxs(
        Badge,
        {
          variant: "secondary",
          className: "inline-flex shadow-sm items-center text-base",
          children: [
            /* @__PURE__ */ jsxs("span", { children: [
              "@",
              leaderUsername
            ] }),
            /* @__PURE__ */ jsxs(Avatar, { className: "size-5", children: [
              /* @__PURE__ */ jsx(AvatarFallback, { children: leaderUsername[0] }),
              leaderAvatarUrl ? /* @__PURE__ */ jsx(AvatarImage, { src: leaderAvatarUrl }) : null
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx("span", { children: " is looking for " }),
      positions.map((position, index) => /* @__PURE__ */ jsx(Badge, { className: "text-base", children: position }, index)),
      /* @__PURE__ */ jsx("span", { children: " to build " }),
      /* @__PURE__ */ jsx("span", { children: projectDescription })
    ] }) }),
    /* @__PURE__ */ jsx(CardFooter, { className: "justify-end", children: /* @__PURE__ */ jsx(Button, { variant: "link", children: "Join team →" }) })
  ] }) });
}
const getTopics = async (client) => {
  const { data: data2, error } = await client.from("topics").select("name, slug");
  if (error) throw new Error(error.message);
  return data2;
};
const getPosts = async (client, {
  limit,
  sorting,
  period = "all",
  keyword,
  topic
}) => {
  const baseQuery = client.from("community_post_list_view").select(`*`).limit(limit);
  if (sorting === "newest") {
    baseQuery.order("created_at", { ascending: false });
  } else if (sorting === "popular") {
    if (period === "all") {
      baseQuery.order("upvotes", { ascending: false });
    } else {
      const today = DateTime.now();
      if (period === "today") {
        baseQuery.gte("created_at", today.startOf("day").toISO());
      } else if (period === "week") {
        baseQuery.gte("created_at", today.startOf("week").toISO());
      } else if (period === "month") {
        baseQuery.gte("created_at", today.startOf("month").toISO());
      } else if (period === "year") {
        baseQuery.gte("created_at", today.startOf("year").toISO());
      }
      baseQuery.order("upvotes", { ascending: false });
    }
  }
  if (keyword) {
    baseQuery.ilike("title", `%${keyword}%`);
  }
  if (topic) {
    baseQuery.eq("topic_slug", topic);
  }
  const { data: data2, error } = await baseQuery;
  if (error) throw new Error(error.message);
  return data2;
};
const getPostById = async (client, { postId }) => {
  const { data: data2, error } = await client.from("community_post_detail").select("*").eq("post_id", Number(postId)).single();
  if (error) throw error;
  return data2;
};
const getReplies = async (client, { postId }) => {
  const replyQuery = `
    post_reply_id,
    reply,
    created_at,
    user:profile (
      name,
      avatar,
      username
    )
  `;
  const { data: data2, error } = await client.from("post_replies").select(
    `
      ${replyQuery},
      post_replies (
        ${replyQuery}
      )
      `
  ).eq("post_id", Number(postId)).order("created_at", { ascending: false });
  if (error) throw error;
  return data2;
};
const getGptIdeas = async (client, { limit }) => {
  const { data: data2, error } = await client.from("gpt_ideas_view").select("*").limit(limit);
  if (error) {
    throw error;
  }
  return data2;
};
const getGptIdea = async (client, { ideaId }) => {
  const { data: data2, error } = await client.from("gpt_ideas_view").select("*").eq("gpt_idea_id", Number(ideaId)).single();
  if (error) {
    throw error;
  }
  return data2;
};
const getClaimedIdeas = async (client, { userId }) => {
  const { data: data2, error } = await client.from("gpt_ideas").select("gpt_idea_id, claimed_at, idea").eq("claimed_by", userId);
  if (error) {
    throw error;
  }
  return data2;
};
const getJobs = async (client, {
  limit,
  location,
  type,
  salary
}) => {
  const baseQuery = client.from("jobs").select(
    `
    job_id,
    position,
    overview,
    company_name,
    company_logo,
    company_location,
    job_type,
    location,
    salary_range,
    created_at
    `
  ).limit(limit);
  if (location) {
    baseQuery.eq(
      "location",
      location
    );
  }
  if (type) {
    baseQuery.eq(
      "job_type",
      type
    );
  }
  if (salary) {
    baseQuery.eq(
      "salary_range",
      salary
    );
  }
  const { data: data2, error } = await baseQuery;
  if (error) {
    throw error;
  }
  return data2;
};
const getJobById = async (client, { jobId }) => {
  const { data: data2, error } = await client.from("jobs").select("*").eq("job_id", Number(jobId)).single();
  if (error) throw error;
  return data2;
};
const getTeams = async (client, { limit }) => {
  const { data: data2, error } = await client.from("teams").select(
    `
    team_id,
    roles,
    product_description,
    team_leader:profile!inner(
      username,
      avatar
    )
    `
  ).limit(limit);
  if (error) {
    throw error;
  }
  return data2;
};
const getTeamById = async (client, { teamId }) => {
  const { data: data2, error } = await client.from("teams").select(
    `
      *,
      team_leader:profile!inner(
      name,
      avatar,
      role,
      username
      )
`
  ).eq("team_id", Number(teamId)).single();
  if (error) throw error;
  return data2;
};
const meta$B = () => {
  return [{
    title: "Home | wemake"
  }, {
    name: "description",
    content: "Welcome to wemake"
  }];
};
const loader$I = async ({
  request
}) => {
  const {
    client,
    headers
  } = makeSSRClient(request);
  const products = await getProductsByDateRange(client, {
    startDate: DateTime.now().startOf("day"),
    endDate: DateTime.now().endOf("day"),
    limit: 7
  });
  const posts = await getPosts(client, {
    limit: 7,
    sorting: "newest"
  });
  const ideas = await getGptIdeas(client, {
    limit: 7
  });
  const jobs = await getJobs(client, {
    limit: 11
  });
  const teams = await getTeams(client, {
    limit: 7
  });
  return {
    products,
    posts,
    ideas,
    jobs,
    teams
  };
};
const homePage = UNSAFE_withComponentProps(function HomePage({
  loaderData
}) {
  return /* @__PURE__ */ jsxs("div", {
    className: "px-20 space-y-40",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "grid grid-cols-3 gap-4",
      children: [/* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-5xl font-bold leading-tight tracking-tight",
          children: "Today's Products"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-xl font-light text-foreground",
          children: "The best products made by our community today."
        }), /* @__PURE__ */ jsx(Button, {
          variant: "link",
          asChild: true,
          className: "text-lg p-0",
          children: /* @__PURE__ */ jsx(Link, {
            to: "/products/leaderboards",
            children: "Explore all products →"
          })
        })]
      }), loaderData.products.map((product, index) => /* @__PURE__ */ jsx(ProductCard, {
        id: product.product_id,
        name: product.name,
        description: product.tagline,
        reviewsCount: product.reviews,
        viewsCount: product.views,
        votesCount: product.upvotes
      }, product.product_id))]
    }), /* @__PURE__ */ jsxs("div", {
      className: "grid grid-cols-3 gap-4",
      children: [/* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-5xl font-bold leading-tight tracking-tight",
          children: "Latest Discussions"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-xl font-light text-foreground",
          children: "The latest discussions from our community."
        }), /* @__PURE__ */ jsx(Button, {
          variant: "link",
          asChild: true,
          className: "text-lg p-0",
          children: /* @__PURE__ */ jsx(Link, {
            to: "/community",
            children: "Explore all discussions →"
          })
        })]
      }), loaderData.posts.map((post) => /* @__PURE__ */ jsx(PostCard, {
        id: post.post_id,
        title: post.title,
        author: post.author,
        authorAvatarUrl: post.author_avatar,
        category: post.topic,
        postedAt: post.created_at,
        votesCount: post.upvotes
      }, post.post_id))]
    }), /* @__PURE__ */ jsxs("div", {
      className: "grid grid-cols-3 gap-4",
      children: [/* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-5xl font-bold leading-tight tracking-tight",
          children: "IdeasGPT"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-xl font-light text-foreground",
          children: "Find ideas for your next project."
        }), /* @__PURE__ */ jsx(Button, {
          variant: "link",
          asChild: true,
          className: "text-lg p-0",
          children: /* @__PURE__ */ jsx(Link, {
            to: "/ideas",
            children: "Explore all ideas →"
          })
        })]
      }), loaderData.ideas.map((idea) => /* @__PURE__ */ jsx(IdeaCard, {
        id: idea.gpt_idea_id,
        title: idea.idea,
        viewsCount: idea.views,
        postedAt: idea.created_at,
        likesCount: idea.likes,
        claimed: idea.is_claimed
      }))]
    }), /* @__PURE__ */ jsxs("div", {
      className: "grid grid-cols-4 gap-4",
      children: [/* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-5xl font-bold leading-tight tracking-tight",
          children: "Latest Jobs"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-xl font-light text-foreground",
          children: "Find your dream job."
        }), /* @__PURE__ */ jsx(Button, {
          variant: "link",
          asChild: true,
          className: "text-lg p-0",
          children: /* @__PURE__ */ jsx(Link, {
            to: "/jobs",
            children: "Explore all jobs →"
          })
        })]
      }), loaderData.jobs.map((job) => /* @__PURE__ */ jsx(JobCard, {
        id: job.job_id,
        company: job.company_name,
        companyLogoUrl: job.company_logo,
        companyHq: job.company_location,
        title: job.position,
        postedAt: job.created_at,
        type: job.job_type,
        positionLocation: job.location,
        salary: job.salary_range
      }))]
    }), /* @__PURE__ */ jsxs("div", {
      className: "grid grid-cols-4 gap-4",
      children: [/* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-5xl font-bold leading-tight tracking-tight",
          children: "Find a team mate"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-xl font-light text-foreground",
          children: "Join a team looking for a new member."
        }), /* @__PURE__ */ jsx(Button, {
          variant: "link",
          asChild: true,
          className: "text-lg p-0",
          children: /* @__PURE__ */ jsx(Link, {
            to: "/teams",
            children: "Explore all teams →"
          })
        })]
      }), loaderData.teams.map((team) => /* @__PURE__ */ jsx(TeamCard, {
        id: team.team_id,
        leaderUsername: team.team_leader.username,
        leaderAvatarUrl: team.team_leader.avatar,
        positions: team.roles.split(","),
        projectDescription: team.product_description
      }, team.team_id))]
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: homePage,
  loader: loader$I,
  meta: meta$B
}, Symbol.toStringTag, { value: "Module" }));
const meta$A = () => {
  return [{
    title: "Products | wemake"
  }, {
    name: "description",
    content: "Discover amazing products made by our community"
  }];
};
const productsPage = UNSAFE_withComponentProps(function ProductsPage() {
  return /* @__PURE__ */ jsxs("div", {
    className: "px-20 py-10",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "mb-8",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-5xl font-bold leading-tight tracking-tight mb-4",
        children: "Products"
      }), /* @__PURE__ */ jsx("p", {
        className: "text-xl font-light text-foreground",
        children: "Discover amazing products made by our community"
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "grid grid-cols-3 gap-4",
      children: Array.from({
        length: 20
      }).map((_, index) => /* @__PURE__ */ jsx(ProductCard, {
        id: `productId-${index}`,
        name: "Product Name",
        description: "Product Description",
        commentsCount: 12,
        viewsCount: 12,
        votesCount: 120
      }, `product-${index}`))
    })]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: productsPage,
  meta: meta$A
}, Symbol.toStringTag, { value: "Module" }));
const searchParamsSchema$2 = z.object({
  page: z.coerce.number().min(1).optional().default(1)
});
const loader$H = async ({
  request
}) => {
  const url = new URL(request.url);
  const {
    success,
    data: parsedData
  } = searchParamsSchema$2.safeParse(Object.fromEntries(url.searchParams));
  if (!success) {
    throw data({
      error_code: "invalid_page",
      message: "Invalid page"
    }, {
      status: 400
    });
  }
};
const leaderboardLayout = UNSAFE_withComponentProps(function LeaderboardLayout() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: leaderboardLayout,
  loader: loader$H
}, Symbol.toStringTag, { value: "Module" }));
function Hero({ title, subtitle, className = "" }) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `flex flex-col py-20 justify-center items-center rounded-md bg-linear-to-t from-background to-primary/10 ${className}`,
      children: [
        /* @__PURE__ */ jsx("h1", { className: "text-5xl font-bold", children: title }),
        subtitle && /* @__PURE__ */ jsx("p", { className: "text-2xl font-light text-foreground", children: subtitle })
      ]
    }
  );
}
const meta$z = () => {
  return [{
    title: "Leaderboards | wemake"
  }, {
    name: "description",
    content: "Top products ranked by votes"
  }];
};
const loader$G = async ({
  request
}) => {
  const {
    client,
    headers
  } = makeSSRClient(request);
  const [dailyProducts, weeklyProducts, monthlyProducts, yearlyProducts] = await Promise.all([getProductsByDateRange(client, {
    startDate: DateTime.now().startOf("day"),
    endDate: DateTime.now().endOf("day"),
    limit: 7
  }), getProductsByDateRange(client, {
    startDate: DateTime.now().startOf("week"),
    endDate: DateTime.now().endOf("week"),
    limit: 7
  }), getProductsByDateRange(client, {
    startDate: DateTime.now().startOf("month"),
    endDate: DateTime.now().endOf("month"),
    limit: 7
  }), getProductsByDateRange(client, {
    startDate: DateTime.now().startOf("year"),
    endDate: DateTime.now().endOf("year"),
    limit: 7
  })]);
  return {
    dailyProducts,
    weeklyProducts,
    monthlyProducts,
    yearlyProducts
  };
};
const leaderboardPage = UNSAFE_withComponentProps(function LeaderboardPage({
  loaderData
}) {
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-20",
    children: [/* @__PURE__ */ jsx(Hero, {
      title: "Leaderboards",
      subtitle: "The most popular products on wemake"
    }), /* @__PURE__ */ jsxs("div", {
      className: "grid grid-cols-3 gap-4",
      children: [/* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-3xl font-bold leading-tight tracking-tight",
          children: "Daily Leaderboard"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-xl font-light text-foreground",
          children: "The most popular products on wemake by day."
        })]
      }), loaderData.dailyProducts.map((product, index) => /* @__PURE__ */ jsx(ProductCard, {
        id: product.product_id.toString(),
        name: product.name,
        description: product.tagline,
        reviewsCount: product.reviews,
        viewsCount: product.views,
        votesCount: product.upvotes
      })), /* @__PURE__ */ jsx(Button, {
        variant: "link",
        asChild: true,
        className: "text-lg self-center",
        children: /* @__PURE__ */ jsx(Link, {
          to: "/products/leaderboards/daily",
          children: "Explore all products →"
        })
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "grid grid-cols-3 gap-4",
      children: [/* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-3xl font-bold leading-tight tracking-tight",
          children: "Weekly Leaderboard"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-xl font-light text-foreground",
          children: "The most popular products on wemake by week."
        })]
      }), loaderData.weeklyProducts.map((product, index) => /* @__PURE__ */ jsx(ProductCard, {
        id: product.product_id.toString(),
        name: product.name,
        description: product.tagline,
        reviewsCount: product.reviews,
        viewsCount: product.views,
        votesCount: product.upvotes
      })), /* @__PURE__ */ jsx(Button, {
        variant: "link",
        asChild: true,
        className: "text-lg self-center",
        children: /* @__PURE__ */ jsx(Link, {
          to: "/products/leaderboards/weekly",
          children: "Explore all products →"
        })
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "grid grid-cols-3 gap-4",
      children: [/* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-3xl font-bold leading-tight tracking-tight",
          children: "Monthly Leaderboard"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-xl font-light text-foreground",
          children: "The most popular products on wemake by month."
        })]
      }), loaderData.monthlyProducts.map((product, index) => /* @__PURE__ */ jsx(ProductCard, {
        id: product.product_id.toString(),
        name: product.name,
        description: product.tagline,
        reviewsCount: product.reviews,
        viewsCount: product.views,
        votesCount: product.upvotes
      })), /* @__PURE__ */ jsx(Button, {
        variant: "link",
        asChild: true,
        className: "text-lg self-center",
        children: /* @__PURE__ */ jsx(Link, {
          to: "/products/leaderboards/monthly",
          children: "Explore all products →"
        })
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "grid grid-cols-3 gap-4",
      children: [/* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-3xl font-bold leading-tight tracking-tight",
          children: "Yearly Leaderboard"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-xl font-light text-foreground",
          children: "The most popular products on wemake by year."
        })]
      }), loaderData.yearlyProducts.map((product, index) => /* @__PURE__ */ jsx(ProductCard, {
        id: product.product_id.toString(),
        name: product.name,
        description: product.tagline,
        reviewsCount: product.reviews,
        viewsCount: product.views,
        votesCount: product.upvotes
      })), /* @__PURE__ */ jsx(Button, {
        variant: "link",
        asChild: true,
        className: "text-lg self-center",
        children: /* @__PURE__ */ jsx(Link, {
          to: "/products/leaderboards/yearly",
          children: "Explore all products →"
        })
      })]
    })]
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: leaderboardPage,
  loader: loader$G,
  meta: meta$z
}, Symbol.toStringTag, { value: "Module" }));
function Pagination({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "nav",
    {
      role: "navigation",
      "aria-label": "pagination",
      "data-slot": "pagination",
      className: cn("mx-auto flex w-full justify-center", className),
      ...props
    }
  );
}
function PaginationContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "ul",
    {
      "data-slot": "pagination-content",
      className: cn("flex flex-row items-center gap-1", className),
      ...props
    }
  );
}
function PaginationItem({ ...props }) {
  return /* @__PURE__ */ jsx("li", { "data-slot": "pagination-item", ...props });
}
function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Link,
    {
      "aria-current": isActive ? "page" : void 0,
      "data-slot": "pagination-link",
      "data-active": isActive,
      className: cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size
        }),
        className
      ),
      ...props
    }
  );
}
function PaginationPrevious({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    PaginationLink,
    {
      "aria-label": "Go to previous page",
      size: "default",
      className: cn("gap-1 px-2.5 sm:pl-2.5", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx(ChevronLeftIcon, {}),
        /* @__PURE__ */ jsx("span", { className: "hidden sm:block", children: "Previous" })
      ]
    }
  );
}
function PaginationNext({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    PaginationLink,
    {
      "aria-label": "Go to next page",
      size: "default",
      className: cn("gap-1 px-2.5 sm:pr-2.5", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { className: "hidden sm:block", children: "Next" }),
        /* @__PURE__ */ jsx(ChevronRightIcon, {})
      ]
    }
  );
}
function PaginationEllipsis({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    "span",
    {
      "aria-hidden": true,
      "data-slot": "pagination-ellipsis",
      className: cn("flex size-9 items-center justify-center", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx(MoreHorizontalIcon, { className: "size-4" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "More pages" })
      ]
    }
  );
}
function ProductPagination({
  totalPages
}) {
  const [searchParams2, setSearchParams] = useSearchParams();
  const page = Number(searchParams2.get("page") ?? 1);
  const onClick = (page2) => {
    searchParams2.set("page", page2.toString());
    setSearchParams(searchParams2, { preventScrollReset: true });
  };
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Pagination, { children: /* @__PURE__ */ jsxs(PaginationContent, { children: [
    page === 1 ? null : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(
        PaginationPrevious,
        {
          to: `?page=${page - 1}`,
          onClick: (event) => {
            event.preventDefault();
            onClick(page - 1);
          }
        }
      ) }),
      /* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(
        PaginationLink,
        {
          to: `?page=${page - 1}`,
          onClick: (event) => {
            event.preventDefault();
            onClick(page - 1);
          },
          children: page - 1
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(
      PaginationLink,
      {
        to: `?page=${page}`,
        onClick: (event) => {
          event.preventDefault();
          onClick(page);
        },
        isActive: true,
        children: page
      }
    ) }),
    page === totalPages ? null : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(
        PaginationLink,
        {
          to: `?page=${page + 1}`,
          onClick: (event) => {
            event.preventDefault();
            onClick(page + 1);
          },
          children: page + 1
        }
      ) }),
      page + 1 === totalPages ? null : /* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(PaginationEllipsis, {}) }),
      /* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(
        PaginationNext,
        {
          to: `?page=${page + 1}`,
          onClick: (event) => {
            event.preventDefault();
            onClick(page + 1);
          }
        }
      ) })
    ] })
  ] }) }) });
}
const paramsSchema$7 = z.object({
  year: z.coerce.number()
});
const meta$y = ({
  params
}) => {
  const date = DateTime.fromObject({
    year: Number(params.year)
  }).setZone("Asia/Seoul").setLocale("ko");
  return [{
    title: `Best of ${date.toLocaleString({
      year: "numeric"
    })} |wemake`
  }];
};
const loader$F = async ({
  params,
  request
}) => {
  const {
    success,
    data: parsedData
  } = paramsSchema$7.safeParse(params);
  if (!success) {
    throw data({
      error_code: "invalid_params",
      message: "Invalid params"
    }, {
      status: 400
    });
  }
  const date = DateTime.fromObject({
    year: parsedData.year
  }).setZone("Asia/Seoul");
  if (!date.isValid) {
    throw data({
      error_code: "invalid_date",
      message: "Invalid date"
    }, {
      status: 400
    });
  }
  const today = DateTime.now().setZone("Asia/Seoul").startOf("year");
  if (date > today) {
    throw data({
      error_code: "future_date",
      message: "Future date"
    }, {
      status: 400
    });
  }
  const url = new URL(request.url);
  const {
    client,
    headers
  } = makeSSRClient(request);
  const products = await getProductsByDateRange(client, {
    startDate: date.startOf("year"),
    endDate: date.endOf("year"),
    limit: PAGE_SIZE,
    page: Number(url.searchParams.get("page") || 1)
  });
  const totalPages = await getProductPagesByDateRange(client, {
    startDate: date.startOf("year"),
    endDate: date.endOf("year")
  });
  return {
    ...parsedData,
    totalPages,
    products
  };
};
const yearlyLeaderboardPage = UNSAFE_withComponentProps(function YearlyLeaderboardPage({
  loaderData
}) {
  const urlDate = DateTime.fromObject({
    year: loaderData.year
  });
  const previousYear = urlDate.minus({
    years: 1
  });
  const nextYear = urlDate.plus({
    years: 1
  });
  const isToday = urlDate.equals(DateTime.now().startOf("year"));
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-10",
    children: [/* @__PURE__ */ jsx(Hero, {
      title: `Best of ${urlDate.toLocaleString({
        year: "numeric"
      })}`
    }), /* @__PURE__ */ jsxs("div", {
      className: "flex items-center justify-center gap-2",
      children: [/* @__PURE__ */ jsx(Button, {
        variant: "secondary",
        asChild: true,
        children: /* @__PURE__ */ jsxs(Link, {
          to: `/products/leaderboards/yearly/${previousYear.year}`,
          children: ["←", " ", previousYear.toLocaleString({
            year: "numeric"
          })]
        })
      }), !isToday ? /* @__PURE__ */ jsx(Button, {
        variant: "secondary",
        asChild: true,
        children: /* @__PURE__ */ jsxs(Link, {
          to: `/products/leaderboards/yearly/${nextYear.year}`,
          children: [nextYear.toLocaleString({
            year: "numeric"
          }), " ", "→"]
        })
      }) : null]
    }), /* @__PURE__ */ jsx("div", {
      className: "space-y-5 w-full max-w-screen-md mx-auto",
      children: loaderData.products.map((product) => /* @__PURE__ */ jsx(ProductCard, {
        id: product.product_id.toString(),
        name: product.name,
        description: product.tagline,
        reviewsCount: product.reviews,
        viewsCount: product.views,
        votesCount: product.upvotes
      }, product.product_id))
    }), /* @__PURE__ */ jsx(ProductPagination, {
      totalPages: loaderData.totalPages
    })]
  });
});
const ErrorBoundary$3 = UNSAFE_withErrorBoundaryProps(function ErrorBoundary({
  error
}) {
  if (isRouteErrorResponse(error)) {
    return /* @__PURE__ */ jsxs("div", {
      children: [error.data.message, " / ", error.data.error_code]
    });
  }
  if (error instanceof Error) {
    return /* @__PURE__ */ jsx("div", {
      children: error.message
    });
  }
  return /* @__PURE__ */ jsx("div", {
    children: "Unknown error"
  });
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$3,
  default: yearlyLeaderboardPage,
  loader: loader$F,
  meta: meta$y
}, Symbol.toStringTag, { value: "Module" }));
const paramsSchema$6 = z.object({
  year: z.coerce.number(),
  month: z.coerce.number()
});
const meta$x = ({
  params
}) => {
  const date = DateTime.fromObject({
    year: Number(params.year),
    month: Number(params.month)
  }).setZone("Asia/Seoul").setLocale("ko");
  return [{
    title: `Best of ${date.toLocaleString({
      month: "long",
      year: "2-digit"
    })} |wemake`
  }];
};
const loader$E = async ({
  params,
  request
}) => {
  const {
    success,
    data: parsedData
  } = paramsSchema$6.safeParse(params);
  if (!success) {
    throw data({
      error_code: "invalid_params",
      message: "Invalid params"
    }, {
      status: 400
    });
  }
  const date = DateTime.fromObject({
    year: parsedData.year,
    month: parsedData.month
  }).setZone("Asia/Seoul");
  if (!date.isValid) {
    throw data({
      error_code: "invalid_date",
      message: "Invalid date"
    }, {
      status: 400
    });
  }
  const today = DateTime.now().setZone("Asia/Seoul").startOf("month");
  if (date > today) {
    throw data({
      error_code: "future_date",
      message: "Future date"
    }, {
      status: 400
    });
  }
  const url = new URL(request.url);
  const {
    client,
    headers
  } = makeSSRClient(request);
  const products = await getProductsByDateRange(client, {
    startDate: date.startOf("month"),
    endDate: date.endOf("month"),
    limit: PAGE_SIZE,
    page: Number(url.searchParams.get("page") || 1)
  });
  const totalPages = await getProductPagesByDateRange(client, {
    startDate: date.startOf("month"),
    endDate: date.endOf("month")
  });
  return {
    ...parsedData,
    totalPages,
    products
  };
};
const monthlyLeaderboardPage = UNSAFE_withComponentProps(function MonthlyLeaderboardPage({
  loaderData
}) {
  const urlDate = DateTime.fromObject({
    year: loaderData.year,
    month: loaderData.month
  });
  const previousMonth = urlDate.minus({
    months: 1
  });
  const nextMonth = urlDate.plus({
    months: 1
  });
  const isToday = urlDate.equals(DateTime.now().startOf("month"));
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-10",
    children: [/* @__PURE__ */ jsx(Hero, {
      title: `Best of ${urlDate.toLocaleString({
        month: "long",
        year: "2-digit"
      })}`
    }), /* @__PURE__ */ jsxs("div", {
      className: "flex items-center justify-center gap-2",
      children: [/* @__PURE__ */ jsx(Button, {
        variant: "secondary",
        asChild: true,
        children: /* @__PURE__ */ jsxs(Link, {
          to: `/products/leaderboards/monthly/${previousMonth.year}/${previousMonth.month}`,
          children: ["←", " ", previousMonth.toLocaleString({
            month: "long",
            year: "2-digit"
          })]
        })
      }), !isToday ? /* @__PURE__ */ jsx(Button, {
        variant: "secondary",
        asChild: true,
        children: /* @__PURE__ */ jsxs(Link, {
          to: `/products/leaderboards/monthly/${nextMonth.year}/${nextMonth.month}`,
          children: [nextMonth.toLocaleString({
            month: "long",
            year: "2-digit"
          }), " ", "→"]
        })
      }) : null]
    }), /* @__PURE__ */ jsx("div", {
      className: "space-y-5 w-full max-w-screen-md mx-auto",
      children: loaderData.products.map((product) => /* @__PURE__ */ jsx(ProductCard, {
        id: product.product_id.toString(),
        name: product.name,
        description: product.tagline,
        reviewsCount: product.reviews,
        viewsCount: product.views,
        votesCount: product.upvotes
      }, product.product_id))
    }), /* @__PURE__ */ jsx(ProductPagination, {
      totalPages: loaderData.totalPages
    })]
  });
});
const ErrorBoundary$2 = UNSAFE_withErrorBoundaryProps(function ErrorBoundary3({
  error
}) {
  if (isRouteErrorResponse(error)) {
    return /* @__PURE__ */ jsxs("div", {
      children: [error.data.message, " / ", error.data.error_code]
    });
  }
  if (error instanceof Error) {
    return /* @__PURE__ */ jsx("div", {
      children: error.message
    });
  }
  return /* @__PURE__ */ jsx("div", {
    children: "Unknown error"
  });
});
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$2,
  default: monthlyLeaderboardPage,
  loader: loader$E,
  meta: meta$x
}, Symbol.toStringTag, { value: "Module" }));
const paramsSchema$5 = z.object({
  year: z.coerce.number(),
  month: z.coerce.number(),
  day: z.coerce.number()
});
const meta$w = ({
  params
}) => {
  const date = DateTime.fromObject({
    year: Number(params.year),
    month: Number(params.month),
    day: Number(params.day)
  }).setZone("Asia/Seoul").setLocale("ko");
  return [{
    title: `The best products of ${date.toLocaleString(DateTime.DATE_MED)} |wemake`
  }];
};
const loader$D = async ({
  params,
  request
}) => {
  const {
    success,
    data: parsedData
  } = paramsSchema$5.safeParse(params);
  if (!success) {
    throw data({
      error_code: "invalid_params",
      message: "Invalid params"
    }, {
      status: 400
    });
  }
  const date = DateTime.fromObject(parsedData).setZone("Asia/Seoul");
  if (!date.isValid) {
    throw data({
      error_code: "invalid_date",
      message: "Invalid date"
    }, {
      status: 400
    });
  }
  const today = DateTime.now().setZone("Asia/Seoul").startOf("day");
  if (date > today) {
    throw data({
      error_code: "future_date",
      message: "Future date"
    }, {
      status: 400
    });
  }
  const url = new URL(request.url);
  const {
    client,
    headers
  } = makeSSRClient(request);
  const products = await getProductsByDateRange(client, {
    startDate: date.startOf("day"),
    endDate: date.endOf("day"),
    limit: PAGE_SIZE,
    page: Number(url.searchParams.get("page") || 1)
  });
  const totalPages = await getProductPagesByDateRange(client, {
    startDate: date.startOf("day"),
    endDate: date.endOf("day")
  });
  return {
    products,
    totalPages,
    ...parsedData
  };
};
const dailyLeaderboardPage = UNSAFE_withComponentProps(function DailyLeaderboardPage({
  loaderData
}) {
  const urlDate = DateTime.fromObject({
    year: loaderData.year,
    month: loaderData.month,
    day: loaderData.day
  });
  const previousDay = urlDate.minus({
    days: 1
  });
  const nextDay = urlDate.plus({
    days: 1
  });
  const isToday = urlDate.equals(DateTime.now().startOf("day"));
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-10",
    children: [/* @__PURE__ */ jsx(Hero, {
      title: `The best products of ${urlDate.toLocaleString(DateTime.DATE_MED)}`
    }), /* @__PURE__ */ jsxs("div", {
      className: "flex justify-center gap-2",
      children: [/* @__PURE__ */ jsx(Button, {
        variant: "secondary",
        asChild: true,
        children: /* @__PURE__ */ jsxs(Link, {
          to: `/products/leaderboards/daily/${previousDay.year}/${previousDay.month}/${previousDay.day}`,
          children: ["← ", previousDay.toLocaleString(DateTime.DATE_SHORT)]
        })
      }), !isToday ? /* @__PURE__ */ jsx(Button, {
        variant: "secondary",
        asChild: true,
        children: /* @__PURE__ */ jsxs(Link, {
          to: `/products/leaderboards/daily/${nextDay.year}/${nextDay.month}/${nextDay.day}`,
          children: [nextDay.toLocaleString(DateTime.DATE_SHORT), " →"]
        })
      }) : null]
    }), /* @__PURE__ */ jsx("div", {
      className: "space-y-5 w-full max-w-md mx-auto",
      children: loaderData.products.map((product) => /* @__PURE__ */ jsx(ProductCard, {
        id: product.product_id.toString(),
        name: product.name,
        description: product.tagline,
        reviewsCount: product.reviews,
        viewsCount: product.views,
        votesCount: product.upvotes
      }, product.product_id))
    }), /* @__PURE__ */ jsx(ProductPagination, {
      totalPages: loaderData.totalPages
    })]
  });
});
const ErrorBoundary$1 = UNSAFE_withErrorBoundaryProps(function ErrorBoundary4({
  error
}) {
  if (isRouteErrorResponse(error)) {
    return /* @__PURE__ */ jsxs("div", {
      children: [error.data.message, " / ", error.data.error_code]
    });
  }
  if (error instanceof Error) {
    return /* @__PURE__ */ jsx("div", {
      children: error.message
    });
  }
  return /* @__PURE__ */ jsx("div", {
    children: "Unknown error"
  });
});
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$1,
  default: dailyLeaderboardPage,
  loader: loader$D,
  meta: meta$w
}, Symbol.toStringTag, { value: "Module" }));
const paramsSchema$4 = z.object({
  year: z.coerce.number(),
  week: z.coerce.number()
});
const meta$v = ({
  params
}) => {
  const date = DateTime.fromObject({
    weekYear: Number(params.year),
    weekNumber: Number(params.week)
  }).setZone("Asia/Seoul").setLocale("ko");
  return [{
    title: `Best of week ${date.startOf("week").toLocaleString(DateTime.DATE_SHORT)} -
      ${date.endOf("week").toLocaleString(DateTime.DATE_SHORT)} |wemake`
  }];
};
const loader$C = async ({
  params,
  request
}) => {
  const {
    success,
    data: parsedData
  } = paramsSchema$4.safeParse(params);
  if (!success) {
    throw data({
      error_code: "invalid_params",
      message: "Invalid params"
    }, {
      status: 400
    });
  }
  const date = DateTime.fromObject({
    weekYear: parsedData.year,
    weekNumber: parsedData.week
  }).setZone("Asia/Seoul");
  if (!date.isValid) {
    throw data({
      error_code: "invalid_date",
      message: "Invalid date"
    }, {
      status: 400
    });
  }
  const today = DateTime.now().setZone("Asia/Seoul").startOf("week");
  if (date > today) {
    throw data({
      error_code: "future_date",
      message: "Future date"
    }, {
      status: 400
    });
  }
  const url = new URL(request.url);
  const {
    client,
    headers
  } = makeSSRClient(request);
  const products = await getProductsByDateRange(client, {
    startDate: date.startOf("week"),
    endDate: date.endOf("week"),
    limit: 15,
    page: Number(url.searchParams.get("page") || 1)
  });
  const totalPages = await getProductPagesByDateRange(client, {
    startDate: date.startOf("week"),
    endDate: date.endOf("week")
  });
  return {
    ...parsedData,
    totalPages,
    products
  };
};
const weeklyLeaderboardPage = UNSAFE_withComponentProps(function WeeklyLeaderboardPage({
  loaderData
}) {
  const urlDate = DateTime.fromObject({
    weekYear: loaderData.year,
    weekNumber: loaderData.week
  });
  const previousWeek = urlDate.minus({
    weeks: 1
  });
  const nextWeek = urlDate.plus({
    weeks: 1
  });
  const isToday = urlDate.equals(DateTime.now().startOf("week"));
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-10",
    children: [/* @__PURE__ */ jsx(Hero, {
      title: `Best of week ${urlDate.startOf("week").toLocaleString(DateTime.DATE_SHORT)} - ${urlDate.endOf("week").toLocaleString(DateTime.DATE_SHORT)}`
    }), /* @__PURE__ */ jsxs("div", {
      className: "flex items-center justify-center gap-2",
      children: [/* @__PURE__ */ jsx(Button, {
        variant: "secondary",
        asChild: true,
        children: /* @__PURE__ */ jsxs(Link, {
          to: `/products/leaderboards/weekly/${previousWeek.year}/${previousWeek.weekNumber}`,
          children: ["← ", previousWeek.toLocaleString(DateTime.DATE_SHORT)]
        })
      }), !isToday ? /* @__PURE__ */ jsx(Button, {
        variant: "secondary",
        asChild: true,
        children: /* @__PURE__ */ jsxs(Link, {
          to: `/products/leaderboards/weekly/${nextWeek.year}/${nextWeek.weekNumber}`,
          children: [nextWeek.toLocaleString(DateTime.DATE_SHORT), " →"]
        })
      }) : null]
    }), /* @__PURE__ */ jsx("div", {
      className: "space-y-5 w-full max-w-screen-md mx-auto",
      children: loaderData.products.map((product) => /* @__PURE__ */ jsx(ProductCard, {
        id: product.product_id.toString(),
        name: product.name,
        description: product.tagline,
        reviewsCount: product.reviews,
        viewsCount: product.views,
        votesCount: product.upvotes
      }, product.product_id))
    }), /* @__PURE__ */ jsx(ProductPagination, {
      totalPages: loaderData.totalPages
    })]
  });
});
const ErrorBoundary5 = UNSAFE_withErrorBoundaryProps(function ErrorBoundary6({
  error
}) {
  if (isRouteErrorResponse(error)) {
    return /* @__PURE__ */ jsxs("div", {
      children: [error.data.message, " / ", error.data.error_code]
    });
  }
  if (error instanceof Error) {
    return /* @__PURE__ */ jsx("div", {
      children: error.message
    });
  }
  return /* @__PURE__ */ jsx("div", {
    children: "Unknown error"
  });
});
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary5,
  default: weeklyLeaderboardPage,
  loader: loader$C,
  meta: meta$v
}, Symbol.toStringTag, { value: "Module" }));
function loader$B({
  params
}) {
  const {
    period
  } = params;
  let url;
  const today = DateTime.now().setZone("Asia/Seoul");
  if (period === "daily") {
    url = `/products/leaderboards/daily/${today.year}/${today.month}/${today.day}`;
  } else if (period === "weekly") {
    url = `/products/leaderboards/weekly/${today.year}/${today.weekNumber}`;
  } else if (period === "monthly") {
    url = `/products/leaderboards/monthly/${today.year}/${today.month}`;
  } else if (period === "yearly") {
    url = `/products/leaderboards/yearly/${today.year}`;
  } else {
    return data(null, {
      status: 400
    });
  }
  return redirect(url);
}
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$B
}, Symbol.toStringTag, { value: "Module" }));
function CategoryCard({ id, name, description }) {
  return /* @__PURE__ */ jsx(Link, { to: `/products/categories/${id}`, className: "block", children: /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardHeader, { children: [
    /* @__PURE__ */ jsxs(CardTitle, { className: "flex", children: [
      name,
      " ",
      /* @__PURE__ */ jsx(ChevronRightIcon, { className: "size-6" })
    ] }),
    /* @__PURE__ */ jsx(CardDescription, { className: "text-base", children: description })
  ] }) }) });
}
const meta$u = () => [{
  title: "Categories | Product Clone"
}, {
  name: "description",
  content: "Browse products by category"
}];
const loader$A = async ({
  request
}) => {
  const {
    client,
    headers
  } = makeSSRClient(request);
  const categories = await getCategories(client);
  return {
    categories
  };
};
const categoriesPage = UNSAFE_withComponentProps(function CategoriesPage({
  loaderData
}) {
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-10",
    children: [/* @__PURE__ */ jsx(Hero, {
      title: "Categories",
      subtitle: "Browse products by category"
    }), /* @__PURE__ */ jsx("div", {
      className: "grid grid-cols-4 gap-10",
      children: loaderData.categories.map((category) => /* @__PURE__ */ jsx(CategoryCard, {
        id: category.category_id,
        name: category.name,
        description: category.description
      }, category.category_id))
    })]
  });
});
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: categoriesPage,
  loader: loader$A,
  meta: meta$u
}, Symbol.toStringTag, { value: "Module" }));
const meta$t = ({
  params
}) => {
  return [{
    title: `Developer Tools | ProductHunt Clone`
  }, {
    name: "description",
    content: `Browse Developer Tools products`
  }];
};
const paramsSchema$3 = z$1.object({
  category: z$1.coerce.number()
});
const loader$z = async ({
  params,
  request
}) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || 1;
  const {
    data: data2,
    success
  } = paramsSchema$3.safeParse(params);
  if (!success) {
    throw new Response("Invalid category", {
      status: 400
    });
  }
  const {
    client,
    headers
  } = makeSSRClient(request);
  const category = await getCategory(client, {
    categoryId: data2.category
  });
  const products = await getProductsByCategory(client, {
    categoryId: data2.category,
    page: Number(page)
  });
  const totalPages = await getCategoryPages(client, {
    categoryId: data2.category
  });
  return {
    category,
    products,
    totalPages
  };
};
const categoryPage = UNSAFE_withComponentProps(function CategoryPage({
  loaderData
}) {
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-10",
    children: [/* @__PURE__ */ jsx(Hero, {
      title: loaderData.category.name,
      subtitle: loaderData.category.description
    }), /* @__PURE__ */ jsx("div", {
      className: "space-y-5 w-full max-w-screen-md mx-auto",
      children: loaderData.products.map((product) => /* @__PURE__ */ jsx(ProductCard, {
        id: product.product_id,
        name: product.name,
        description: product.tagline,
        reviewsCount: product.reviews,
        viewsCount: product.views,
        votesCount: product.upvotes
      }, product.product_id))
    }), /* @__PURE__ */ jsx(ProductPagination, {
      totalPages: loaderData.totalPages
    })]
  });
});
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: categoryPage,
  loader: loader$z,
  meta: meta$t
}, Symbol.toStringTag, { value: "Module" }));
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
const meta$s = () => {
  return [{
    title: "Search Products | wemake"
  }, {
    name: "description",
    content: "Search for products"
  }];
};
const searchParams = z$1.object({
  query: z$1.string().optional().default(""),
  page: z$1.coerce.number().optional().default(1)
});
async function loader$y({
  request
}) {
  const url = new URL(request.url);
  const {
    success,
    data: parsedData
  } = searchParams.safeParse(Object.fromEntries(url.searchParams));
  if (!success) {
    throw new Error("Invalid params");
  }
  if (parsedData.query === "") {
    return {
      products: [],
      totalPages: 1
    };
  }
  const {
    client,
    headers
  } = makeSSRClient(request);
  const products = await getProductsBySearch(client, {
    query: parsedData.query,
    page: parsedData.page
  });
  const totalPages = await getPagesBySearch(client, {
    query: parsedData.query
  });
  return {
    products,
    totalPages
  };
}
const searchPage = UNSAFE_withComponentProps(function SearchPage({
  loaderData
}) {
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-10",
    children: [/* @__PURE__ */ jsx(Hero, {
      title: "Search Products",
      subtitle: "Search for products by name or description"
    }), /* @__PURE__ */ jsxs(Form, {
      className: "flex justify-center max-w-sm items-center mx-auto gap-2",
      children: [/* @__PURE__ */ jsx(Input, {
        name: "query",
        placeholder: "Search products",
        className: "text-lg"
      }), /* @__PURE__ */ jsx(Button, {
        type: "submit",
        children: "Search"
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "space-y-5 w-full max-w-md mx-auto",
      children: loaderData.products.map((product) => /* @__PURE__ */ jsx(ProductCard, {
        id: product.product_id,
        name: product.name,
        description: product.tagline,
        reviewsCount: product.reviews,
        viewsCount: product.views,
        votesCount: product.upvotes
      }, product.product_id))
    }), /* @__PURE__ */ jsx(ProductPagination, {
      totalPages: loaderData.totalPages
    })]
  });
});
const route12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: searchPage,
  loader: loader$y,
  meta: meta$s
}, Symbol.toStringTag, { value: "Module" }));
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  LabelPrimitive.Root,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  }
));
Label.displayName = LabelPrimitive.Root.displayName;
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
function InputPair({
  label,
  description,
  textArea = false,
  ...rest
}) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2 flex flex-col", children: [
    /* @__PURE__ */ jsxs(Label, { htmlFor: rest.id, className: "flex flex-col gap-1", children: [
      label,
      /* @__PURE__ */ jsx("small", { className: "text-muted-foreground", children: description })
    ] }),
    textArea ? /* @__PURE__ */ jsx(Textarea, { rows: 4, className: "resize-none", ...rest }) : /* @__PURE__ */ jsx(Input, { ...rest })
  ] });
}
const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
function SelectPair({
  name,
  required,
  label,
  description,
  placeholder,
  options,
  defaultValue
}) {
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2 flex flex-col", children: [
    /* @__PURE__ */ jsxs(Label, { className: "flex flex-col gap-1", onClick: () => setOpen(true), children: [
      label,
      /* @__PURE__ */ jsx("small", { className: "text-muted-foreground", children: description })
    ] }),
    /* @__PURE__ */ jsxs(
      Select,
      {
        open,
        onOpenChange: setOpen,
        name,
        required,
        defaultValue,
        children: [
          /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder }) }),
          /* @__PURE__ */ jsx(SelectContent, { children: options.map((option) => /* @__PURE__ */ jsx(SelectItem, { value: option.value, children: option.label }, option.value)) })
        ]
      }
    )
  ] });
}
const createProductReview = async (client, {
  productId,
  review,
  rating,
  userId
}) => {
  const { error } = await client.from("reviews").insert({
    product_id: +productId,
    review,
    rating,
    profile_id: userId
  });
  if (error) {
    throw error;
  }
};
const createProduct = async (client, {
  name,
  tagline,
  description,
  howItWorks,
  url,
  iconUrl,
  categoryId,
  userId
}) => {
  const { data: data2, error } = await client.from("products").insert({
    name,
    tagline,
    description,
    how_it_works: howItWorks,
    url,
    icon: iconUrl,
    category_id: categoryId,
    profile_id: userId
  }).select("product_id").single();
  if (error) throw error;
  return data2.product_id;
};
const meta$r = () => {
  return [{
    title: "Submit a Product | wemake"
  }, {
    name: "description",
    content: "Submit your product"
  }];
};
const formSchema$a = z$1.object({
  name: z$1.string().min(1),
  tagline: z$1.string().min(1),
  url: z$1.string().min(1),
  description: z$1.string().min(1),
  howItWorks: z$1.string().min(1),
  category: z$1.coerce.number(),
  icon: z$1.instanceof(File).refine((file) => {
    return file.size <= 2097152 && file.type.startsWith("image/");
  })
});
const action$g = async ({
  request
}) => {
  const {
    client
  } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const {
    data: data2,
    success,
    error
  } = formSchema$a.safeParse(Object.fromEntries(formData));
  if (!success) {
    return {
      formErrors: error.flatten().fieldErrors
    };
  }
  const {
    icon,
    ...rest
  } = data2;
  const {
    data: uploadData,
    error: uploadError
  } = await client.storage.from("icons").upload(`${userId}/${Date.now()}`, icon, {
    contentType: icon.type,
    upsert: false
  });
  if (uploadError) {
    return {
      formErrors: {
        icon: ["Failed to upload icon"]
      }
    };
  }
  const {
    data: {
      publicUrl
    }
  } = await client.storage.from("icons").getPublicUrl(uploadData.path);
  const productId = await createProduct(client, {
    name: rest.name,
    tagline: rest.tagline,
    description: rest.description,
    howItWorks: rest.howItWorks,
    url: rest.url,
    iconUrl: publicUrl,
    categoryId: rest.category,
    userId
  });
  return redirect(`/products/${productId}`);
};
const loader$x = async ({
  request
}) => {
  const {
    client
  } = makeSSRClient(request);
  await getLoggedInUserId(client);
  const categories = await getCategories(client);
  return {
    categories
  };
};
const submitProductPage = UNSAFE_withComponentProps(function SubmitPage({
  loaderData,
  actionData
}) {
  const [icon, setIcon] = useState(null);
  const onChange = (event) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setIcon(URL.createObjectURL(file));
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx(Hero, {
      title: "Submit Your Product",
      subtitle: "Share your product with the world"
    }), /* @__PURE__ */ jsxs(Form, {
      method: "post",
      encType: "multipart/form-data",
      className: "grid grid-cols-2 gap-10 max-w-screen-lg mx-auto",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "space-y-5",
        children: [/* @__PURE__ */ jsx(InputPair, {
          label: "Name",
          description: "This is the name of your product",
          id: "name",
          name: "name",
          type: "text",
          required: true,
          placeholder: "Name of your product"
        }), actionData && "formErrors" in actionData && actionData?.formErrors?.name && /* @__PURE__ */ jsx("p", {
          className: "text-red-500",
          children: actionData.formErrors.name
        }), /* @__PURE__ */ jsx(InputPair, {
          label: "Tagline",
          description: "60 characters or less",
          id: "tagline",
          name: "tagline",
          required: true,
          type: "text",
          placeholder: "A concise description of your product"
        }), actionData && "formErrors" in actionData && actionData?.formErrors?.tagline && /* @__PURE__ */ jsx("p", {
          className: "text-red-500",
          children: actionData.formErrors.tagline
        }), /* @__PURE__ */ jsx(InputPair, {
          label: "URL",
          description: "The URL of your product",
          id: "url",
          name: "url",
          required: true,
          type: "url",
          placeholder: "https://example.com"
        }), actionData && "formErrors" in actionData && actionData?.formErrors?.url && /* @__PURE__ */ jsx("p", {
          className: "text-red-500",
          children: actionData.formErrors.url
        }), /* @__PURE__ */ jsx(InputPair, {
          textArea: true,
          label: "Description",
          description: "A detailed description of your product",
          id: "description",
          name: "description",
          required: true,
          type: "text",
          placeholder: "A detailed description of your product"
        }), actionData && "formErrors" in actionData && actionData?.formErrors?.description && /* @__PURE__ */ jsx("p", {
          className: "text-red-500",
          children: actionData.formErrors.description
        }), /* @__PURE__ */ jsx(InputPair, {
          textArea: true,
          label: "How it works",
          description: "A detailed description of how your product howItWorks",
          id: "howItWorks",
          name: "howItWorks",
          required: true,
          type: "text",
          placeholder: "A detailed description of how your product works"
        }), actionData && "formErrors" in actionData && actionData?.formErrors?.howItWorks && /* @__PURE__ */ jsx("p", {
          className: "text-red-500",
          children: actionData.formErrors.howItWorks
        }), /* @__PURE__ */ jsx(SelectPair, {
          label: "Category",
          description: "The category of your product",
          name: "category",
          required: true,
          placeholder: "Select a category",
          options: loaderData.categories.map((category) => ({
            label: category.name,
            value: category.category_id.toString()
          }))
        }), actionData && "formErrors" in actionData && actionData?.formErrors?.category && /* @__PURE__ */ jsx("p", {
          className: "text-red-500",
          children: actionData.formErrors.category
        }), /* @__PURE__ */ jsx(Button, {
          type: "submit",
          className: "w-full",
          size: "lg",
          children: "Submit"
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex flex-col space-y-2",
        children: [icon ? /* @__PURE__ */ jsx("div", {
          className: "size-40 rounded-xl shadow-xl overflow-hidden",
          children: /* @__PURE__ */ jsx("img", {
            src: icon,
            alt: "Icon",
            className: "w-full h-full object-cover"
          })
        }) : null, /* @__PURE__ */ jsxs(Label, {
          className: "flex flex-col gap-1",
          children: ["Icon", " ", /* @__PURE__ */ jsx("small", {
            className: "text-muted-foreground",
            children: "This is the icon of your product"
          })]
        }), /* @__PURE__ */ jsx(Input, {
          type: "file",
          className: "w-1/2",
          onChange,
          required: true,
          name: "icon"
        }), actionData && "formErrors" in actionData && actionData?.formErrors?.icon && /* @__PURE__ */ jsx("p", {
          className: "text-red-500",
          children: actionData.formErrors.icon
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex flex-col text-xs",
          children: [/* @__PURE__ */ jsx("span", {
            className: "text-muted-foreground",
            children: "Recommended size: 128x128px"
          }), /* @__PURE__ */ jsx("span", {
            className: "text-muted-foreground",
            children: "Allowed formats: PNG, JPG, or SVG"
          }), /* @__PURE__ */ jsx("span", {
            className: "text-muted-foreground",
            children: "Max size: 1MB"
          })]
        })]
      })]
    })]
  });
});
const route13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$g,
  default: submitProductPage,
  loader: loader$x,
  meta: meta$r
}, Symbol.toStringTag, { value: "Module" }));
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}) {
  const defaultClassNames = getDefaultClassNames();
  return /* @__PURE__ */ jsx(
    DayPicker,
    {
      showOutsideDays,
      className: cn(
        "bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      ),
      captionLayout,
      formatters: {
        formatMonthDropdown: (date) => date.toLocaleString("default", { month: "short" }),
        ...formatters
      },
      classNames: {
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "flex gap-4 flex-col md:flex-row relative",
          defaultClassNames.months
        ),
        month: cn("flex flex-col w-full gap-4", defaultClassNames.month),
        nav: cn(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "absolute bg-popover inset-0 opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "select-none font-medium",
          captionLayout === "label" ? "text-sm" : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none",
          defaultClassNames.weekday
        ),
        week: cn("flex w-full mt-2", defaultClassNames.week),
        week_number_header: cn(
          "select-none w-(--cell-size)",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-[0.8rem] select-none text-muted-foreground",
          defaultClassNames.week_number
        ),
        day: cn(
          "relative w-full h-full p-0 text-center [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
          props.showWeekNumber ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-md" : "[&:first-child[data-selected=true]_button]:rounded-l-md",
          defaultClassNames.day
        ),
        range_start: cn(
          "rounded-l-md bg-accent",
          defaultClassNames.range_start
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("rounded-r-md bg-accent", defaultClassNames.range_end),
        today: cn(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "text-muted-foreground aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-muted-foreground opacity-50",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames
      },
      components: {
        Root: ({ className: className2, rootRef, ...props2 }) => {
          return /* @__PURE__ */ jsx(
            "div",
            {
              "data-slot": "calendar",
              ref: rootRef,
              className: cn(className2),
              ...props2
            }
          );
        },
        Chevron: ({ className: className2, orientation, ...props2 }) => {
          if (orientation === "left") {
            return /* @__PURE__ */ jsx(ChevronLeftIcon, { className: cn("size-4", className2), ...props2 });
          }
          if (orientation === "right") {
            return /* @__PURE__ */ jsx(
              ChevronRightIcon,
              {
                className: cn("size-4", className2),
                ...props2
              }
            );
          }
          return /* @__PURE__ */ jsx(ChevronDownIcon, { className: cn("size-4", className2), ...props2 });
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props2 }) => {
          return /* @__PURE__ */ jsx("td", { ...props2, children: /* @__PURE__ */ jsx("div", { className: "flex size-(--cell-size) items-center justify-center text-center", children }) });
        },
        ...components
      },
      ...props
    }
  );
}
function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}) {
  const defaultClassNames = getDefaultClassNames();
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);
  return /* @__PURE__ */ jsx(
    Button,
    {
      ref,
      variant: "ghost",
      size: "icon",
      "data-day": day.date.toLocaleDateString(),
      "data-selected-single": modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle,
      "data-range-start": modifiers.range_start,
      "data-range-end": modifiers.range_end,
      "data-range-middle": modifiers.range_middle,
      className: cn(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      ),
      ...props
    }
  );
}
const meta$q = () => {
  return [{
    title: "Promote a Product | Product Hunt Clone"
  }, {
    name: "description",
    content: "Promote your product"
  }];
};
const promotePage = UNSAFE_withComponentProps(function PromotePage() {
  const [promotionPeriod, setPromotionPeriod] = useState();
  const totalDays = promotionPeriod?.from && promotionPeriod.to ? DateTime.fromJSDate(promotionPeriod.to).diff(DateTime.fromJSDate(promotionPeriod.from), "days").days : 0;
  const widgets = useRef(null);
  const initedToss = useRef(false);
  useEffect(() => {
    const initToss = async () => {
      if (initedToss.current) return;
      initedToss.current = true;
      const toss = await loadTossPayments("test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm");
      widgets.current = await toss.widgets({
        customerKey: "1111111"
      });
      await widgets.current.setAmount({
        value: 0,
        currency: "KRW"
      });
      await widgets.current.renderPaymentMethods({
        selector: "#toss-payment-methods"
      });
      await widgets.current.renderAgreement({
        selector: "#toss-payment-agreement"
      });
    };
    initToss();
  }, []);
  useEffect(() => {
    const updateAmount = async () => {
      if (widgets.current) {
        await widgets.current.setAmount({
          value: totalDays * 30,
          currency: "KRW"
        });
      }
    };
    updateAmount();
  }, [promotionPeriod]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const product = formData.get("product");
    if (!product || !promotionPeriod?.to || !promotionPeriod?.from) return;
    await widgets.current?.requestPayment({
      orderId: crypto.randomUUID(),
      orderName: `WeMake Promotion`,
      customerEmail: "nico@nomadcoders.co",
      customerName: "Nico",
      customerMobilePhone: "01012345678",
      metadata: {
        product,
        promotionFrom: DateTime.fromJSDate(promotionPeriod.from).toISO(),
        promotionTo: DateTime.fromJSDate(promotionPeriod.to).toISO()
      },
      successUrl: `${window.location.href}/success`,
      failUrl: `${window.location.href}/fail`
    });
  };
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx(Hero, {
      title: "Promote Your Product",
      subtitle: "Boost your product's visibility."
    }), /* @__PURE__ */ jsxs("form", {
      onSubmit: handleSubmit,
      className: "grid grid-cols-6 gap-10",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "col-span-3 mx-auto w-1/2 flex flex-col gap-10 items-start",
        children: [/* @__PURE__ */ jsx(SelectPair, {
          required: true,
          label: "Select a product",
          description: "Select the product you want to promote.",
          name: "product",
          placeholder: "Select a product",
          options: [{
            label: "AI Dark Mode Maker",
            value: "ai-dark-mode-maker"
          }]
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex flex-col gap-2 items-center w-full",
          children: [/* @__PURE__ */ jsxs(Label, {
            className: "flex flex-col gap-1",
            children: ["Select a range of dates for promotion", " ", /* @__PURE__ */ jsx("small", {
              className: "text-muted-foreground text-center ",
              children: "Minimum duration is 3 days."
            })]
          }), /* @__PURE__ */ jsx(Calendar, {
            mode: "range",
            selected: promotionPeriod,
            onSelect: setPromotionPeriod,
            min: 3,
            disabled: {
              before: /* @__PURE__ */ new Date()
            }
          })]
        })]
      }), /* @__PURE__ */ jsxs("aside", {
        className: "col-span-3 px-20 flex flex-col items-center",
        children: [/* @__PURE__ */ jsx("div", {
          id: "toss-payment-methods",
          className: "w-full"
        }), /* @__PURE__ */ jsx("div", {
          id: "toss-payment-agreement"
        }), /* @__PURE__ */ jsxs(Button, {
          className: "w-full",
          disabled: totalDays === 0,
          children: ["Checkout (", (totalDays * 30).toLocaleString("ko-KR", {
            style: "currency",
            currency: "KRW"
          }), ")"]
        })]
      })]
    })]
  });
});
const route14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: promotePage,
  meta: meta$q
}, Symbol.toStringTag, { value: "Module" }));
const paramsSchema$2 = z.object({
  paymentType: z.string(),
  orderId: z.string().uuid(),
  paymentKey: z.string(),
  amount: z.coerce.number()
});
const TOSS_SECRET_KEY = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";
const loader$w = async ({
  request
}) => {
  const url = new URL(request.url);
  const {
    success,
    data: data2
  } = paramsSchema$2.safeParse(Object.fromEntries(url.searchParams));
  if (!success) {
    return new Response(null, {
      status: 400
    });
  }
  const encryptedSecretKey = `Basic ${Buffer.from(TOSS_SECRET_KEY + ":").toString("base64")}`;
  const response = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
    method: "POST",
    headers: {
      Authorization: encryptedSecretKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      orderId: data2.orderId,
      paymentKey: data2.paymentKey,
      amount: data2.amount
    })
  });
  const responseData = await response.json();
  return Response.json(responseData);
};
const route15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$w
}, Symbol.toStringTag, { value: "Module" }));
const loader$v = ({
  params
}) => {
  const {
    productId
  } = params;
  return redirect(`/products/${productId}/overview`);
};
const route16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$v
}, Symbol.toStringTag, { value: "Module" }));
function meta$p({
  data: data2
}) {
  return [{
    title: `${data2.product.name} Overview | wemake`
  }, {
    name: "description",
    content: "View product details and information"
  }];
}
const loader$u = async ({
  request,
  params
}) => {
  const {
    client,
    headers
  } = makeSSRClient(request);
  const product = await getProductById(client, {
    productId: params.productId
  });
  return {
    product
  };
};
const productOverviewLayout = UNSAFE_withComponentProps(function ProductOverviewLayout({
  loaderData
}) {
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-10",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex justify-between",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "flex gap-10",
        children: [/* @__PURE__ */ jsx("div", {
          className: "size-40 rounded-xl overflow-hidden  shadow-xl bg-primary/50",
          children: /* @__PURE__ */ jsx("img", {
            src: loaderData.product.icon,
            alt: loaderData.product.name,
            className: "size-full object-cover"
          })
        }), /* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("h1", {
            className: "text-5xl font-bold",
            children: loaderData.product.name
          }), /* @__PURE__ */ jsx("p", {
            className: " text-2xl font-light",
            children: loaderData.product.description
          }), /* @__PURE__ */ jsxs("div", {
            className: "mt-5 flex items-center gap-2",
            children: [/* @__PURE__ */ jsx("div", {
              className: "flex text-yellow-400",
              children: Array.from({
                length: 5
              }).map((_, i) => /* @__PURE__ */ jsx(StarIcon, {
                className: "size-4",
                fill: i < Math.floor(loaderData.product.average_rating) ? "currentColor" : "none"
              }))
            }), /* @__PURE__ */ jsxs("span", {
              className: "text-muted-foreground ",
              children: [loaderData.product.reviews, " reviews"]
            })]
          })]
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex gap-5",
        children: [/* @__PURE__ */ jsx(Button, {
          variant: "secondary",
          size: "lg",
          asChild: true,
          className: "text-lg h-14 px-10",
          children: /* @__PURE__ */ jsx(Link, {
            to: `/products/${loaderData.product.product_id}/visit`,
            children: "Visit Website"
          })
        }), /* @__PURE__ */ jsxs(Button, {
          size: "lg",
          className: "text-lg h-14 px-10",
          children: [/* @__PURE__ */ jsx(ChevronUpIcon, {
            className: "size-4"
          }), "Upvote (", loaderData.product.upvotes, ")"]
        })]
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "flex gap-2.5",
      children: [/* @__PURE__ */ jsx(NavLink, {
        className: ({
          isActive
        }) => cn(buttonVariants({
          variant: "outline"
        }), isActive && "bg-accent text-foreground "),
        to: `/products/${loaderData.product.product_id}/overview`,
        children: "Overview"
      }), /* @__PURE__ */ jsx(NavLink, {
        end: true,
        className: ({
          isActive
        }) => cn(buttonVariants({
          variant: "outline"
        }), isActive && "bg-accent text-foreground "),
        to: `/products/${loaderData.product.product_id}/reviews`,
        children: "Reviews"
      })]
    }), /* @__PURE__ */ jsx("div", {
      children: /* @__PURE__ */ jsx(Outlet, {
        context: {
          product_id: loaderData.product.product_id,
          description: loaderData.product.description,
          how_it_works: loaderData.product.how_it_works,
          review_count: loaderData.product.reviews
        }
      })
    })]
  });
});
const route17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: productOverviewLayout,
  loader: loader$u,
  meta: meta$p
}, Symbol.toStringTag, { value: "Module" }));
const loader$t = async ({
  request,
  params
}) => {
  const {
    client,
    headers
  } = makeSSRClient(request);
  await client.rpc("track_event", {
    event_type: "product_view",
    event_data: {
      product_id: params.productId
    }
  });
  return null;
};
const productOverviewPage = UNSAFE_withComponentProps(function ProductOverviewPage() {
  const {
    description,
    how_it_works
  } = useOutletContext();
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-10",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "space-y-1",
      children: [/* @__PURE__ */ jsx("h3", {
        className: "text-lg font-bold",
        children: "What is this product?"
      }), /* @__PURE__ */ jsx("p", {
        className: "text-muted-foreground",
        children: description
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "space-y-1",
      children: [/* @__PURE__ */ jsx("h3", {
        className: "text-lg font-bold",
        children: "How does it work?"
      }), /* @__PURE__ */ jsx("p", {
        className: "text-muted-foreground",
        children: how_it_works
      })]
    })]
  });
});
const route18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: productOverviewPage,
  loader: loader$t
}, Symbol.toStringTag, { value: "Module" }));
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Root, { "data-slot": "dialog", ...props });
}
function DialogTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Trigger, { "data-slot": "dialog-trigger", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxs(
      DialogPrimitive.Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 outline-none sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxs(
            DialogPrimitive.Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsx(XIcon, {}),
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
function DialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Description,
    {
      "data-slot": "dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function ReviewCard({
  username,
  handle,
  avatarUrl,
  rating,
  content,
  postedAt
}) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxs(Avatar, { children: [
        /* @__PURE__ */ jsx(AvatarFallback, { children: username[0] }),
        avatarUrl ? /* @__PURE__ */ jsx(AvatarImage, { src: avatarUrl }) : null
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-lg font-bold", children: username }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: handle })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex text-yellow-400", children: Array.from({ length: rating }).map((_, i) => /* @__PURE__ */ jsx(StarIcon, { className: "size-4", fill: "currentColor" }, i)) }),
    /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: content }),
    /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: DateTime.fromISO(postedAt).toRelative() })
  ] });
}
function CreateReviewDialog() {
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const actionData = useActionData();
  return /* @__PURE__ */ jsxs(DialogContent, { children: [
    /* @__PURE__ */ jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsx(DialogTitle, { className: "text-2xl", children: "What do you think of this product?" }),
      /* @__PURE__ */ jsx(DialogDescription, { children: "Share your thoughts and experiences with this product" })
    ] }),
    /* @__PURE__ */ jsxs(Form, { className: "space-y-10", method: "post", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs(Label, { children: [
          "Rating",
          /* @__PURE__ */ jsx("small", { className: "text-muted-foreground", children: "What do you think of this product?" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-2 mt-5", children: ["1", "2", "3", "4", "5"].map((star) => /* @__PURE__ */ jsxs(
          "label",
          {
            className: "relative",
            onMouseEnter: () => setHoveredStar(Number(star)),
            onMouseLeave: () => setHoveredStar(0),
            children: [
              /* @__PURE__ */ jsx(
                StarIcon,
                {
                  className: "size-5 text-yellow-500",
                  fill: hoveredStar >= Number(star) || rating >= Number(star) ? "currentColor" : "none"
                }
              ),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "radio",
                  name: "rating",
                  value: star,
                  required: true,
                  className: "opacity-0 h-px w-px absolute top-0 left-0",
                  onChange: () => setRating(Number(star))
                }
              )
            ]
          },
          star
        )) }),
        actionData?.formErrors?.rating && /* @__PURE__ */ jsx("p", { className: "text-red-500", children: actionData.formErrors.rating.join(", ") })
      ] }),
      /* @__PURE__ */ jsx(
        InputPair,
        {
          textArea: true,
          required: true,
          name: "review",
          label: "Review",
          description: "Minimum 1000 characters",
          placeholder: "Tell us more about your experience with this product"
        }
      ),
      actionData?.formErrors?.review && /* @__PURE__ */ jsx("p", { className: "text-red-500", children: actionData.formErrors.review.join(", ") }),
      /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsx(Button, { children: "Submit review" }) })
    ] })
  ] });
}
function meta$o() {
  return [{
    title: "Product Reviews | wemake"
  }, {
    name: "description",
    content: "Read and write reviews for products"
  }];
}
const loader$s = async ({
  request,
  params
}) => {
  const {
    client,
    headers
  } = makeSSRClient(request);
  const reviews = await getReviews(client, {
    productId: params.productId
  });
  return {
    reviews
  };
};
const formSchema$9 = z$1.object({
  review: z$1.string().min(1),
  rating: z$1.coerce.number().min(1).max(5)
});
const action$f = async ({
  request,
  params
}) => {
  const {
    client,
    headers
  } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const {
    success,
    error,
    data: data2
  } = formSchema$9.safeParse(Object.fromEntries(formData));
  if (!success) {
    return {
      formErrors: error.flatten().fieldErrors
    };
  }
  await createProductReview(client, {
    productId: params.productId,
    review: data2.review,
    rating: data2.rating,
    userId
  });
  return {
    ok: true
  };
};
const productReviewsPage = UNSAFE_withComponentProps(function ProductReviewsPage({
  loaderData,
  actionData
}) {
  const {
    review_count
  } = useOutletContext();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (actionData?.ok) {
      setOpen(false);
    }
  }, [actionData]);
  return /* @__PURE__ */ jsxs(Dialog, {
    open,
    onOpenChange: setOpen,
    children: [/* @__PURE__ */ jsxs("div", {
      className: "space-y-10 max-w-xl",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "flex justify-between items-center",
        children: [/* @__PURE__ */ jsxs("h2", {
          className: "text-2xl font-bold",
          children: [review_count, " Reviews"]
        }), /* @__PURE__ */ jsx(DialogTrigger, {
          children: /* @__PURE__ */ jsx(Button, {
            variant: "secondary",
            children: "Write a review"
          })
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "space-y-20",
        children: loaderData.reviews.map((review) => /* @__PURE__ */ jsx(ReviewCard, {
          username: review.user.name,
          handle: review.user.username,
          avatarUrl: review.user.avatar,
          rating: review.rating,
          content: review.review,
          postedAt: review.created_at
        }, review.review_id))
      })]
    }), /* @__PURE__ */ jsx(CreateReviewDialog, {})]
  });
});
const route19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$f,
  default: productReviewsPage,
  loader: loader$s,
  meta: meta$o
}, Symbol.toStringTag, { value: "Module" }));
const loader$r = async ({
  request,
  params
}) => {
  const {
    client,
    headers
  } = makeSSRClient(request);
  const {
    error,
    data: data2
  } = await client.from("products").select("url").eq("product_id", Number(params.productId)).single();
  if (data2) {
    await client.rpc("track_event", {
      event_type: "product_visit",
      event_data: {
        product_id: params.productId
      }
    });
    return redirect(data2.url);
  }
};
const route20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$r
}, Symbol.toStringTag, { value: "Module" }));
const meta$n = () => {
  return [{
    title: "IdeasGPT | wemake"
  }, {
    name: "description",
    content: "Find ideas for your next project"
  }];
};
const loader$q = async ({
  request
}) => {
  const {
    client,
    headers
  } = makeSSRClient(request);
  const ideas = await getGptIdeas(client, {
    limit: 20
  });
  return {
    ideas
  };
};
const ideasPage = UNSAFE_withComponentProps(function IdeasPage({
  loaderData
}) {
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-20",
    children: [/* @__PURE__ */ jsx(Hero, {
      title: "IdeasGPT",
      subtitle: "Find ideas for your next project"
    }), /* @__PURE__ */ jsx("div", {
      className: "grid grid-cols-4 gap-4",
      children: loaderData.ideas.map((idea) => /* @__PURE__ */ jsx(IdeaCard, {
        id: idea.gpt_idea_id,
        title: idea.idea,
        viewsCount: idea.views,
        postedAt: idea.created_at,
        likesCount: idea.likes,
        claimed: idea.is_claimed
      }))
    })]
  });
});
const route21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ideasPage,
  loader: loader$q,
  meta: meta$n
}, Symbol.toStringTag, { value: "Module" }));
const claimIdea = async (client, { ideaId, userId }) => {
  const { error } = await client.from("gpt_ideas").update({ claimed_by: userId, claimed_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("gpt_idea_id", Number(ideaId));
  if (error) {
    throw error;
  }
};
const insertIdeas = async (client, ideas) => {
  const { error } = await client.from("gpt_ideas").insert(
    ideas.map((idea) => ({
      idea
    }))
  );
  if (error) {
    throw error;
  }
};
const meta$m = ({
  data: {
    idea: {
      gpt_idea_id,
      idea
    }
  }
}) => {
  return [{
    title: `Idea #${gpt_idea_id}: ${idea}| wemake`
  }, {
    name: "description",
    content: "Find ideas for your next project"
  }];
};
const loader$p = async ({
  request,
  params
}) => {
  const {
    client
  } = makeSSRClient(request);
  const idea = await getGptIdea(client, {
    ideaId: params.ideaId
  });
  if (idea.is_claimed) {
    throw redirect(`/ideas`);
  }
  return {
    idea
  };
};
const action$e = async ({
  request,
  params
}) => {
  const {
    client
  } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const idea = await getGptIdea(client, {
    ideaId: params.ideaId
  });
  if (idea.is_claimed) {
    return {
      ok: false
    };
  }
  await claimIdea(client, {
    ideaId: params.ideaId,
    userId
  });
  return redirect(`/my/dashboard/ideas`);
};
const ideaPage = UNSAFE_withComponentProps(function IdeaPage({
  loaderData
}) {
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx(Hero, {
      title: `Idea #${loaderData.idea.gpt_idea_id}`
    }), /* @__PURE__ */ jsxs("div", {
      className: "max-w-screen-sm mx-auto flex flex-col items-center gap-10",
      children: [/* @__PURE__ */ jsx("p", {
        className: "italic text-center",
        children: loaderData.idea.idea
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex items-center text-sm",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex items-center gap-1",
          children: [/* @__PURE__ */ jsx(EyeIcon, {
            className: "w-4 h-4"
          }), /* @__PURE__ */ jsx("span", {
            children: loaderData.idea.views
          })]
        }), /* @__PURE__ */ jsx(DotIcon, {
          className: "w-4 h-4"
        }), /* @__PURE__ */ jsx("span", {
          children: DateTime.fromISO(loaderData.idea.created_at).toRelative()
        }), /* @__PURE__ */ jsx(DotIcon, {
          className: "w-4 h-4"
        }), /* @__PURE__ */ jsxs(Button, {
          variant: "outline",
          children: [/* @__PURE__ */ jsx(HeartIcon, {
            className: "w-4 h-4"
          }), /* @__PURE__ */ jsx("span", {
            children: loaderData.idea.likes
          })]
        })]
      }), loaderData.idea.is_claimed ? null : /* @__PURE__ */ jsx(Form, {
        method: "post",
        children: /* @__PURE__ */ jsx(Button, {
          size: "lg",
          children: "Claim idea"
        })
      })]
    })]
  });
});
const route22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$e,
  default: ideaPage,
  loader: loader$p,
  meta: meta$m
}, Symbol.toStringTag, { value: "Module" }));
const adminClient = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
const openai = new OpenAI();
const IdeaSchema = z$1.object({
  title: z$1.string(),
  description: z$1.string(),
  problem: z$1.string(),
  solution: z$1.string(),
  category: z$1.enum(["tech", "business", "health", "education", "finance", "other"])
});
const ResponseSchema = z$1.object({
  potato: z$1.array(IdeaSchema)
});
const action$d = async ({
  request
}) => {
  if (request.method !== "POST") {
    return new Response(null, {
      status: 404
    });
  }
  const header = request.headers.get("nowayHack^^");
  if (!header || header !== "goBack") {
    return new Response(null, {
      status: 404
    });
  }
  const completion = await openai.chat.completions.parse({
    model: "gpt-4o-mini",
    messages: [{
      role: "user",
      content: "Give the name and elevator pitch of startup ideas that can be built by small teams."
    }, {
      role: "user",
      content: "For example: 'An app that helps you find the best deals on groceries.', or 'A platform to rent a coder per hour.'"
    }, {
      role: "user",
      content: "Give me 10 ideas."
    }],
    response_format: zodResponseFormat(ResponseSchema, "potato")
  });
  const descriptions = completion.choices[0].message.parsed?.potato.map((idea) => idea.description);
  if (!descriptions) {
    return Response.json({
      error: "No ideas generated"
    }, {
      status: 400
    });
  }
  await insertIdeas(adminClient, descriptions);
  return Response.json({
    ok: true
  });
};
const route23 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$d
}, Symbol.toStringTag, { value: "Module" }));
const JOB_TYPES = [
  {
    label: "Full-Time",
    value: "full-time"
  },
  {
    label: "Part-Time",
    value: "part-time"
  },
  {
    label: "Freelance",
    value: "freelance"
  },
  {
    label: "Internship",
    value: "internship"
  }
];
const LOCATION_TYPES = [
  {
    label: "Remote",
    value: "remote"
  },
  {
    label: "In-Person",
    value: "in-person"
  },
  {
    label: "Hybrid",
    value: "hybrid"
  }
];
const SALARY_RANGE = [
  "$0 - $50,000",
  "$50,000 - $70,000",
  "$70,000 - $100,000",
  "$100,000 - $120,000",
  "$120,000 - $150,000",
  "$150,000 - $250,000",
  "$250,000+"
];
const meta$l = () => {
  return [{
    title: "Jobs | wemake"
  }, {
    name: "description",
    content: "Find your dream job at wemake"
  }];
};
const searchParamsSchema$1 = z$1.object({
  type: z$1.enum(JOB_TYPES.map((type) => type.value)).optional(),
  location: z$1.enum(LOCATION_TYPES.map((type) => type.value)).optional(),
  salary: z$1.enum(SALARY_RANGE).optional()
});
const loader$o = async ({
  request
}) => {
  const url = new URL(request.url);
  const {
    success,
    data: parsedData
  } = searchParamsSchema$1.safeParse(Object.fromEntries(url.searchParams));
  if (!success) {
    throw data({
      error_code: "invalid_search_params",
      message: "Invalid search params"
    }, {
      status: 400
    });
  }
  const {
    client,
    headers
  } = makeSSRClient(request);
  const jobs = await getJobs(client, {
    limit: 40,
    location: parsedData.location,
    type: parsedData.type,
    salary: parsedData.salary
  });
  return {
    jobs
  };
};
const jobsPage = UNSAFE_withComponentProps(function JobsPage({
  loaderData
}) {
  const [searchParams2, setSearchParams] = useSearchParams();
  const onFilterClick = (key, value) => {
    searchParams2.set(key, value);
    setSearchParams(searchParams2);
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-20",
    children: [/* @__PURE__ */ jsx(Hero, {
      title: "Jobs",
      subtitle: "Companies looking for makers"
    }), /* @__PURE__ */ jsxs("div", {
      className: "grid grid-cols-1 xl:grid-cols-6 gap-20 items-start",
      children: [/* @__PURE__ */ jsx("div", {
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:col-span-4 gap-5",
        children: loaderData.jobs.map((job) => /* @__PURE__ */ jsx(JobCard, {
          id: job.job_id,
          company: job.company_name,
          companyLogoUrl: job.company_logo,
          companyHq: job.company_location,
          title: job.position,
          postedAt: job.created_at,
          type: job.job_type,
          positionLocation: job.location,
          salary: job.salary_range
        }))
      }), /* @__PURE__ */ jsxs("div", {
        className: "xl:col-span-2 sticky top-20 flex flex-col gap-10",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex flex-col items-start gap-2.5",
          children: [/* @__PURE__ */ jsx("h4", {
            className: "text-sm text-muted-foreground font-bold",
            children: "Type"
          }), /* @__PURE__ */ jsx("div", {
            className: "flex flex-wrap gap-2",
            children: JOB_TYPES.map((type) => /* @__PURE__ */ jsx(Button, {
              variant: "outline",
              onClick: () => onFilterClick("type", type.value),
              className: cn(type.value === searchParams2.get("type") ? "bg-accent" : ""),
              children: type.label
            }))
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex flex-col items-start gap-2.5",
          children: [/* @__PURE__ */ jsx("h4", {
            className: "text-sm text-muted-foreground font-bold",
            children: "Location"
          }), /* @__PURE__ */ jsx("div", {
            className: "flex flex-wrap gap-2",
            children: LOCATION_TYPES.map((location) => /* @__PURE__ */ jsx(Button, {
              variant: "outline",
              onClick: () => onFilterClick("location", location.value),
              className: cn(location.value === searchParams2.get("location") ? "bg-accent" : ""),
              children: location.label
            }))
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex flex-col items-start gap-2.5",
          children: [/* @__PURE__ */ jsx("h4", {
            className: "text-sm text-muted-foreground font-bold",
            children: "Salary Range"
          }), /* @__PURE__ */ jsx("div", {
            className: "flex flex-wrap gap-2",
            children: SALARY_RANGE.map((range) => /* @__PURE__ */ jsx(Button, {
              variant: "outline",
              onClick: () => onFilterClick("salary", range),
              className: cn(range === searchParams2.get("salary") ? "bg-accent" : ""),
              children: range
            }))
          })]
        })]
      })]
    })]
  });
});
const route24 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: jobsPage,
  loader: loader$o,
  meta: meta$l
}, Symbol.toStringTag, { value: "Module" }));
const meta$k = ({
  data: data2
}) => {
  return [{
    title: `${data2.job.position} | wemake`
  }];
};
const loader$n = async ({
  request,
  params
}) => {
  const {
    client,
    headers
  } = makeSSRClient(request);
  const job = await getJobById(client, {
    jobId: params.jobId
  });
  return {
    job
  };
};
const jobPage = UNSAFE_withComponentProps(function JobPage({
  loaderData
}) {
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx("div", {
      className: "bg-linear-to-tr from-primary/80 to-primary/10 h-60 w-full rounded-lg"
    }), /* @__PURE__ */ jsxs("div", {
      className: "grid grid-cols-6 -mt-20 gap-20 items-start",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "col-span-4 space-y-10",
        children: [/* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("div", {
            className: "size-40 bg-white rounded-full  overflow-hidden relative left-10",
            children: /* @__PURE__ */ jsx("img", {
              src: loaderData.job.company_logo,
              className: "object-cover"
            })
          }), /* @__PURE__ */ jsx("h1", {
            className: "text-4xl font-bold mt-5",
            children: loaderData.job.position
          }), /* @__PURE__ */ jsx("h4", {
            className: "text-lg text-muted-foreground",
            children: loaderData.job.company_name
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex gap-2 capitalize",
          children: [/* @__PURE__ */ jsx(Badge, {
            variant: "secondary",
            children: loaderData.job.job_type
          }), /* @__PURE__ */ jsx(Badge, {
            variant: "secondary",
            children: loaderData.job.location
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "space-y-2.5",
          children: [/* @__PURE__ */ jsx("h4", {
            className: "text-2xl font-bold",
            children: "Overview"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-lg",
            children: loaderData.job.overview
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "space-y-2.5",
          children: [/* @__PURE__ */ jsx("h4", {
            className: "text-2xl font-bold",
            children: "Responsibilities"
          }), /* @__PURE__ */ jsx("ul", {
            className: "text-lg list-disc list-inside",
            children: loaderData.job.responsibilities.split(",").map((item) => /* @__PURE__ */ jsx("li", {
              children: item
            }, item))
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "space-y-2.5",
          children: [/* @__PURE__ */ jsx("h4", {
            className: "text-2xl font-bold",
            children: "Qualifications"
          }), /* @__PURE__ */ jsx("ul", {
            className: "text-lg list-disc list-inside",
            children: loaderData.job.qualifications.split(",").map((item) => /* @__PURE__ */ jsx("li", {
              children: item
            }, item))
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "space-y-2.5",
          children: [/* @__PURE__ */ jsx("h4", {
            className: "text-2xl font-bold",
            children: "Benefits"
          }), /* @__PURE__ */ jsx("ul", {
            className: "text-lg list-disc list-inside",
            children: loaderData.job.benefits.split(",").map((item) => /* @__PURE__ */ jsx("li", {
              children: item
            }, item))
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "space-y-2.5",
          children: [/* @__PURE__ */ jsx("h4", {
            className: "text-2xl font-bold",
            children: "Skills"
          }), /* @__PURE__ */ jsx("ul", {
            className: "text-lg list-disc list-inside",
            children: loaderData.job.skills.split(",").map((item) => /* @__PURE__ */ jsx("li", {
              children: item
            }, item))
          })]
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "col-span-2 space-y-5 mt-32 sticky top-20 p-6 border rounded-lg",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex flex-col",
          children: [/* @__PURE__ */ jsx("span", {
            className: " text-sm text-muted-foreground",
            children: "Avg. Salary"
          }), /* @__PURE__ */ jsx("span", {
            className: "text-2xl font-medium",
            children: loaderData.job.salary_range
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex flex-col",
          children: [/* @__PURE__ */ jsx("span", {
            className: " text-sm text-muted-foreground",
            children: "Location"
          }), /* @__PURE__ */ jsx("span", {
            className: "text-2xl font-medium capitalize",
            children: loaderData.job.location
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex flex-col",
          children: [/* @__PURE__ */ jsx("span", {
            className: " text-sm text-muted-foreground",
            children: "Type"
          }), /* @__PURE__ */ jsx("span", {
            className: "text-2xl font-medium capitalize",
            children: loaderData.job.job_type
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex",
          children: [/* @__PURE__ */ jsxs("span", {
            className: " text-sm text-muted-foreground",
            children: ["Posted ", DateTime.fromISO(loaderData.job.created_at).toRelative()]
          }), /* @__PURE__ */ jsx(DotIcon, {
            className: "size-4"
          }), /* @__PURE__ */ jsx("span", {
            className: " text-sm text-muted-foreground",
            children: "395 views"
          })]
        }), /* @__PURE__ */ jsx(Button, {
          className: "w-full",
          children: "Apply Now"
        })]
      })]
    })]
  });
});
const route25 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: jobPage,
  loader: loader$n,
  meta: meta$k
}, Symbol.toStringTag, { value: "Module" }));
const createJob = async (client, data2) => {
  const { data: jobData, error } = await client.from("jobs").insert({
    position: data2.position,
    overview: data2.overview,
    responsibilities: data2.responsibilities,
    qualifications: data2.qualifications,
    benefits: data2.benefits,
    skills: data2.skills,
    company_name: data2.companyName,
    company_logo: data2.companyLogoUrl,
    company_location: data2.companyLocation,
    apply_url: data2.applyUrl,
    job_type: data2.jobType,
    location: data2.jobLocation,
    salary_range: data2.salaryRange
  }).select().single();
  if (error) {
    throw error;
  }
  return jobData;
};
const meta$j = () => {
  return [{
    title: "Submit a Job | wemake"
  }, {
    name: "description",
    content: "Reach out to the best developers in the world"
  }];
};
const loader$m = async ({
  request
}) => {
  const {
    client
  } = makeSSRClient(request);
  await getLoggedInUserId(client);
};
const formSchema$8 = z$1.object({
  position: z$1.string().max(40),
  overview: z$1.string().max(400),
  responsibilities: z$1.string().max(400),
  qualifications: z$1.string().max(400),
  benefits: z$1.string().max(400),
  skills: z$1.string().max(400),
  companyName: z$1.string().max(40),
  companyLogoUrl: z$1.string().max(40),
  companyLocation: z$1.string().max(40),
  applyUrl: z$1.string().max(40),
  jobType: z$1.enum(JOB_TYPES.map((type) => type.value)),
  jobLocation: z$1.enum(LOCATION_TYPES.map((location) => location.value)),
  salaryRange: z$1.enum(SALARY_RANGE)
});
const action$c = async ({
  request
}) => {
  const {
    client
  } = makeSSRClient(request);
  await getLoggedInUserId(client);
  const formData = await request.formData();
  const {
    success,
    data: data2,
    error
  } = formSchema$8.safeParse(Object.fromEntries(formData));
  if (!success) {
    return {
      fieldErrors: error.flatten().fieldErrors
    };
  }
  const {
    job_id
  } = await createJob(client, data2);
  return redirect(`/jobs/${job_id}`);
};
const submitJobPage = UNSAFE_withComponentProps(function SubmitJobPage({
  actionData
}) {
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx(Hero, {
      title: "Post a Job",
      subtitle: "Reach out to the best developers in the world"
    }), /* @__PURE__ */ jsxs(Form, {
      className: "max-w-screen-2xl flex flex-col items-center gap-10 mx-auto",
      method: "post",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "grid grid-cols-3 w-full gap-10",
        children: [/* @__PURE__ */ jsx(InputPair, {
          label: "Position",
          description: "(40 characters max)",
          name: "position",
          maxLength: 40,
          type: "text",
          id: "position",
          required: true,
          defaultValue: "Senior React Developer"
        }), actionData && "fieldErrors" in actionData && /* @__PURE__ */ jsx("p", {
          className: "text-red-500",
          children: actionData.fieldErrors.position
        }), /* @__PURE__ */ jsx(InputPair, {
          id: "overview",
          label: "Overview",
          description: "(400 characters max)",
          name: "overview",
          maxLength: 400,
          type: "text",
          required: true,
          defaultValue: "We are looking for a Senior React Developer",
          textArea: true
        }), actionData && "fieldErrors" in actionData && /* @__PURE__ */ jsx("p", {
          className: "text-red-500",
          children: actionData.fieldErrors.overview
        }), /* @__PURE__ */ jsx(InputPair, {
          id: "responsibilities",
          label: "Responsibilities",
          description: "(400 characters max, comma separated)",
          name: "responsibilities",
          maxLength: 400,
          type: "text",
          required: true,
          defaultValue: "Implement new features, Maintain code quality, etc.",
          textArea: true
        }), actionData && "fieldErrors" in actionData && /* @__PURE__ */ jsx("p", {
          className: "text-red-500",
          children: actionData.fieldErrors.responsibilities
        }), /* @__PURE__ */ jsx(InputPair, {
          id: "qualifications",
          label: "Qualifications",
          description: "(400 characters max, comma separated)",
          name: "qualifications",
          maxLength: 400,
          type: "text",
          required: true,
          defaultValue: "3+ years of experience, Strong TypeScript skills, etc.",
          textArea: true
        }), actionData && "fieldErrors" in actionData && /* @__PURE__ */ jsx("p", {
          className: "text-red-500",
          children: actionData.fieldErrors.qualifications
        }), /* @__PURE__ */ jsx(InputPair, {
          id: "benefits",
          label: "Benefits",
          description: "(400 characters max, comma separated)",
          name: "benefits",
          maxLength: 400,
          type: "text",
          required: true,
          defaultValue: "Flexible working hours, Health insurance, etc.",
          textArea: true
        }), actionData && "fieldErrors" in actionData && /* @__PURE__ */ jsx("p", {
          className: "text-red-500",
          children: actionData.fieldErrors.benefits
        }), /* @__PURE__ */ jsx(InputPair, {
          id: "skills",
          label: "Skills",
          description: "(400 characters max, comma separated)",
          name: "skills",
          maxLength: 400,
          type: "text",
          required: true,
          defaultValue: "React, TypeScript, etc.",
          textArea: true
        }), actionData && "fieldErrors" in actionData && /* @__PURE__ */ jsx("p", {
          className: "text-red-500",
          children: actionData.fieldErrors.skills
        }), /* @__PURE__ */ jsx(InputPair, {
          id: "companyName",
          label: "Company Name",
          description: "(40 characters max)",
          name: "companyName",
          maxLength: 40,
          type: "text",
          required: true,
          defaultValue: "wemake"
        }), actionData && "fieldErrors" in actionData && /* @__PURE__ */ jsx("p", {
          className: "text-red-500",
          children: actionData.fieldErrors.companyName
        }), /* @__PURE__ */ jsx(InputPair, {
          id: "companyLogoUrl",
          label: "Company Logo URL",
          description: "(40 characters max)",
          name: "companyLogoUrl",
          type: "url",
          required: true,
          defaultValue: "https://wemake.services/logo.png"
        }), actionData && "fieldErrors" in actionData && /* @__PURE__ */ jsx("p", {
          className: "text-red-500",
          children: actionData.fieldErrors.companyLogoUrl
        }), /* @__PURE__ */ jsx(InputPair, {
          id: "companyLocation",
          label: "Company Location",
          description: "(40 characters max)",
          name: "companyLocation",
          maxLength: 40,
          type: "text",
          required: true,
          defaultValue: "Remote, New York, etc."
        }), actionData && "fieldErrors" in actionData && /* @__PURE__ */ jsx("p", {
          className: "text-red-500",
          children: actionData.fieldErrors.companyLocation
        }), /* @__PURE__ */ jsx(InputPair, {
          id: "applyUrl",
          label: "Apply URL",
          description: "(40 characters max)",
          name: "applyUrl",
          maxLength: 40,
          type: "url",
          required: true,
          defaultValue: "https://wemake.services/apply"
        }), actionData && "fieldErrors" in actionData && /* @__PURE__ */ jsx("p", {
          className: "text-red-500",
          children: actionData.fieldErrors.applyUrl
        }), /* @__PURE__ */ jsx(SelectPair, {
          label: "Job Type",
          description: "Select the type of job",
          name: "jobType",
          required: true,
          placeholder: "Select the type of job",
          options: JOB_TYPES.map((type) => ({
            label: type.label,
            value: type.value
          }))
        }), actionData && "fieldErrors" in actionData && /* @__PURE__ */ jsx("p", {
          className: "text-red-500",
          children: actionData.fieldErrors.jobType
        }), /* @__PURE__ */ jsx(SelectPair, {
          label: "Job Location",
          description: "Select the location of the job",
          name: "jobLocation",
          required: true,
          placeholder: "Select the location of the job",
          options: LOCATION_TYPES.map((location) => ({
            label: location.label,
            value: location.value
          }))
        }), actionData && "fieldErrors" in actionData && /* @__PURE__ */ jsx("p", {
          className: "text-red-500",
          children: actionData.fieldErrors.jobLocation
        }), /* @__PURE__ */ jsx(SelectPair, {
          label: "Salary Range",
          description: "Select the salary range of the job",
          name: "salaryRange",
          required: true,
          placeholder: "Select the salary range of the job",
          options: SALARY_RANGE.map((salary) => ({
            label: salary,
            value: salary
          }))
        }), actionData && "fieldErrors" in actionData && /* @__PURE__ */ jsx("p", {
          className: "text-red-500",
          children: actionData.fieldErrors.salaryRange
        })]
      }), /* @__PURE__ */ jsx(Button, {
        type: "submit",
        className: "w-full max-w-sm",
        size: "lg",
        children: "Post job for $100"
      })]
    })]
  });
});
const route26 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$c,
  default: submitJobPage,
  formSchema: formSchema$8,
  loader: loader$m,
  meta: meta$j
}, Symbol.toStringTag, { value: "Module" }));
const FlickeringGrid = ({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color = "rgb(0, 0, 0)",
  width,
  height,
  className,
  maxOpacity = 0.3,
  ...props
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const memoizedColor = useMemo(() => {
    const toRGBA = (color2) => {
      if (typeof window === "undefined") {
        return `rgba(0, 0, 0,`;
      }
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 1;
      const ctx = canvas.getContext("2d");
      if (!ctx) return "rgba(255, 0, 0,";
      ctx.fillStyle = color2;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data);
      return `rgba(${r}, ${g}, ${b},`;
    };
    return toRGBA(color);
  }, [color]);
  const setupCanvas = useCallback(
    (canvas, width2, height2) => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width2 * dpr;
      canvas.height = height2 * dpr;
      canvas.style.width = `${width2}px`;
      canvas.style.height = `${height2}px`;
      const cols = Math.floor(width2 / (squareSize + gridGap));
      const rows = Math.floor(height2 / (squareSize + gridGap));
      const squares = new Float32Array(cols * rows);
      for (let i = 0; i < squares.length; i++) {
        squares[i] = Math.random() * maxOpacity;
      }
      return { cols, rows, squares, dpr };
    },
    [squareSize, gridGap, maxOpacity]
  );
  const updateSquares = useCallback(
    (squares, deltaTime) => {
      for (let i = 0; i < squares.length; i++) {
        if (Math.random() < flickerChance * deltaTime) {
          squares[i] = Math.random() * maxOpacity;
        }
      }
    },
    [flickerChance, maxOpacity]
  );
  const drawGrid = useCallback(
    (ctx, width2, height2, cols, rows, squares, dpr) => {
      ctx.clearRect(0, 0, width2, height2);
      ctx.fillStyle = "transparent";
      ctx.fillRect(0, 0, width2, height2);
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const opacity = squares[i * rows + j];
          ctx.fillStyle = `${memoizedColor}${opacity})`;
          ctx.fillRect(
            i * (squareSize + gridGap) * dpr,
            j * (squareSize + gridGap) * dpr,
            squareSize * dpr,
            squareSize * dpr
          );
        }
      }
    },
    [memoizedColor, squareSize, gridGap]
  );
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationFrameId;
    let gridParams;
    const updateCanvasSize = () => {
      const newWidth = width || container.clientWidth;
      const newHeight = height || container.clientHeight;
      setCanvasSize({ width: newWidth, height: newHeight });
      gridParams = setupCanvas(canvas, newWidth, newHeight);
    };
    updateCanvasSize();
    let lastTime = 0;
    const animate = (time) => {
      if (!isInView) return;
      const deltaTime = (time - lastTime) / 1e3;
      lastTime = time;
      updateSquares(gridParams.squares, deltaTime);
      drawGrid(
        ctx,
        canvas.width,
        canvas.height,
        gridParams.cols,
        gridParams.rows,
        gridParams.squares,
        gridParams.dpr
      );
      animationFrameId = requestAnimationFrame(animate);
    };
    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize();
    });
    resizeObserver.observe(container);
    const intersectionObserver = new IntersectionObserver(
      ([entry2]) => {
        setIsInView(entry2.isIntersecting);
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(canvas);
    if (isInView) {
      animationFrameId = requestAnimationFrame(animate);
    }
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [setupCanvas, updateSquares, drawGrid, width, height, isInView]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: containerRef,
      className: cn(`h-full w-full ${className}`),
      ...props,
      children: /* @__PURE__ */ jsx(
        "canvas",
        {
          ref: canvasRef,
          className: "pointer-events-none",
          style: {
            width: canvasSize.width,
            height: canvasSize.height
          }
        }
      )
    }
  );
};
const authLayout = UNSAFE_withComponentProps(function AuthLayout() {
  return /* @__PURE__ */ jsxs("div", {
    className: "grid grid-cols-1 lg:grid-cols-2 h-screen",
    children: [/* @__PURE__ */ jsx("div", {
      className: "hidden lg:block",
      children: /* @__PURE__ */ jsx(FlickeringGrid, {
        squareSize: 4,
        gridGap: 5,
        maxOpacity: 0.5,
        flickerChance: 0.2,
        color: "#E11D48"
      })
    }), /* @__PURE__ */ jsx(Outlet, {})]
  });
});
const route27 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: authLayout
}, Symbol.toStringTag, { value: "Module" }));
function AuthButtons() {
  return /* @__PURE__ */ jsxs("div", { className: "w-full flex flex-col items-center gap-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "w-full flex flex-col items-center gap-2", children: [
      /* @__PURE__ */ jsx(Separator, { className: "w-full" }),
      /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground uppercase font-medium", children: "Or continue with" }),
      /* @__PURE__ */ jsx(Separator, { className: "w-full" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-full flex flex-col gap-2", children: [
      /* @__PURE__ */ jsx(Button, { variant: "outline", className: "w-full", asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: "/auth/social/kakao/start", children: [
        /* @__PURE__ */ jsx(MessageCircleIcon, { className: "w-4 h-4" }),
        "Kakao Talk"
      ] }) }),
      /* @__PURE__ */ jsx(Button, { variant: "outline", className: "w-full", asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: "/auth/social/github/start", children: [
        /* @__PURE__ */ jsx(GithubIcon, { className: "w-4 h-4" }),
        "Github"
      ] }) }),
      /* @__PURE__ */ jsx(Button, { variant: "outline", className: "w-full", asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: "/auth/social/google/start", children: [
        /* @__PURE__ */ jsx(FacebookIcon, { className: "w-4 h-4" }),
        "Facebook"
      ] }) }),
      /* @__PURE__ */ jsx(Button, { variant: "outline", className: "w-full", asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: "/auth/otp/start", children: [
        /* @__PURE__ */ jsx(LockIcon, { className: "w-4 h-4" }),
        "OTP"
      ] }) })
    ] })
  ] });
}
const meta$i = () => {
  return [{
    title: "Login | wemake"
  }];
};
const formSchema$7 = z$1.object({
  email: z$1.string().email("Invalid email address"),
  password: z$1.string().min(8, {
    message: "Password must be at least 8 characters"
  })
});
const action$b = async ({
  request
}) => {
  const formData = await request.formData();
  const {
    success,
    data: data2,
    error
  } = formSchema$7.safeParse(Object.fromEntries(formData));
  if (!success) {
    return {
      loginError: null,
      formErrors: error.flatten().fieldErrors
    };
  }
  const {
    email,
    password
  } = data2;
  const {
    client,
    headers
  } = makeSSRClient(request);
  const {
    error: loginError
  } = await client.auth.signInWithPassword({
    email,
    password
  });
  if (loginError) {
    return {
      formErrors: null,
      loginError: loginError.message
    };
  }
  return redirect("/", {
    headers
  });
};
const loginPage = UNSAFE_withComponentProps(function LoginPage({
  actionData
}) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting" || navigation.state === "loading";
  return /* @__PURE__ */ jsxs("div", {
    className: "flex flex-col relative items-center justify-center h-full",
    children: [/* @__PURE__ */ jsx(Button, {
      variant: "ghost",
      asChild: true,
      className: "absolute right-8 top-8 ",
      children: /* @__PURE__ */ jsx(Link, {
        to: "/auth/join",
        children: "Join"
      })
    }), /* @__PURE__ */ jsxs("div", {
      className: "flex items-center flex-col justify-center w-full max-w-md gap-10",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-2xl font-semibold",
        children: "Log in to your account"
      }), /* @__PURE__ */ jsxs(Form, {
        className: "w-full space-y-4",
        method: "post",
        children: [/* @__PURE__ */ jsx(InputPair, {
          label: "Email",
          description: "Enter your email address",
          name: "email",
          id: "email",
          required: true,
          type: "email",
          placeholder: "i.e wemake@example.com"
        }), actionData && "formErrors" in actionData && /* @__PURE__ */ jsx("p", {
          className: "text-sm text-red-500",
          children: actionData?.formErrors?.email?.join(", ")
        }), /* @__PURE__ */ jsx(InputPair, {
          id: "password",
          label: "Password",
          description: "Enter your password",
          name: "password",
          required: true,
          type: "password",
          placeholder: "i.e wemake@example.com"
        }), actionData && "formErrors" in actionData && /* @__PURE__ */ jsx("p", {
          className: "text-sm text-red-500",
          children: actionData?.formErrors?.password?.join(", ")
        }), /* @__PURE__ */ jsx(Button, {
          className: "w-full",
          type: "submit",
          disabled: isSubmitting,
          children: isSubmitting ? /* @__PURE__ */ jsx(LoaderCircle, {
            className: "animate-spin"
          }) : "Log in"
        }), actionData && "loginError" in actionData && /* @__PURE__ */ jsx("p", {
          className: "text-sm text-red-500",
          children: actionData.loginError
        })]
      }), /* @__PURE__ */ jsx(AuthButtons, {})]
    })]
  });
});
const route28 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$b,
  default: loginPage,
  meta: meta$i
}, Symbol.toStringTag, { value: "Module" }));
const checkUsernameExists = async (request, { username }) => {
  const { client } = makeSSRClient(request);
  const { error } = await client.from("profile").select("profile_id").eq("username", username).single();
  if (error) {
    return false;
  }
  return true;
};
const meta$h = () => {
  return [{
    title: "Join | wemake"
  }];
};
const formSchema$6 = z$1.object({
  name: z$1.string().min(3),
  username: z$1.string().min(3),
  email: z$1.string().email(),
  password: z$1.string().min(8)
});
const action$a = async ({
  request
}) => {
  const formData = await request.formData();
  const {
    success,
    error,
    data: data2
  } = formSchema$6.safeParse(Object.fromEntries(formData));
  if (!success) {
    return {
      formErrors: error.flatten().fieldErrors
    };
  }
  const usernameExists = await checkUsernameExists(request, {
    username: data2.username
  });
  if (usernameExists) {
    return {
      formErrors: {
        username: ["Username already exists"]
      }
    };
  }
  const {
    client,
    headers
  } = makeSSRClient(request);
  const {
    error: signUpError
  } = await client.auth.signUp({
    email: data2.email,
    password: data2.password,
    options: {
      data: {
        name: data2.name,
        username: data2.username
      }
    }
  });
  if (signUpError) {
    return {
      signUpError: signUpError.message
    };
  }
  return redirect("/", {
    headers
  });
};
const joinPage = UNSAFE_withComponentProps(function JoinPage({
  actionData
}) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting" || navigation.state === "loading";
  return /* @__PURE__ */ jsxs("div", {
    className: "flex flex-col relative items-center justify-center h-full",
    children: [/* @__PURE__ */ jsx(Button, {
      variant: "ghost",
      asChild: true,
      className: "absolute right-8 top-8 ",
      children: /* @__PURE__ */ jsx(Link, {
        to: "/auth/login",
        children: "Login"
      })
    }), /* @__PURE__ */ jsxs("div", {
      className: "flex items-center flex-col justify-center w-full max-w-md gap-10",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-2xl font-semibold",
        children: "Create an account"
      }), /* @__PURE__ */ jsxs(Form, {
        className: "w-full space-y-4",
        method: "post",
        children: [/* @__PURE__ */ jsx(InputPair, {
          label: "Name",
          description: "Enter your name",
          name: "name",
          id: "name",
          required: true,
          type: "text",
          placeholder: "Enter your name"
        }), actionData && "formErrors" in actionData && /* @__PURE__ */ jsx("p", {
          className: "text-red-500",
          children: actionData?.formErrors?.name
        }), /* @__PURE__ */ jsx(InputPair, {
          id: "username",
          label: "Username",
          description: "Enter your username",
          name: "username",
          required: true,
          type: "text",
          placeholder: "i.e wemake"
        }), actionData && "formErrors" in actionData && /* @__PURE__ */ jsx("p", {
          className: "text-red-500",
          children: actionData?.formErrors?.username
        }), /* @__PURE__ */ jsx(InputPair, {
          id: "email",
          label: "Email",
          description: "Enter your email address",
          name: "email",
          required: true,
          type: "email",
          placeholder: "i.e wemake@example.com"
        }), actionData && "formErrors" in actionData && /* @__PURE__ */ jsx("p", {
          className: "text-red-500",
          children: actionData?.formErrors?.email
        }), /* @__PURE__ */ jsx(InputPair, {
          id: "password",
          label: "Password",
          description: "Enter your password",
          name: "password",
          required: true,
          type: "password",
          placeholder: "Enter your password"
        }), actionData && "formErrors" in actionData && /* @__PURE__ */ jsx("p", {
          className: "text-red-500",
          children: actionData?.formErrors?.password
        }), /* @__PURE__ */ jsx(Button, {
          className: "w-full",
          type: "submit",
          disabled: isSubmitting,
          children: isSubmitting ? /* @__PURE__ */ jsx(LoaderCircle, {
            className: "animate-spin"
          }) : "Create account"
        }), actionData && "signUpError" in actionData && /* @__PURE__ */ jsx("p", {
          className: "text-red-500",
          children: actionData.signUpError
        })]
      }), /* @__PURE__ */ jsx(AuthButtons, {})]
    })]
  });
});
const route29 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$a,
  default: joinPage,
  meta: meta$h
}, Symbol.toStringTag, { value: "Module" }));
const meta$g = () => {
  return [{
    title: "Start OTP | wemake"
  }];
};
const formSchema$5 = z$1.object({
  email: z$1.string().email()
});
const action$9 = async ({
  request
}) => {
  const formData = await request.formData();
  const {
    data: data2,
    success
  } = formSchema$5.safeParse(Object.fromEntries(formData));
  if (!success) {
    return {
      error: "Invalid email address"
    };
  }
  const {
    email
  } = data2;
  const {
    client
  } = makeSSRClient(request);
  const {
    error
  } = await client.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false
    }
  });
  if (error) {
    return {
      error: "Failed to send OTP"
    };
  }
  return redirect(`/auth/otp/complete?email=${email}`);
};
const otpStartPage = UNSAFE_withComponentProps(function OtpStartPage({
  actionData
}) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting" || navigation.state === "loading";
  return /* @__PURE__ */ jsx("div", {
    className: "flex flex-col relative items-center justify-center h-full",
    children: /* @__PURE__ */ jsxs("div", {
      className: "flex items-center flex-col justify-center w-full max-w-md gap-10",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "text-center",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-2xl font-semibold",
          children: "Log in with OTP"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-sm text-muted-foreground",
          children: "We will send you a 4-digit code to log in to your account."
        })]
      }), /* @__PURE__ */ jsxs(Form, {
        className: "w-full space-y-4",
        method: "post",
        children: [/* @__PURE__ */ jsx(InputPair, {
          label: "Email",
          description: "Enter your email address",
          name: "email",
          id: "email",
          required: true,
          type: "email",
          placeholder: "i.e wemake@example.com"
        }), actionData && "error" in actionData && /* @__PURE__ */ jsx("p", {
          className: "text-red-500 text-sm",
          children: actionData.error
        }), /* @__PURE__ */ jsx(Button, {
          className: "w-full",
          type: "submit",
          disabled: isSubmitting,
          children: isSubmitting ? /* @__PURE__ */ jsx(LoaderCircle, {
            className: "animate-spin"
          }) : "Send OTP"
        })]
      })]
    })
  });
});
const route30 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$9,
  default: otpStartPage,
  meta: meta$g
}, Symbol.toStringTag, { value: "Module" }));
const meta$f = () => {
  return [{
    title: "Verify OTP | wemake"
  }];
};
const formSchema$4 = z$1.object({
  email: z$1.string().email(),
  otp: z$1.string().min(8).max(8)
});
const action$8 = async ({
  request
}) => {
  const formData = await request.formData();
  const {
    data: data2,
    success,
    error
  } = formSchema$4.safeParse(Object.fromEntries(formData));
  if (!success) {
    return {
      fieldErrors: error.flatten().fieldErrors
    };
  }
  const {
    email,
    otp
  } = data2;
  const {
    client,
    headers
  } = makeSSRClient(request);
  const {
    error: verifyError
  } = await client.auth.verifyOtp({
    email,
    token: otp,
    type: "email"
  });
  if (verifyError) {
    return {
      verifyError: verifyError.message
    };
  }
  return redirect("/", {
    headers
  });
};
const otpCompletePage = UNSAFE_withComponentProps(function OtpPage({
  actionData
}) {
  const [searchParams2] = useSearchParams();
  const email = searchParams2.get("email");
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting" || navigation.state === "loading";
  return /* @__PURE__ */ jsx("div", {
    className: "flex flex-col relative items-center justify-center h-full",
    children: /* @__PURE__ */ jsxs("div", {
      className: "flex items-center flex-col justify-center w-full max-w-md gap-10",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "text-center",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-2xl font-semibold",
          children: "Confirm OTP"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-sm text-muted-foreground",
          children: "Enter the OTP code sent to your email address."
        })]
      }), /* @__PURE__ */ jsxs(Form, {
        className: "w-full space-y-4",
        method: "post",
        children: [/* @__PURE__ */ jsx(InputPair, {
          label: "Email",
          description: "Enter your email address",
          name: "email",
          defaultValue: email || "",
          id: "email",
          required: true,
          type: "email",
          placeholder: "i.e wemake@example.com"
        }), actionData && "fieldErrors" in actionData && /* @__PURE__ */ jsx("p", {
          className: "text-sm text-red-500",
          children: actionData.fieldErrors?.email?.join(", ")
        }), /* @__PURE__ */ jsx(InputPair, {
          label: "OTP",
          description: "Enter the OTP code sent to your email address",
          name: "otp",
          id: "otp",
          required: true,
          type: "number",
          placeholder: "i.e 1234"
        }), actionData && "fieldErrors" in actionData && /* @__PURE__ */ jsx("p", {
          className: "text-sm text-red-500",
          children: actionData.fieldErrors?.otp?.join(", ")
        }), actionData && "verifyError" in actionData && /* @__PURE__ */ jsx("p", {
          className: "text-sm text-red-500",
          children: actionData.verifyError
        }), /* @__PURE__ */ jsx(Button, {
          className: "w-full",
          type: "submit",
          disabled: isSubmitting,
          children: isSubmitting ? /* @__PURE__ */ jsx(LoaderCircle, {
            className: "animate-spin"
          }) : "Verify OTP"
        })]
      })]
    })
  });
});
const route31 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$8,
  default: otpCompletePage,
  meta: meta$f
}, Symbol.toStringTag, { value: "Module" }));
const paramsSchema$1 = z$1.object({
  provider: z$1.enum(["github", "kakao"])
});
const loader$l = async ({
  params,
  request
}) => {
  const {
    success,
    data: data2
  } = paramsSchema$1.safeParse(params);
  if (!success) {
    return redirect("/auth/login");
  }
  const {
    provider
  } = data2;
  const redirectTo = `http://localhost:5173/auth/social/${provider}/complete`;
  const {
    client,
    headers
  } = makeSSRClient(request);
  const {
    data: {
      url
    },
    error
  } = await client.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo
    }
  });
  if (url) {
    return redirect(url, {
      headers
    });
  }
  if (error) {
    throw error;
  }
};
const route32 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$l
}, Symbol.toStringTag, { value: "Module" }));
const paramsSchema = z$1.object({
  provider: z$1.enum(["github", "kakao"])
});
const loader$k = async ({
  params,
  request
}) => {
  const {
    success
  } = paramsSchema.safeParse(params);
  if (!success) {
    return redirect("/auth/login");
  }
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (!code) {
    return redirect("/auth/login");
  }
  const {
    client,
    headers
  } = makeSSRClient(request);
  const {
    error
  } = await client.auth.exchangeCodeForSession(code);
  if (error) {
    throw error;
  }
  return redirect("/", {
    headers
  });
};
const route33 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$k
}, Symbol.toStringTag, { value: "Module" }));
const loader$j = async ({
  request
}) => {
  const {
    client,
    headers
  } = makeSSRClient(request);
  await client.auth.signOut();
  return redirect("/", {
    headers
  });
};
const route34 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$j
}, Symbol.toStringTag, { value: "Module" }));
const SORT_OPTIONS = ["newest", "popular"];
const PERIOD_OPTIONS = [
  "all",
  "today",
  "week",
  "month",
  "year"
];
const meta$e = () => {
  return [{
    title: "Community | wemake"
  }];
};
const searchParamsSchema = z.object({
  sorting: z.enum(["newest", "popular"]).optional().default("newest"),
  period: z.enum(["all", "today", "week", "month", "year"]).optional().default("all"),
  keyword: z.string().optional(),
  topic: z.string().optional()
});
const loader$i = async ({
  request
}) => {
  const url = new URL(request.url);
  const {
    success,
    data: parsedData
  } = searchParamsSchema.safeParse(Object.fromEntries(url.searchParams));
  if (!success) {
    throw data({
      error_code: "invalid_search_params",
      message: "Invalid search params"
    }, {
      status: 400
    });
  }
  const {
    client,
    headers
  } = makeSSRClient(request);
  const [topics, posts] = await Promise.all([getTopics(client), getPosts(client, {
    limit: 20,
    sorting: parsedData.sorting,
    period: parsedData.period,
    keyword: parsedData.keyword,
    topic: parsedData.topic
  })]);
  return {
    topics,
    posts
  };
};
const communityPage = UNSAFE_withComponentProps(function CommunityPage({
  loaderData
}) {
  const [searchParams2, setSearchParams] = useSearchParams();
  const sorting = searchParams2.get("sorting") || "newest";
  const period = searchParams2.get("period") || "all";
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx(Hero, {
      title: "Community",
      subtitle: "Ask questions, share ideas, and connect with other developers"
    }), /* @__PURE__ */ jsxs("div", {
      className: "grid grid-cols-6 items-start gap-40",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "col-span-4 space-y-10",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex justify-between",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "space-y-5 w-full",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex items-center gap-5",
              children: [/* @__PURE__ */ jsxs(DropdownMenu, {
                children: [/* @__PURE__ */ jsxs(DropdownMenuTrigger, {
                  className: "flex items-center gap-1",
                  children: [/* @__PURE__ */ jsx("span", {
                    className: "text-sm capitalize",
                    children: sorting
                  }), /* @__PURE__ */ jsx(ChevronDownIcon, {
                    className: "size-5"
                  })]
                }), /* @__PURE__ */ jsx(DropdownMenuContent, {
                  children: SORT_OPTIONS.map((option) => /* @__PURE__ */ jsx(DropdownMenuCheckboxItem, {
                    className: "capitalize cursor-pointer",
                    onCheckedChange: (checked) => {
                      if (checked) {
                        searchParams2.set("sorting", option);
                        setSearchParams(searchParams2);
                      }
                    },
                    children: option
                  }, option))
                })]
              }), sorting === "popular" && /* @__PURE__ */ jsxs(DropdownMenu, {
                children: [/* @__PURE__ */ jsxs(DropdownMenuTrigger, {
                  className: "flex items-center gap-1",
                  children: [/* @__PURE__ */ jsx("span", {
                    className: "text-sm capitalize",
                    children: period
                  }), /* @__PURE__ */ jsx(ChevronDownIcon, {
                    className: "size-5"
                  })]
                }), /* @__PURE__ */ jsx(DropdownMenuContent, {
                  children: PERIOD_OPTIONS.map((option) => /* @__PURE__ */ jsx(DropdownMenuCheckboxItem, {
                    className: "capitalize cursor-pointer",
                    onCheckedChange: (checked) => {
                      if (checked) {
                        searchParams2.set("period", option);
                        setSearchParams(searchParams2);
                      }
                    },
                    children: option
                  }, option))
                })]
              })]
            }), /* @__PURE__ */ jsx(Form, {
              className: "w-2/3",
              children: /* @__PURE__ */ jsx(Input, {
                type: "text",
                name: "keyword",
                placeholder: "Search for discussions"
              })
            })]
          }), /* @__PURE__ */ jsx(Button, {
            asChild: true,
            children: /* @__PURE__ */ jsx(Link, {
              to: `/community/submit`,
              children: "Create Discussion"
            })
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "space-y-5",
          children: loaderData.posts.map((post) => /* @__PURE__ */ jsx(PostCard, {
            id: post.post_id,
            title: post.title,
            author: post.author,
            authorAvatarUrl: post.author_avatar,
            category: post.topic,
            postedAt: post.created_at,
            votesCount: post.upvotes,
            isUpvoted: post.is_upvoted,
            expanded: true
          }, post.post_id))
        })]
      }), /* @__PURE__ */ jsxs("aside", {
        className: "col-span-2 space-y-5",
        children: [/* @__PURE__ */ jsx("span", {
          className: "text-sm font-bold text-muted-foreground uppercase",
          children: "Topics"
        }), /* @__PURE__ */ jsx("div", {
          className: "flex flex-col gap-2 items-start",
          children: loaderData.topics.map((topic) => /* @__PURE__ */ jsx(Button, {
            asChild: true,
            variant: "link",
            className: "pl-0",
            children: /* @__PURE__ */ jsx(Link, {
              to: `/community?topic=${topic.slug}`,
              children: topic.name
            })
          }, topic.slug))
        })]
      })]
    })]
  });
});
const route35 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: communityPage,
  loader: loader$i,
  meta: meta$e
}, Symbol.toStringTag, { value: "Module" }));
function Breadcrumb({ ...props }) {
  return /* @__PURE__ */ jsx("nav", { "aria-label": "breadcrumb", "data-slot": "breadcrumb", ...props });
}
function BreadcrumbList({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "ol",
    {
      "data-slot": "breadcrumb-list",
      className: cn(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
        className
      ),
      ...props
    }
  );
}
function BreadcrumbItem({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "li",
    {
      "data-slot": "breadcrumb-item",
      className: cn("inline-flex items-center gap-1.5", className),
      ...props
    }
  );
}
function BreadcrumbLink({
  asChild,
  className,
  ...props
}) {
  const Comp = asChild ? Slot : "a";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "breadcrumb-link",
      className: cn("hover:text-foreground transition-colors", className),
      ...props
    }
  );
}
function BreadcrumbSeparator({
  children,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "li",
    {
      "data-slot": "breadcrumb-separator",
      role: "presentation",
      "aria-hidden": "true",
      className: cn("[&>svg]:size-3.5", className),
      ...props,
      children: children ?? /* @__PURE__ */ jsx(ChevronRight, {})
    }
  );
}
function Reply({
  name,
  username,
  avatarUrl,
  content,
  timestamp,
  topLevel,
  topLevelId,
  replies
}) {
  const actionData = useActionData();
  const [replying, setReplying] = useState(false);
  const toggleReplying = () => setReplying((prev) => !prev);
  const {
    isLoggedIn,
    name: loggedInName,
    avatar
  } = useOutletContext();
  useEffect(() => {
    if (actionData?.ok) {
      setReplying(false);
    }
  }, [actionData]);
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 w-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-5 w-2/3", children: [
      /* @__PURE__ */ jsxs(Avatar, { className: "size-14", children: [
        /* @__PURE__ */ jsx(AvatarFallback, { children: name[0] }),
        avatarUrl ? /* @__PURE__ */ jsx(AvatarImage, { src: avatarUrl }) : null
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 items-start w-full", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center", children: [
          /* @__PURE__ */ jsx(Link, { to: `/users/${username}`, children: /* @__PURE__ */ jsx("h4", { className: "font-medium", children: name }) }),
          /* @__PURE__ */ jsx(DotIcon, { className: "size-5" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: DateTime.fromISO(timestamp).toRelative() })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: content }),
        isLoggedIn ? /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "ghost",
            className: "self-end",
            onClick: toggleReplying,
            children: [
              /* @__PURE__ */ jsx(MessageCircleIcon, { className: "size-4" }),
              "Reply"
            ]
          }
        ) : null
      ] })
    ] }),
    replying && /* @__PURE__ */ jsxs(Form, { className: "flex items-start gap-5 w-3/4", method: "post", children: [
      /* @__PURE__ */ jsx("input", { type: "hidden", name: "topLevelId", value: topLevelId }),
      /* @__PURE__ */ jsxs(Avatar, { className: "size-14", children: [
        /* @__PURE__ */ jsx(AvatarFallback, { children: loggedInName[0] }),
        /* @__PURE__ */ jsx(AvatarImage, { src: avatar })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-5 items-end w-full", children: [
        /* @__PURE__ */ jsx(
          Textarea,
          {
            autoFocus: true,
            name: "reply",
            placeholder: "Write a reply",
            className: "w-full resize-none",
            defaultValue: `@${username} `,
            rows: 5
          }
        ),
        /* @__PURE__ */ jsx(Button, { children: "Reply" })
      ] })
    ] }),
    topLevel && replies && /* @__PURE__ */ jsx("div", { className: "pl-20 w-full", children: replies.map((reply) => /* @__PURE__ */ jsx(
      Reply,
      {
        name: reply.user.name,
        username: reply.user.username,
        avatarUrl: reply.user.avatar,
        content: reply.reply,
        timestamp: reply.created_at,
        topLevel: false,
        topLevelId
      }
    )) })
  ] });
}
const createPost = async (client, {
  title,
  category,
  content,
  userId
}) => {
  const { data: categoryData, error: categoryError } = await client.from("topics").select("topic_id").eq("slug", category).single();
  if (categoryError) {
    throw categoryError;
  }
  const { data: data2, error } = await client.from("posts").insert({
    title,
    content,
    profile_id: userId,
    topic_id: categoryData.topic_id
  }).select().single();
  if (error) {
    throw error;
  }
  return data2;
};
const createReply = async (client, {
  postId,
  reply,
  userId,
  topLevelId
}) => {
  const { error } = await client.from("post_replies").insert({
    ...topLevelId ? { parent_id: topLevelId } : { post_id: Number(postId) },
    reply,
    profile_id: userId
  });
  if (error) {
    throw error;
  }
};
const toggleUpvote = async (client, { postId, userId }) => {
  await new Promise((resolve) => setTimeout(resolve, 5e3));
  const { count } = await client.from("post_upvotes").select("*", { count: "exact", head: true }).eq("post_id", Number(postId)).eq("profile_id", userId);
  if (count === 0) {
    await client.from("post_upvotes").insert({
      post_id: Number(postId),
      profile_id: userId
    });
  } else {
    await client.from("post_upvotes").delete().eq("post_id", Number(postId)).eq("profile_id", userId);
  }
};
const meta$d = ({
  data: data2
}) => {
  return [{
    title: `${data2.post.title} on ${data2.post.topic_name} | wemake`
  }];
};
const loader$h = async ({
  request,
  params
}) => {
  const {
    client,
    headers
  } = makeSSRClient(request);
  const post = await getPostById(client, {
    postId: params.postId
  });
  const replies = await getReplies(client, {
    postId: params.postId
  });
  return {
    post,
    replies
  };
};
const formSchema$3 = z$1.object({
  reply: z$1.string().min(1),
  topLevelId: z$1.coerce.number().optional()
});
const action$7 = async ({
  request,
  params
}) => {
  const {
    client
  } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const {
    success,
    error,
    data: data2
  } = formSchema$3.safeParse(Object.fromEntries(formData));
  if (!success) {
    return {
      formErrors: error.flatten().fieldErrors
    };
  }
  const {
    reply,
    topLevelId
  } = data2;
  await createReply(client, {
    postId: params.postId,
    reply,
    userId,
    topLevelId
  });
  return {
    ok: true
  };
};
const postPage = UNSAFE_withComponentProps(function PostPage({
  loaderData,
  actionData
}) {
  const fetcher = useFetcher();
  const {
    isLoggedIn,
    name,
    username,
    avatar
  } = useOutletContext();
  const formRef = useRef(null);
  useEffect(() => {
    if (actionData?.ok) {
      formRef.current?.reset();
    }
  }, [actionData?.ok]);
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-10",
    children: [/* @__PURE__ */ jsx(Breadcrumb, {
      children: /* @__PURE__ */ jsxs(BreadcrumbList, {
        children: [/* @__PURE__ */ jsx(BreadcrumbItem, {
          children: /* @__PURE__ */ jsx(BreadcrumbLink, {
            asChild: true,
            children: /* @__PURE__ */ jsx(Link, {
              to: "/community",
              children: "Community"
            })
          })
        }), /* @__PURE__ */ jsx(BreadcrumbSeparator, {}), /* @__PURE__ */ jsx(BreadcrumbItem, {
          children: /* @__PURE__ */ jsx(BreadcrumbLink, {
            asChild: true,
            children: /* @__PURE__ */ jsx(Link, {
              to: `/community?topic=${loaderData.post.topic_slug}`,
              children: loaderData.post.topic_name
            })
          })
        }), /* @__PURE__ */ jsx(BreadcrumbSeparator, {}), /* @__PURE__ */ jsx(BreadcrumbItem, {
          children: /* @__PURE__ */ jsx(BreadcrumbLink, {
            asChild: true,
            children: /* @__PURE__ */ jsx(Link, {
              to: `/community/postId`,
              children: loaderData.post.title
            })
          })
        })]
      })
    }), /* @__PURE__ */ jsxs("div", {
      className: "grid grid-cols-6 gap-40 items-start",
      children: [/* @__PURE__ */ jsx("div", {
        className: "col-span-4 space-y-10",
        children: /* @__PURE__ */ jsxs("div", {
          className: "flex w-full items-start gap-10",
          children: [/* @__PURE__ */ jsx(fetcher.Form, {
            method: "post",
            action: `/community/${loaderData.post.post_id}/upvote`,
            children: /* @__PURE__ */ jsxs(Button, {
              variant: "outline",
              className: cn("flex flex-col h-14", loaderData.post.is_upvoted ? "border-primary text-primary" : ""),
              children: [/* @__PURE__ */ jsx(ChevronUpIcon, {
                className: "size-4 shrink-0"
              }), /* @__PURE__ */ jsx("span", {
                children: loaderData.post.upvotes
              })]
            })
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-20 w-full",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx("h2", {
                className: "text-3xl font-bold",
                children: loaderData.post.title
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex items-center gap-2 text-sm text-muted-foreground",
                children: [/* @__PURE__ */ jsx("span", {
                  children: loaderData.post.author_name
                }), /* @__PURE__ */ jsx(DotIcon, {
                  className: "size-5"
                }), /* @__PURE__ */ jsx("span", {
                  children: DateTime.fromISO(loaderData.post.created_at, {
                    zone: "utc"
                  }).toRelative()
                }), /* @__PURE__ */ jsx(DotIcon, {
                  className: "size-5"
                }), /* @__PURE__ */ jsxs("span", {
                  children: [loaderData.post.replies, " replies"]
                })]
              }), /* @__PURE__ */ jsx("p", {
                className: "text-muted-foreground w-3/4",
                children: loaderData.post.content
              })]
            }), isLoggedIn ? /* @__PURE__ */ jsxs(Form, {
              ref: formRef,
              className: "flex items-start gap-5 w-3/4",
              method: "post",
              children: [/* @__PURE__ */ jsxs(Avatar, {
                className: "size-14",
                children: [/* @__PURE__ */ jsx(AvatarFallback, {
                  children: name?.[0]
                }), /* @__PURE__ */ jsx(AvatarImage, {
                  src: avatar
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex flex-col gap-5 items-end w-full",
                children: [/* @__PURE__ */ jsx(Textarea, {
                  name: "reply",
                  placeholder: "Write a reply",
                  className: "w-full resize-none",
                  rows: 5
                }), /* @__PURE__ */ jsx(Button, {
                  children: "Reply"
                })]
              })]
            }) : null, /* @__PURE__ */ jsxs("div", {
              className: "space-y-10",
              children: [/* @__PURE__ */ jsxs("h4", {
                className: "font-semibold",
                children: [loaderData.post.replies, " Replies"]
              }), /* @__PURE__ */ jsx("div", {
                className: "flex flex-col gap-5",
                children: loaderData.replies.map((reply) => /* @__PURE__ */ jsx(Reply, {
                  name: reply.user.name,
                  username: reply.user.username,
                  avatarUrl: reply.user.avatar,
                  content: reply.reply,
                  timestamp: reply.created_at,
                  topLevel: true,
                  topLevelId: reply.post_reply_id,
                  replies: reply.post_replies
                }))
              })]
            })]
          })]
        })
      }), /* @__PURE__ */ jsxs("aside", {
        className: "col-span-2 space-y-5 border rounded-lg p-6 shadow-sm",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex gap-5",
          children: [/* @__PURE__ */ jsxs(Avatar, {
            className: "size-14",
            children: [/* @__PURE__ */ jsx(AvatarFallback, {
              children: loaderData.post.author_name[0]
            }), loaderData.post.author_avatar ? /* @__PURE__ */ jsx(AvatarImage, {
              src: loaderData.post.author_avatar
            }) : null]
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex flex-col items-start",
            children: [/* @__PURE__ */ jsx("h4", {
              className: "text-lg font-medium",
              children: loaderData.post.author_name
            }), /* @__PURE__ */ jsx(Badge, {
              variant: "secondary",
              className: "capitalize",
              children: loaderData.post.author_role
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "gap-2 text-sm flex flex-col",
          children: [/* @__PURE__ */ jsxs("span", {
            children: ["🎂 Joined", " ", DateTime.fromISO(loaderData.post.author_created_at, {
              zone: "utc"
            }).toRelative(), " ", "ago"]
          }), /* @__PURE__ */ jsxs("span", {
            children: ["🚀 Launched ", loaderData.post.products, " products"]
          })]
        }), /* @__PURE__ */ jsx(Button, {
          variant: "outline",
          className: "w-full",
          children: "Follow"
        })]
      })]
    }), /* @__PURE__ */ jsx("aside", {
      className: "col-span-2"
    })]
  });
});
const route36 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$7,
  default: postPage,
  loader: loader$h,
  meta: meta$d
}, Symbol.toStringTag, { value: "Module" }));
const action$6 = async ({
  request,
  params
}) => {
  if (request.method !== "POST") {
    throw new Response("Method not allowed", {
      status: 405
    });
  }
  const {
    client
  } = await makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  await toggleUpvote(client, {
    postId: params.postId,
    userId
  });
  return {
    ok: true
  };
};
const route37 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$6
}, Symbol.toStringTag, { value: "Module" }));
const meta$c = () => {
  return [{
    title: "Submit Post | Wemake"
  }];
};
const loader$g = async ({
  request
}) => {
  const {
    client
  } = makeSSRClient(request);
  await getLoggedInUserId(client);
  const topics = await getTopics(client);
  return {
    topics
  };
};
const formSchema$2 = z$1.object({
  title: z$1.string().min(1).max(40),
  category: z$1.string().min(1).max(100),
  content: z$1.string().min(1).max(1e3)
});
const action$5 = async ({
  request
}) => {
  const {
    client
  } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const {
    success,
    error,
    data: data2
  } = formSchema$2.safeParse(Object.fromEntries(formData));
  if (!success) {
    return {
      fieldErrors: error.flatten().fieldErrors
    };
  }
  const {
    title,
    category,
    content
  } = data2;
  const {
    post_id
  } = await createPost(client, {
    title,
    category,
    content,
    userId
  });
  return redirect(`/community/${post_id}`);
};
const submitPostPage = UNSAFE_withComponentProps(function SubmitPostPage({
  loaderData,
  actionData
}) {
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-20",
    children: [/* @__PURE__ */ jsx(Hero, {
      title: "Create Discussion",
      subtitle: "Ask questions, share ideas, and connect with other developers"
    }), /* @__PURE__ */ jsxs(Form, {
      className: "flex flex-col gap-10 max-w-screen-md mx-auto",
      method: "post",
      children: [/* @__PURE__ */ jsx(InputPair, {
        label: "Title",
        name: "title",
        id: "title",
        description: "(40 characters or less)",
        required: true,
        placeholder: "i.e What is the best productivity tool?"
      }), actionData && "fieldErrors" in actionData && /* @__PURE__ */ jsx("div", {
        className: "text-red-500",
        children: actionData.fieldErrors.title?.join(", ")
      }), /* @__PURE__ */ jsx(SelectPair, {
        required: true,
        name: "category",
        label: "Category",
        description: "Select the category that best fits your discussion",
        placeholder: "i.e Productivity",
        options: loaderData.topics.map((topic) => ({
          label: topic.name,
          value: topic.slug
        }))
      }), actionData && "fieldErrors" in actionData && /* @__PURE__ */ jsx("div", {
        className: "text-red-500",
        children: actionData.fieldErrors.category?.join(", ")
      }), /* @__PURE__ */ jsx(InputPair, {
        label: "Content",
        name: "content",
        id: "content",
        description: "(1000 characters or less)",
        required: true,
        placeholder: "i.e I'm looking for a tool that can help me manage my time and tasks. What are the best tools out there?",
        textArea: true
      }), actionData && "fieldErrors" in actionData && /* @__PURE__ */ jsx("div", {
        className: "text-red-500",
        children: actionData.fieldErrors.content?.join(", ")
      }), /* @__PURE__ */ jsx(Button, {
        className: "mx-auto",
        children: "Create Discussion"
      })]
    })]
  });
});
const route38 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$5,
  default: submitPostPage,
  loader: loader$g,
  meta: meta$c
}, Symbol.toStringTag, { value: "Module" }));
const meta$b = () => {
  return [{
    title: "Teams | wemake"
  }];
};
const loader$f = async ({
  request
}) => {
  const {
    client,
    headers
  } = makeSSRClient(request);
  const teams = await getTeams(client, {
    limit: 8
  });
  return {
    teams
  };
};
const teamsPage = UNSAFE_withComponentProps(function TeamsPage({
  loaderData
}) {
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-20",
    children: [/* @__PURE__ */ jsx(Hero, {
      title: "Teams",
      subtitle: "Find a team looking for a new member"
    }), /* @__PURE__ */ jsx("div", {
      className: "grid grid-cols-4 gap-4",
      children: loaderData.teams.map((team) => /* @__PURE__ */ jsx(TeamCard, {
        id: team.team_id,
        leaderUsername: team.team_leader.username,
        leaderAvatarUrl: team.team_leader.avatar,
        positions: team.roles.split(","),
        projectDescription: team.product_description
      }, team.team_id))
    })]
  });
});
const route39 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: teamsPage,
  loader: loader$f,
  meta: meta$b
}, Symbol.toStringTag, { value: "Module" }));
const meta$a = () => {
  return [{
    title: "Team Details | wemake"
  }];
};
const loader$e = async ({
  request,
  params
}) => {
  const {
    client,
    headers
  } = makeSSRClient(request);
  const team = await getTeamById(client, {
    teamId: params.teamId
  });
  return {
    team
  };
};
const teamPage = UNSAFE_withComponentProps(function TeamPage({
  loaderData
}) {
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-20",
    children: [/* @__PURE__ */ jsx(Hero, {
      title: `Join ${loaderData.team.team_leader.name}'s team`
    }), /* @__PURE__ */ jsxs("div", {
      className: "grid grid-cols-6 gap-40 items-start",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "col-span-4 grid grid-cols-4 gap-5",
        children: [[{
          title: "Product name",
          value: loaderData.team.product_name
        }, {
          title: "Stage",
          value: loaderData.team.product_stage
        }, {
          title: "Team size",
          value: loaderData.team.team_size
        }, {
          title: "Available equity",
          value: loaderData.team.equity_split
        }].map((item) => /* @__PURE__ */ jsx(Card, {
          children: /* @__PURE__ */ jsxs(CardHeader, {
            children: [/* @__PURE__ */ jsx(CardTitle, {
              className: "text-sm font-medium text-muted-foreground",
              children: item.title
            }), /* @__PURE__ */ jsx(CardContent, {
              className: "p-0  capitalize font-bold text-2xl",
              children: /* @__PURE__ */ jsx("p", {
                children: item.value
              })
            })]
          })
        })), /* @__PURE__ */ jsx(Card, {
          className: "col-span-2",
          children: /* @__PURE__ */ jsxs(CardHeader, {
            children: [/* @__PURE__ */ jsx(CardTitle, {
              className: "text-sm font-medium text-muted-foreground",
              children: "Looking for"
            }), /* @__PURE__ */ jsx(CardContent, {
              className: "p-0 font-bold text-2xl",
              children: /* @__PURE__ */ jsx("ul", {
                className: "text-lg list-disc list-inside",
                children: loaderData.team.roles.split(",").map((item) => /* @__PURE__ */ jsx("li", {
                  children: item
                }, item))
              })
            })]
          })
        }), /* @__PURE__ */ jsx(Card, {
          className: "col-span-2",
          children: /* @__PURE__ */ jsxs(CardHeader, {
            children: [/* @__PURE__ */ jsx(CardTitle, {
              className: "text-sm font-medium text-muted-foreground",
              children: "Idea description"
            }), /* @__PURE__ */ jsx(CardContent, {
              className: "p-0 font-medium text-xl",
              children: /* @__PURE__ */ jsx("p", {
                children: loaderData.team.product_description
              })
            })]
          })
        })]
      }), /* @__PURE__ */ jsxs("aside", {
        className: "col-span-2 space-y-5 border rounded-lg p-6 shadow-sm",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex gap-5",
          children: [/* @__PURE__ */ jsxs(Avatar, {
            className: "size-14",
            children: [/* @__PURE__ */ jsx(AvatarFallback, {
              children: loaderData.team.team_leader.name[0]
            }), loaderData.team.team_leader.avatar ? /* @__PURE__ */ jsx(AvatarImage, {
              src: loaderData.team.team_leader.avatar
            }) : null]
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex flex-col items-start",
            children: [/* @__PURE__ */ jsx("h4", {
              className: "text-lg font-medium",
              children: loaderData.team.team_leader.name
            }), /* @__PURE__ */ jsx(Badge, {
              variant: "secondary",
              className: "capitalize",
              children: loaderData.team.team_leader.role
            })]
          })]
        }), /* @__PURE__ */ jsxs(Form, {
          className: "space-y-5",
          method: "post",
          action: `/users/${loaderData.team.team_leader.username}/messages`,
          children: [/* @__PURE__ */ jsx(InputPair, {
            label: "Introduce yourself",
            description: "Tell us about yourself",
            name: "content",
            type: "text",
            id: "introduction",
            required: true,
            textArea: true,
            placeholder: "i.e. I'm a React Developer with 3 years of experience"
          }), /* @__PURE__ */ jsx(Button, {
            type: "submit",
            className: "w-full",
            children: "Get in touch"
          })]
        })]
      })]
    })]
  });
});
const route40 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: teamPage,
  loader: loader$e,
  meta: meta$a
}, Symbol.toStringTag, { value: "Module" }));
const PRODUCT_STAGES = [
  { label: "Idea", value: "idea" },
  { label: "Prototype", value: "prototype" },
  { label: "MVP", value: "mvp" },
  { label: "Product", value: "product" }
];
const createTeam = async (client, userId, team) => {
  const { data: data2, error } = await client.from("teams").insert({
    team_leader_id: userId,
    team_size: team.size,
    product_name: team.name,
    product_stage: team.stage,
    product_description: team.description,
    roles: team.roles,
    equity_split: team.equity
  }).select("team_id").single();
  if (error) {
    throw error;
  }
  return data2;
};
const meta$9 = () => {
  return [{
    title: "Create Team | wemake"
  }];
};
const loader$d = async ({
  request
}) => {
  const {
    client
  } = makeSSRClient(request);
  await getLoggedInUserId(client);
};
const formSchema$1 = z$1.object({
  name: z$1.string().min(1).max(20),
  stage: z$1.string(),
  size: z$1.coerce.number().min(1).max(100),
  equity: z$1.coerce.number().min(1).max(100),
  roles: z$1.string(),
  description: z$1.string().min(1).max(200)
});
const action$4 = async ({
  request
}) => {
  const {
    client
  } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const {
    success,
    data: data2,
    error
  } = formSchema$1.safeParse(Object.fromEntries(formData));
  if (!success) {
    return {
      fieldErrors: error.flatten().fieldErrors
    };
  }
  const {
    team_id
  } = await createTeam(client, userId, {
    ...data2
  });
  return redirect(`/teams/${team_id}`);
};
const submitTeamPage = UNSAFE_withComponentProps(function SubmitTeamPage({
  actionData
}) {
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-20",
    children: [/* @__PURE__ */ jsx(Hero, {
      title: "Create Team",
      subtitle: "Create a team to find a team mate."
    }), /* @__PURE__ */ jsxs(Form, {
      className: "max-w-screen-2xl flex flex-col items-center gap-10 mx-auto",
      method: "post",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "grid grid-cols-3 w-full gap-10",
        children: [/* @__PURE__ */ jsx(InputPair, {
          label: "What is the name of your product?",
          description: "(20 characters max)",
          placeholder: "i.e Doggy Social",
          name: "name",
          maxLength: 20,
          type: "text",
          id: "name",
          required: true
        }), actionData && "fieldErrors" in actionData && /* @__PURE__ */ jsx("p", {
          className: "text-red-500",
          children: actionData.fieldErrors.name
        }), /* @__PURE__ */ jsx(SelectPair, {
          label: "What is the stage of your product?",
          description: "Select the stage of your product",
          name: "stage",
          required: true,
          placeholder: "Select the stage of your product",
          options: PRODUCT_STAGES
        }), actionData && "fieldErrors" in actionData && /* @__PURE__ */ jsx("p", {
          className: "text-red-500",
          children: actionData.fieldErrors.stage
        }), /* @__PURE__ */ jsx(InputPair, {
          label: "What is the size of your team?",
          description: "(1-100)",
          name: "size",
          max: 100,
          min: 1,
          type: "number",
          id: "size",
          required: true
        }), actionData && "fieldErrors" in actionData && /* @__PURE__ */ jsx("p", {
          className: "text-red-500",
          children: actionData.fieldErrors.size
        }), /* @__PURE__ */ jsx(InputPair, {
          label: "How much equity are you willing to give?",
          description: "(each)",
          name: "equity",
          max: 100,
          min: 1,
          type: "number",
          id: "equity",
          required: true
        }), actionData && "fieldErrors" in actionData && /* @__PURE__ */ jsx("p", {
          className: "text-red-500",
          children: actionData.fieldErrors.equity
        }), /* @__PURE__ */ jsx(InputPair, {
          label: "What roles are you looking for?",
          placeholder: "React Developer, Backend Developer, Product Manager",
          description: "(comma separated)",
          name: "roles",
          type: "text",
          id: "roles",
          required: true
        }), actionData && "fieldErrors" in actionData && /* @__PURE__ */ jsx("p", {
          className: "text-red-500",
          children: actionData.fieldErrors.roles
        }), /* @__PURE__ */ jsx(InputPair, {
          label: "What is the description of your product?",
          description: "(200 characters max)",
          placeholder: "i.e We are building a new social media platform for dogs to connect with each other",
          name: "description",
          maxLength: 200,
          type: "text",
          id: "description",
          required: true,
          textArea: true
        }), actionData && "fieldErrors" in actionData && /* @__PURE__ */ jsx("p", {
          className: "text-red-500",
          children: actionData.fieldErrors.description
        })]
      }), /* @__PURE__ */ jsx(Button, {
        type: "submit",
        className: "w-full max-w-sm",
        size: "lg",
        children: "Create team"
      })]
    })]
  });
});
const route41 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$4,
  default: submitTeamPage,
  formSchema: formSchema$1,
  loader: loader$d,
  meta: meta$9
}, Symbol.toStringTag, { value: "Module" }));
const MOBILE_BREAKPOINT = 768;
function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(void 0);
  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return !!isMobile;
}
function Sheet({ ...props }) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Root, { "data-slot": "sheet", ...props });
}
function SheetPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Portal, { "data-slot": "sheet-portal", ...props });
}
function SheetOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Overlay,
    {
      "data-slot": "sheet-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function SheetContent({
  className,
  children,
  side = "right",
  ...props
}) {
  return /* @__PURE__ */ jsxs(SheetPortal, { children: [
    /* @__PURE__ */ jsx(SheetOverlay, {}),
    /* @__PURE__ */ jsxs(
      DialogPrimitive.Content,
      {
        "data-slot": "sheet-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        ),
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none", children: [
            /* @__PURE__ */ jsx(XIcon, { className: "size-4" }),
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
function SheetHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sheet-header",
      className: cn("flex flex-col gap-1.5 p-4", className),
      ...props
    }
  );
}
function SheetTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Title,
    {
      "data-slot": "sheet-title",
      className: cn("text-foreground font-semibold", className),
      ...props
    }
  );
}
function SheetDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Description,
    {
      "data-slot": "sheet-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function TooltipProvider({
  delayDuration = 0,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TooltipPrimitive.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration,
      ...props
    }
  );
}
function Tooltip({
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsx(TooltipPrimitive.Root, { "data-slot": "tooltip", ...props }) });
}
function TooltipTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipPrimitive.Trigger, { "data-slot": "tooltip-trigger", ...props });
}
function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
    TooltipPrimitive.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset,
      className: cn(
        "bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(TooltipPrimitive.Arrow, { className: "bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" })
      ]
    }
  ) });
}
const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";
const SidebarContext = React.createContext(null);
function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}
function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open]
  );
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open2) => !open2) : setOpen((open2) => !open2);
  }, [isMobile, setOpen, setOpenMobile]);
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);
  const state = open ? "expanded" : "collapsed";
  const contextValue = React.useMemo(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  );
  return /* @__PURE__ */ jsx(SidebarContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsx(TooltipProvider, { delayDuration: 0, children: /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-wrapper",
      style: {
        "--sidebar-width": SIDEBAR_WIDTH,
        "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
        ...style
      },
      className: cn(
        "group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
        className
      ),
      ...props,
      children
    }
  ) }) });
}
function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
  if (collapsible === "none") {
    return /* @__PURE__ */ jsx(
      "div",
      {
        "data-slot": "sidebar",
        className: cn(
          "bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col",
          className
        ),
        ...props,
        children
      }
    );
  }
  if (isMobile) {
    return /* @__PURE__ */ jsx(Sheet, { open: openMobile, onOpenChange: setOpenMobile, ...props, children: /* @__PURE__ */ jsxs(
      SheetContent,
      {
        "data-sidebar": "sidebar",
        "data-slot": "sidebar",
        "data-mobile": "true",
        className: "bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden",
        style: {
          "--sidebar-width": SIDEBAR_WIDTH_MOBILE
        },
        side,
        children: [
          /* @__PURE__ */ jsxs(SheetHeader, { className: "sr-only", children: [
            /* @__PURE__ */ jsx(SheetTitle, { children: "Sidebar" }),
            /* @__PURE__ */ jsx(SheetDescription, { children: "Displays the mobile sidebar." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex h-full w-full flex-col", children })
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "group peer text-sidebar-foreground hidden md:block",
      "data-state": state,
      "data-collapsible": state === "collapsed" ? collapsible : "",
      "data-variant": variant,
      "data-side": side,
      "data-slot": "sidebar",
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            "data-slot": "sidebar-gap",
            className: cn(
              "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
              "group-data-[collapsible=offcanvas]:w-0",
              "group-data-[side=right]:rotate-180",
              variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
            )
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            "data-slot": "sidebar-container",
            className: cn(
              "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
              side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
              className
            ),
            ...props,
            children: /* @__PURE__ */ jsx(
              "div",
              {
                "data-sidebar": "sidebar",
                "data-slot": "sidebar-inner",
                className: "bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm",
                children
              }
            )
          }
        )
      ]
    }
  );
}
function SidebarContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-content",
      "data-sidebar": "content",
      className: cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      ),
      ...props
    }
  );
}
function SidebarGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-group",
      "data-sidebar": "group",
      className: cn("relative flex w-full min-w-0 flex-col p-2", className),
      ...props
    }
  );
}
function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "div";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "sidebar-group-label",
      "data-sidebar": "group-label",
      className: cn(
        "text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className
      ),
      ...props
    }
  );
}
function SidebarMenu({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "ul",
    {
      "data-slot": "sidebar-menu",
      "data-sidebar": "menu",
      className: cn("flex w-full min-w-0 flex-col gap-1", className),
      ...props
    }
  );
}
function SidebarMenuItem({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "li",
    {
      "data-slot": "sidebar-menu-item",
      "data-sidebar": "menu-item",
      className: cn("group/menu-item relative", className),
      ...props
    }
  );
}
const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  const { isMobile, state } = useSidebar();
  const button = /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "sidebar-menu-button",
      "data-sidebar": "menu-button",
      "data-size": size,
      "data-active": isActive,
      className: cn(sidebarMenuButtonVariants({ variant, size }), className),
      ...props
    }
  );
  if (!tooltip) {
    return button;
  }
  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip
    };
  }
  return /* @__PURE__ */ jsxs(Tooltip, { children: [
    /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: button }),
    /* @__PURE__ */ jsx(
      TooltipContent,
      {
        side: "right",
        align: "center",
        hidden: state !== "collapsed" || isMobile,
        ...tooltip
      }
    )
  ] });
}
const loader$c = async ({
  request
}) => {
  const {
    client
  } = await makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const products = await getProductsByUserId(client, {
    userId
  });
  return {
    userId,
    products
  };
};
const dashboardLayout = UNSAFE_withComponentProps(function DashboardLayout({
  loaderData
}) {
  const location = useLocation();
  return /* @__PURE__ */ jsxs(SidebarProvider, {
    className: "flex  min-h-full",
    children: [/* @__PURE__ */ jsx(Sidebar, {
      className: "pt-16",
      variant: "floating",
      children: /* @__PURE__ */ jsxs(SidebarContent, {
        children: [/* @__PURE__ */ jsx(SidebarGroup, {
          children: /* @__PURE__ */ jsxs(SidebarMenu, {
            children: [/* @__PURE__ */ jsx(SidebarMenuItem, {
              children: /* @__PURE__ */ jsx(SidebarMenuButton, {
                asChild: true,
                isActive: location.pathname === "/my/dashboard",
                children: /* @__PURE__ */ jsx(Link, {
                  to: "/my/dashboard",
                  children: /* @__PURE__ */ jsx(HomeIcon, {
                    className: "size-4"
                  })
                })
              })
            }), /* @__PURE__ */ jsx(SidebarMenuItem, {
              children: /* @__PURE__ */ jsx(SidebarMenuButton, {
                asChild: true,
                isActive: location.pathname === "/my/dashboard/ideas",
                children: /* @__PURE__ */ jsxs(Link, {
                  to: "/my/dashboard/ideas",
                  children: [/* @__PURE__ */ jsx(SparklesIcon, {
                    className: "size-4"
                  }), /* @__PURE__ */ jsx("span", {
                    children: "Ideas"
                  })]
                })
              })
            })]
          })
        }), /* @__PURE__ */ jsxs(SidebarGroup, {
          children: [/* @__PURE__ */ jsx(SidebarGroupLabel, {
            children: "Product Analytics"
          }), /* @__PURE__ */ jsx(SidebarMenu, {
            children: loaderData.products.map((product) => /* @__PURE__ */ jsx(SidebarMenuItem, {
              children: /* @__PURE__ */ jsx(SidebarMenuButton, {
                asChild: true,
                isActive: location.pathname === `/my/dashboard/products/${product.product_id}`,
                children: /* @__PURE__ */ jsxs(Link, {
                  to: `/my/dashboard/products/${product.product_id}`,
                  children: [/* @__PURE__ */ jsx(RocketIcon, {
                    className: "size-4"
                  }), /* @__PURE__ */ jsx("span", {
                    children: product.name
                  })]
                })
              })
            }, product.product_id))
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("div", {
      className: " h-full w-full",
      children: /* @__PURE__ */ jsx(Outlet, {})
    })]
  });
});
const route42 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dashboardLayout,
  loader: loader$c
}, Symbol.toStringTag, { value: "Module" }));
const THEMES = { light: "", dark: ".dark" };
const ChartContext = React.createContext(null);
function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}
function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;
  return /* @__PURE__ */ jsx(ChartContext.Provider, { value: { config }, children: /* @__PURE__ */ jsxs(
    "div",
    {
      "data-slot": "chart",
      "data-chart": chartId,
      className: cn(
        "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx(ChartStyle, { id: chartId, config }),
        /* @__PURE__ */ jsx(RechartsPrimitive.ResponsiveContainer, { children })
      ]
    }
  ) });
}
const ChartStyle = ({ id, config }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config2]) => config2.theme || config2.color
  );
  if (!colorConfig.length) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "style",
    {
      dangerouslySetInnerHTML: {
        __html: Object.entries(THEMES).map(
          ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig.map(([key, itemConfig]) => {
            const color = itemConfig.theme?.[theme] || itemConfig.color;
            return color ? `  --color-${key}: ${color};` : null;
          }).join("\n")}
}
`
        ).join("\n")
      }
    }
  );
};
const ChartTooltip = RechartsPrimitive.Tooltip;
function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey
}) {
  const { config } = useChart();
  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null;
    }
    const [item] = payload;
    const key = `${labelKey || item?.dataKey || item?.name || "value"}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value = !labelKey && typeof label === "string" ? config[label]?.label || label : itemConfig?.label;
    if (labelFormatter) {
      return /* @__PURE__ */ jsx("div", { className: cn("font-medium", labelClassName), children: labelFormatter(value, payload) });
    }
    if (!value) {
      return null;
    }
    return /* @__PURE__ */ jsx("div", { className: cn("font-medium", labelClassName), children: value });
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey
  ]);
  if (!active || !payload?.length) {
    return null;
  }
  const nestLabel = payload.length === 1 && indicator !== "dot";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
        className
      ),
      children: [
        !nestLabel ? tooltipLabel : null,
        /* @__PURE__ */ jsx("div", { className: "grid gap-1.5", children: payload.filter((item) => item.type !== "none").map((item, index) => {
          const key = `${nameKey || item.name || item.dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);
          const indicatorColor = color || item.payload.fill || item.color;
          return /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5",
                indicator === "dot" && "items-center"
              ),
              children: formatter && item?.value !== void 0 && item.name ? formatter(item.value, item.name, item, index, item.payload) : /* @__PURE__ */ jsxs(Fragment, { children: [
                itemConfig?.icon ? /* @__PURE__ */ jsx(itemConfig.icon, {}) : !hideIndicator && /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: cn(
                      "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
                      {
                        "h-2.5 w-2.5": indicator === "dot",
                        "w-1": indicator === "line",
                        "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
                        "my-0.5": nestLabel && indicator === "dashed"
                      }
                    ),
                    style: {
                      "--color-bg": indicatorColor,
                      "--color-border": indicatorColor
                    }
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: cn(
                      "flex flex-1 justify-between leading-none",
                      nestLabel ? "items-end" : "items-center"
                    ),
                    children: [
                      /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
                        nestLabel ? tooltipLabel : null,
                        /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: itemConfig?.label || item.name })
                      ] }),
                      item.value && /* @__PURE__ */ jsx("span", { className: "text-foreground font-mono font-medium tabular-nums", children: item.value.toLocaleString() })
                    ]
                  }
                )
              ] })
            },
            item.dataKey
          );
        }) })
      ]
    }
  );
}
function getPayloadConfigFromPayload(config, payload, key) {
  if (typeof payload !== "object" || payload === null) {
    return void 0;
  }
  const payloadPayload = "payload" in payload && typeof payload.payload === "object" && payload.payload !== null ? payload.payload : void 0;
  let configLabelKey = key;
  if (key in payload && typeof payload[key] === "string") {
    configLabelKey = payload[key];
  } else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key] === "string") {
    configLabelKey = payloadPayload[key];
  }
  return configLabelKey in config ? config[configLabelKey] : config[key];
}
const meta$8 = () => {
  return [{
    title: "Dashboard | wemake"
  }];
};
const loader$b = async ({
  request
}) => {
  const {
    client
  } = await makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const {
    data: data2,
    error
  } = await client.rpc("get_dashboard_stats", {
    user_id: userId
  });
  if (error) {
    throw error;
  }
  return {
    chartData: data2
  };
};
const chartConfig$1 = {
  views: {
    label: "👁️",
    color: "var(--chart-1)"
  }
};
const dashboardPage = UNSAFE_withComponentProps(function DashboardPage({
  loaderData
}) {
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-5",
    children: [/* @__PURE__ */ jsx("h1", {
      className: "text-2xl font-semibold mb-6",
      children: "Dashboard"
    }), /* @__PURE__ */ jsxs(Card, {
      className: "w-1/2",
      children: [/* @__PURE__ */ jsx(CardHeader, {
        children: /* @__PURE__ */ jsx(CardTitle, {
          children: "Profile views"
        })
      }), /* @__PURE__ */ jsx(CardContent, {
        children: /* @__PURE__ */ jsx(ChartContainer, {
          config: chartConfig$1,
          children: /* @__PURE__ */ jsxs(LineChart, {
            accessibilityLayer: true,
            data: loaderData.chartData,
            margin: {
              left: 12,
              right: 12
            },
            children: [/* @__PURE__ */ jsx(CartesianGrid, {
              vertical: false
            }), /* @__PURE__ */ jsx(XAxis, {
              dataKey: "month",
              tickLine: false,
              axisLine: false,
              tickMargin: 8,
              padding: {
                left: 15,
                right: 15
              }
            }), /* @__PURE__ */ jsx(Line, {
              dataKey: "views",
              type: "natural",
              stroke: "var(--color-views)",
              strokeWidth: 2,
              dot: false
            }), /* @__PURE__ */ jsx(ChartTooltip, {
              cursor: false,
              content: /* @__PURE__ */ jsx(ChartTooltipContent, {
                hideLabel: true
              })
            })]
          })
        })
      })]
    })]
  });
});
const route43 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dashboardPage,
  loader: loader$b,
  meta: meta$8
}, Symbol.toStringTag, { value: "Module" }));
const meta$7 = () => {
  return [{
    title: "My Ideas | wemake"
  }];
};
const loader$a = async ({
  request
}) => {
  const {
    client
  } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const ideas = await getClaimedIdeas(client, {
    userId
  });
  return {
    ideas
  };
};
const dashboardIdeasPage = UNSAFE_withComponentProps(function DashboardIdeasPage({
  loaderData
}) {
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-5 h-full",
    children: [/* @__PURE__ */ jsx("h1", {
      className: "text-2xl font-semibold mb-6",
      children: "Claimed Ideas"
    }), /* @__PURE__ */ jsx("div", {
      className: "grid grid-cols-4 gap-6",
      children: loaderData.ideas.map((idea) => /* @__PURE__ */ jsx(IdeaCard, {
        id: idea.gpt_idea_id,
        title: idea.idea,
        owner: true
      }, idea.gpt_idea_id))
    })]
  });
});
const route44 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dashboardIdeasPage,
  loader: loader$a,
  meta: meta$7
}, Symbol.toStringTag, { value: "Module" }));
const meta$6 = ({
  params
}) => {
  return [{
    title: `Product ${params.productId} | wemake`
  }];
};
const loader$9 = async ({
  request,
  params
}) => {
  const {
    client
  } = await makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const productId = Number(params.productId);
  const {
    error
  } = await client.from("products").select("product_id").eq("profile_id", userId).eq("product_id", productId).single();
  if (error) {
    throw redirect("/my/dashboard/products");
  }
  const {
    data: data2,
    error: rcpError
  } = await client.rpc("get_product_stats", {
    product_id: params.productId
  });
  if (rcpError) {
    throw error;
  }
  return {
    chartData: data2
  };
};
const chartConfig = {
  views: {
    label: "Views",
    color: "var(--chart-1)"
  },
  visitors: {
    label: "Visitors",
    color: "var(--chart-2)"
  }
};
const dashboardProductPage = UNSAFE_withComponentProps(function DashboardProductPage({
  loaderData
}) {
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-5",
    children: [/* @__PURE__ */ jsx("h1", {
      className: "text-2xl font-semibold mb-6",
      children: "Analytics"
    }), /* @__PURE__ */ jsxs(Card, {
      className: "w-1/2",
      children: [/* @__PURE__ */ jsx(CardHeader, {
        children: /* @__PURE__ */ jsx(CardTitle, {
          children: "Performance"
        })
      }), /* @__PURE__ */ jsx(CardContent, {
        children: /* @__PURE__ */ jsx(ChartContainer, {
          config: chartConfig,
          children: /* @__PURE__ */ jsxs(AreaChart, {
            accessibilityLayer: true,
            data: loaderData.chartData,
            margin: {
              left: 12,
              right: 12
            },
            children: [/* @__PURE__ */ jsx(CartesianGrid, {
              vertical: false
            }), /* @__PURE__ */ jsx(XAxis, {
              dataKey: "month",
              tickLine: false,
              axisLine: false,
              tickMargin: 8,
              padding: {
                left: 15,
                right: 15
              }
            }), /* @__PURE__ */ jsx(Area, {
              dataKey: "product_views",
              type: "natural",
              stroke: "var(--color-views)",
              fill: "var(--color-views)",
              strokeWidth: 2,
              dot: false
            }), /* @__PURE__ */ jsx(Area, {
              dataKey: "product_visits",
              type: "natural",
              stroke: "var(--color-visitors)",
              fill: "var(--color-visitors)",
              strokeWidth: 2,
              dot: false
            }), /* @__PURE__ */ jsx(ChartTooltip, {
              cursor: false,
              wrapperStyle: {
                minWidth: "200px"
              },
              content: /* @__PURE__ */ jsx(ChartTooltipContent, {
                indicator: "dot"
              })
            })]
          })
        })
      })]
    })]
  });
});
const route45 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dashboardProductPage,
  loader: loader$9,
  meta: meta$6
}, Symbol.toStringTag, { value: "Module" }));
function MessageCard({
  id,
  avatarUrl,
  name,
  lastMessage
}) {
  const location = useLocation();
  return /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsx(
    SidebarMenuButton,
    {
      className: "h-18",
      asChild: true,
      isActive: location.pathname === `/my/messages/${id}`,
      children: /* @__PURE__ */ jsx(Link, { to: `/my/messages/${id}`, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxs(Avatar, { children: [
          /* @__PURE__ */ jsx(AvatarImage, { src: avatarUrl }),
          /* @__PURE__ */ jsx(AvatarFallback, { children: name[0] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: name }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: lastMessage })
        ] })
      ] }) })
    }
  ) });
}
const loader$8 = async ({
  request
}) => {
  const {
    client
  } = await makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const messages = await getMessages(client, {
    userId
  });
  return {
    messages
  };
};
const messagesLayout = UNSAFE_withComponentProps(function MessagesLayout({
  loaderData
}) {
  const {
    userId,
    name,
    avatar
  } = useOutletContext();
  return /* @__PURE__ */ jsxs(SidebarProvider, {
    className: "flex max-h-[calc(100vh-14rem)] overflow-hidden h-[calc(100vh-14rem)] min-h-full",
    children: [/* @__PURE__ */ jsx(Sidebar, {
      className: "pt-16",
      variant: "floating",
      children: /* @__PURE__ */ jsx(SidebarContent, {
        children: /* @__PURE__ */ jsx(SidebarGroup, {
          children: /* @__PURE__ */ jsx(SidebarMenu, {
            children: loaderData.messages.map((message) => /* @__PURE__ */ jsx(MessageCard, {
              id: message.message_room_id.toString(),
              name: message.name,
              lastMessage: message.last_message,
              avatarUrl: message.avatar
            }, message.message_room_id))
          })
        })
      })
    }), /* @__PURE__ */ jsx("div", {
      className: " h-full flex-1",
      children: /* @__PURE__ */ jsx(Outlet, {
        context: {
          userId,
          name,
          avatar
        }
      })
    })]
  });
});
const route46 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: messagesLayout,
  loader: loader$8
}, Symbol.toStringTag, { value: "Module" }));
const meta$5 = () => {
  return [{
    title: "Messages | wemake"
  }];
};
const messagesPage = UNSAFE_withComponentProps(function MessagesPage() {
  return /* @__PURE__ */ jsxs("div", {
    className: "h-full flex flex-col items-center justify-center gap-4",
    children: [/* @__PURE__ */ jsx(MessageCircleIcon, {
      className: "size-12 text-muted-foreground"
    }), /* @__PURE__ */ jsx("h1", {
      className: "text-xl text-muted-foreground font-semibold",
      children: "Click on a message in the sidebar to view it."
    })]
  });
});
const route47 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: messagesPage,
  meta: meta$5
}, Symbol.toStringTag, { value: "Module" }));
function MessageBubble({
  avatarUrl,
  avatarFallback,
  content,
  isCurrentUser = false
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "flex items-end gap-4",
        isCurrentUser ? "flex-row-reverse" : ""
      ),
      children: [
        /* @__PURE__ */ jsxs(Avatar, { children: [
          /* @__PURE__ */ jsx(AvatarImage, { src: avatarUrl }),
          /* @__PURE__ */ jsx(AvatarFallback, { children: avatarFallback })
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: cn({
              "rounded-md p-4 text-sm w-1/4": true,
              "bg-accent rounded-br-none": isCurrentUser,
              "bg-primary text-primary-foreground rounded-bl-none": !isCurrentUser
            }),
            children: /* @__PURE__ */ jsx("p", { children: content })
          }
        )
      ]
    }
  );
}
const meta$4 = () => {
  return [{
    title: "Message | wemake"
  }];
};
const loader$7 = async ({
  request,
  params
}) => {
  const {
    client
  } = await makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const messages = await getMessagesByMessagesRoomId(client, {
    messageRoomId: Number(params.messageRoomId),
    userId
  });
  const participant = await getRoomsParticipant(client, {
    messageRoomId: Number(params.messageRoomId),
    userId
  });
  return {
    messages,
    participant
  };
};
const action$3 = async ({
  request,
  params
}) => {
  const {
    client
  } = await makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const message = formData.get("message");
  await sendMessageToRoom(client, {
    messageRoomId: Number(params.messageRoomId),
    message,
    userId
  });
  return {
    ok: true
  };
};
const messagePage = UNSAFE_withComponentProps(function MessagePage({
  loaderData,
  actionData
}) {
  const [messages, setMessages] = useState(loaderData.messages);
  const {
    userId,
    name,
    avatar
  } = useOutletContext();
  const formRef = useRef(null);
  useEffect(() => {
    if (actionData?.ok) {
      formRef.current?.reset();
    }
  }, [actionData]);
  useEffect(() => {
    const changes = browserclient.channel(`room:${userId}-${loaderData.participant?.profile?.profile_id}`).on("postgres_changes", {
      event: "INSERT",
      schema: "public",
      table: "messages"
    }, (payload) => {
      setMessages((prev) => [...prev, payload.new]);
    }).subscribe();
    return () => {
      changes.unsubscribe();
    };
  }, []);
  return /* @__PURE__ */ jsxs("div", {
    className: "h-full flex flex-col justify-between",
    children: [/* @__PURE__ */ jsx(Card, {
      children: /* @__PURE__ */ jsxs(CardHeader, {
        className: "flex flex-row items-center gap-4",
        children: [/* @__PURE__ */ jsxs(Avatar, {
          className: "size-14",
          children: [/* @__PURE__ */ jsx(AvatarImage, {
            src: loaderData.participant?.profile?.avatar ?? ""
          }), /* @__PURE__ */ jsx(AvatarFallback, {
            children: loaderData.participant?.profile?.name.charAt(0) ?? ""
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex flex-col gap-0",
          children: [/* @__PURE__ */ jsx(CardTitle, {
            className: "text-xl",
            children: loaderData.participant?.profile?.name ?? ""
          }), /* @__PURE__ */ jsx(CardDescription, {
            children: "2 days ago"
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "py-10 overflow-y-scroll space-y-4 flex flex-col justify-start h-full",
      children: messages.map((message) => /* @__PURE__ */ jsx(MessageBubble, {
        avatarUrl: message.sender_id === userId ? avatar : loaderData.participant?.profile?.avatar ?? "",
        avatarFallback: message.sender_id === userId ? name.charAt(0) : loaderData.participant?.profile.name.charAt(0) ?? "",
        content: message.content,
        isCurrentUser: message.sender_id === userId
      }, message.message_id))
    }), /* @__PURE__ */ jsx(Card, {
      children: /* @__PURE__ */ jsx(CardHeader, {
        children: /* @__PURE__ */ jsxs(Form, {
          ref: formRef,
          method: "post",
          className: "relative flex justify-end items-center",
          children: [/* @__PURE__ */ jsx(Textarea, {
            placeholder: "Write a message...",
            rows: 2,
            required: true,
            name: "message",
            className: "resize-none"
          }), /* @__PURE__ */ jsx(Button, {
            type: "submit",
            size: "icon",
            className: "absolute right-2",
            children: /* @__PURE__ */ jsx(SendIcon, {
              className: "size-4"
            })
          })]
        })
      })
    })]
  });
});
const route48 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$3,
  default: messagePage,
  loader: loader$7,
  meta: meta$4
}, Symbol.toStringTag, { value: "Module" }));
async function loader$6({
  request
}) {
  const {
    client
  } = makeSSRClient(request);
  const {
    data: {
      user
    }
  } = await client.auth.getUser();
  if (user) {
    const profile = await getUserById(client, {
      id: user.id
    });
    console.log(profile, "profile");
    return redirect(`/users/${encodeURIComponent(profile.username)}`);
  }
  return redirect("/auth/login");
}
const route49 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$6
}, Symbol.toStringTag, { value: "Module" }));
const updateUser = async (client, {
  id,
  name,
  role,
  headline,
  bio
}) => {
  const { error } = await client.from("profile").update({ name, role, headline, bio }).eq("profile_id", id);
  if (error) {
    throw error;
  }
};
const updateUserAvatar = async (client, {
  id,
  avatarUrl
}) => {
  const { error } = await client.from("profile").update({ avatar: avatarUrl }).eq("profile_id", id);
  if (error) {
    throw error;
  }
};
const seeNotification = async (client, { userId, notificationId }) => {
  const { error } = await client.from("notifications").update({ seen: true }).eq("notification_id", Number(notificationId)).eq("target_id", userId);
  if (error) {
    throw error;
  }
};
const sendMessage = async (client, {
  fromUserId,
  toUserId,
  content
}) => {
  const { data: data2, error } = await client.rpc("get_room", {
    from_user_id: fromUserId,
    to_user_id: toUserId
  }).maybeSingle();
  if (error) {
    throw error;
  }
  if (data2?.message_room_id) {
    await client.from("messages").insert({
      message_room_id: data2.message_room_id,
      sender_id: fromUserId,
      content
    });
    return data2.message_room_id;
  } else {
    const { data: roomData, error: roomError } = await client.from("message_rooms").insert({}).select("message_room_id").single();
    if (roomError) {
      throw roomError;
    }
    await client.from("message_room_members").insert([
      {
        message_room_id: roomData.message_room_id,
        profile_id: fromUserId
      },
      {
        message_room_id: roomData.message_room_id,
        profile_id: toUserId
      }
    ]);
    await client.from("messages").insert({
      message_room_id: roomData.message_room_id,
      sender_id: fromUserId,
      content
    });
    return roomData.message_room_id;
  }
};
const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Alert = React__default.forwardRef(({ className, variant, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    role: "alert",
    className: cn(alertVariants({ variant }), className),
    ...props
  }
));
Alert.displayName = "Alert";
const AlertTitle = React__default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "h5",
  {
    ref,
    className: cn("mb-1 font-medium leading-none tracking-tight", className),
    ...props
  }
));
AlertTitle.displayName = "AlertTitle";
const AlertDescription = React__default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("text-sm [&_p]:leading-relaxed", className),
    ...props
  }
));
AlertDescription.displayName = "AlertDescription";
const meta$3 = () => {
  return [{
    title: "Settings | wemake"
  }];
};
const loader$5 = async ({
  request
}) => {
  const {
    client
  } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const user = await getUserById(client, {
    id: userId
  });
  return {
    user
  };
};
const formSchema = z$1.object({
  name: z$1.string().min(3),
  role: z$1.string(),
  headline: z$1.string().optional().default(""),
  bio: z$1.string().optional().default("")
});
const action$2 = async ({
  request
}) => {
  const {
    client
  } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const avatar = formData.get("avatar");
  if (avatar && avatar instanceof File) {
    if (avatar.size <= 2097152 && avatar.type.startsWith("image/")) {
      const {
        data: data2,
        error
      } = await client.storage.from("avatars").upload(`${userId}/${Date.now()}`, avatar, {
        contentType: avatar.type,
        upsert: false
      });
      if (error) {
        console.log(error);
        return {
          formErrors: {
            avatar: ["Failed to upload avatar"]
          }
        };
      }
      const {
        data: {
          publicUrl
        }
      } = await client.storage.from("avatars").getPublicUrl(data2.path);
      await updateUserAvatar(client, {
        id: userId,
        avatarUrl: publicUrl
      });
    } else {
      return {
        formErrors: {
          avatar: ["Invalid file size or type"]
        }
      };
    }
  } else {
    const {
      success,
      error,
      data: data2
    } = formSchema.safeParse(Object.fromEntries(formData));
    if (!success) {
      return {
        formErrors: error.flatten().fieldErrors
      };
    }
    const {
      name,
      role,
      headline,
      bio
    } = data2;
    await updateUser(client, {
      id: userId,
      name,
      role,
      headline,
      bio
    });
    return {
      ok: true
    };
  }
};
const settingsPage = UNSAFE_withComponentProps(function SettingsPage({
  loaderData,
  actionData
}) {
  const [avatar, setAvatar] = useState(loaderData.user.avatar);
  const onChange = (event) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setAvatar(URL.createObjectURL(file));
    }
  };
  return /* @__PURE__ */ jsx("div", {
    className: "space-y-20 ",
    children: /* @__PURE__ */ jsxs("div", {
      className: "grid grid-cols-6 gap-40",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "col-span-4 flex flex-col gap-10",
        children: [actionData?.ok ? /* @__PURE__ */ jsxs(Alert, {
          children: [/* @__PURE__ */ jsx(AlertTitle, {
            children: "Success"
          }), /* @__PURE__ */ jsx(AlertDescription, {
            children: "Your profile has been updated."
          })]
        }) : null, /* @__PURE__ */ jsx("h2", {
          className: "text-2xl font-semibold",
          children: "Edit profile"
        }), /* @__PURE__ */ jsxs(Form, {
          className: "flex flex-col w-1/2 gap-5",
          method: "post",
          children: [/* @__PURE__ */ jsx(InputPair, {
            label: "Name",
            description: "Your public name",
            required: true,
            id: "name",
            defaultValue: loaderData.user.name,
            name: "name",
            placeholder: "John Doe"
          }), actionData?.formErrors && "name" in actionData?.formErrors ? /* @__PURE__ */ jsxs(Alert, {
            children: [/* @__PURE__ */ jsx(AlertTitle, {
              children: "Error"
            }), /* @__PURE__ */ jsx(AlertDescription, {
              children: actionData.formErrors?.name?.join(", ")
            })]
          }) : null, /* @__PURE__ */ jsx(SelectPair, {
            label: "Role",
            defaultValue: loaderData.user.role,
            description: "What role do you do identify the most with",
            name: "role",
            placeholder: "Select a role",
            options: [{
              label: "Developer",
              value: "developer"
            }, {
              label: "Designer",
              value: "designer"
            }, {
              label: "Product Manager",
              value: "product-manager"
            }, {
              label: "Founder",
              value: "founder"
            }, {
              label: "Marketer",
              value: "marketer"
            }]
          }), actionData?.formErrors && "role" in actionData?.formErrors ? /* @__PURE__ */ jsxs(Alert, {
            children: [/* @__PURE__ */ jsx(AlertTitle, {
              children: "Error"
            }), /* @__PURE__ */ jsx(AlertDescription, {
              children: actionData.formErrors?.role?.join(", ")
            })]
          }) : null, /* @__PURE__ */ jsx(InputPair, {
            label: "Headline",
            description: "An introduction to your profile.",
            required: true,
            defaultValue: loaderData.user.headline ?? "",
            id: "headline",
            name: "headline",
            placeholder: "John Doe",
            textArea: true
          }), actionData?.formErrors && "headline" in actionData?.formErrors ? /* @__PURE__ */ jsxs(Alert, {
            children: [/* @__PURE__ */ jsx(AlertTitle, {
              children: "Error"
            }), /* @__PURE__ */ jsx(AlertDescription, {
              children: actionData.formErrors?.headline?.join(", ")
            })]
          }) : null, /* @__PURE__ */ jsx(InputPair, {
            label: "Bio",
            description: "Your public bio. It will be displayed on your profile page.",
            required: true,
            id: "bio",
            defaultValue: loaderData.user.bio ?? "",
            name: "bio",
            placeholder: "John Doe",
            textArea: true
          }), actionData?.formErrors && "bio" in actionData?.formErrors ? /* @__PURE__ */ jsxs(Alert, {
            children: [/* @__PURE__ */ jsx(AlertTitle, {
              children: "Error"
            }), /* @__PURE__ */ jsx(AlertDescription, {
              children: actionData.formErrors?.bio?.join(", ")
            })]
          }) : null, /* @__PURE__ */ jsx(Button, {
            className: "w-full",
            children: "Update profile"
          })]
        })]
      }), /* @__PURE__ */ jsxs(Form, {
        className: "col-span-2 p-6 rounded-lg border shadow-md",
        method: "post",
        encType: "multipart/form-data",
        children: [/* @__PURE__ */ jsxs(Label, {
          className: "flex flex-col gap-1",
          children: ["Avatar", /* @__PURE__ */ jsx("small", {
            className: "text-muted-foreground",
            children: "This is your public avatar."
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "space-y-5",
          children: [/* @__PURE__ */ jsx("div", {
            className: "size-40 rounded-full shadow-xl overflow-hidden ",
            children: avatar ? /* @__PURE__ */ jsx("img", {
              src: avatar,
              className: "object-cover w-full h-full"
            }) : null
          }), /* @__PURE__ */ jsx(Input, {
            type: "file",
            className: "w-1/2",
            onChange,
            required: true,
            name: "avatar"
          }), actionData?.formErrors && "avatar" in actionData?.formErrors ? /* @__PURE__ */ jsxs(Alert, {
            children: [/* @__PURE__ */ jsx(AlertTitle, {
              children: "Error"
            }), /* @__PURE__ */ jsx(AlertDescription, {
              children: actionData.formErrors.avatar.join(", ")
            })]
          }) : null, /* @__PURE__ */ jsxs("div", {
            className: "flex flex-col text-xs",
            children: [/* @__PURE__ */ jsx("span", {
              className: " text-muted-foreground",
              children: "Recommended size: 128x128px"
            }), /* @__PURE__ */ jsx("span", {
              className: " text-muted-foreground",
              children: "Allowed formats: PNG, JPEG"
            }), /* @__PURE__ */ jsx("span", {
              className: " text-muted-foreground",
              children: "Max file size: 1MB"
            })]
          }), /* @__PURE__ */ jsx(Button, {
            className: "w-full",
            children: "Update avatar"
          })]
        })]
      })]
    })
  });
});
const route50 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$2,
  default: settingsPage,
  loader: loader$5,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
function NotificationCard({
  type,
  avatarUrl,
  avatarFallback,
  userName,
  timestamp,
  seen,
  productName,
  postTitle,
  payloadId,
  id
}) {
  const getMessage = (type2) => {
    switch (type2) {
      case "follow":
        return " followed you.";
      case "review":
        return " reviewed your product: ";
      case "reply":
        return " replied to your post: ";
    }
  };
  const fetcher = useFetcher();
  const optimiscitSeen = fetcher.state === "idle" ? seen : true;
  return /* @__PURE__ */ jsxs(
    Card,
    {
      className: cn("min-w-[450px]", optimiscitSeen ? "" : "bg-yellow-500/60"),
      children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row gap-5 space-y-0 items-start", children: [
          /* @__PURE__ */ jsxs(Avatar, { className: "", children: [
            /* @__PURE__ */ jsx(AvatarImage, { src: avatarUrl }),
            /* @__PURE__ */ jsx(AvatarFallback, { children: avatarFallback })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs(CardTitle, { className: "text-lg space-y-0 font-bold", children: [
              /* @__PURE__ */ jsx("span", { children: userName }),
              /* @__PURE__ */ jsx("span", { children: getMessage(type) }),
              productName && /* @__PURE__ */ jsx(Button, { variant: "ghost", asChild: true, className: "text-lg", children: /* @__PURE__ */ jsx(Link, { to: `/products/${payloadId}`, children: productName }) }),
              postTitle && /* @__PURE__ */ jsx(Button, { variant: "ghost", asChild: true, className: "text-lg", children: /* @__PURE__ */ jsx(Link, { to: `/community/${payloadId}`, children: postTitle }) })
            ] }),
            /* @__PURE__ */ jsx("small", { className: "text-muted-foreground text-sm", children: timestamp })
          ] })
        ] }),
        /* @__PURE__ */ jsx(CardFooter, { className: "flex justify-end", children: optimiscitSeen ? null : /* @__PURE__ */ jsx(fetcher.Form, { method: "post", action: `/my/notifications/${id}/see`, children: /* @__PURE__ */ jsx(Button, { variant: "outline", size: "icon", children: /* @__PURE__ */ jsx(EyeIcon, { className: "w-4 h-4" }) }) }) })
      ]
    }
  );
}
const meta$2 = () => {
  return [{
    title: "Notifications | wemake"
  }];
};
const loader$4 = async ({
  request
}) => {
  const {
    client
  } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const notifications = await getNotifications(client, {
    userId
  });
  return {
    notifications
  };
};
const notificationsPage = UNSAFE_withComponentProps(function NotificationsPage({
  loaderData
}) {
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-20",
    children: [/* @__PURE__ */ jsx("h1", {
      className: "text-4xl font-bold",
      children: "Notifications"
    }), /* @__PURE__ */ jsx("div", {
      className: "flex flex-col items-start gap-5",
      children: loaderData.notifications.map((notification) => /* @__PURE__ */ jsx(NotificationCard, {
        id: notification.notification_id,
        avatarUrl: notification.source?.avatar ?? "",
        avatarFallback: notification.source?.name?.[0] ?? "",
        userName: notification.source?.name ?? "",
        type: notification.type,
        productName: notification.product?.name ?? "",
        postTitle: notification.post?.title ?? "",
        payloadId: notification.product?.product_id ?? notification.post?.post_id,
        timestamp: DateTime.fromISO(notification.created_at).toRelative(),
        seen: notification.seen
      }, notification.notification_id))
    })]
  });
});
const route51 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: notificationsPage,
  loader: loader$4,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
const action$1 = async ({
  request,
  params
}) => {
  if (request.method !== "POST") {
    return new Response("Method not allowed", {
      status: 405
    });
  }
  const {
    notificationId
  } = params;
  const {
    client
  } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  await seeNotification(client, {
    userId,
    notificationId
  });
  return {
    ok: true
  };
};
const route52 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$1
}, Symbol.toStringTag, { value: "Module" }));
const meta$1 = ({
  data: data2
}) => {
  return [{
    title: `${data2.user.name} | wemake`
  }];
};
const loader$3 = async ({
  request,
  params
}) => {
  const {
    client
  } = makeSSRClient(request);
  const user = await getUserProfile(client, {
    username: params.username
  });
  return {
    user
  };
};
const profileLayout = UNSAFE_withComponentProps(function ProfileLayout({
  loaderData,
  params
}) {
  const {
    isLoggedIn,
    username
  } = useOutletContext();
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-10",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex items-center gap-4",
      children: [/* @__PURE__ */ jsx(Avatar, {
        className: "size-40",
        children: loaderData.user.avatar ? /* @__PURE__ */ jsx(AvatarImage, {
          src: loaderData.user.avatar
        }) : /* @__PURE__ */ jsx(AvatarFallback, {
          className: "text-2xl",
          children: loaderData.user.name[0]
        })
      }), /* @__PURE__ */ jsxs("div", {
        className: "space-y-5",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex gap-2",
          children: [/* @__PURE__ */ jsx("h1", {
            className: "text-2xl font-semibold",
            children: loaderData.user.name
          }), isLoggedIn && username === params.username ? /* @__PURE__ */ jsx(Button, {
            variant: "outline",
            asChild: true,
            children: /* @__PURE__ */ jsx(Link, {
              to: "/my/settings",
              children: "Edit profile"
            })
          }) : null, isLoggedIn && username !== params.username ? /* @__PURE__ */ jsxs(Fragment, {
            children: [/* @__PURE__ */ jsx(Button, {
              variant: "secondary",
              children: "Follow"
            }), /* @__PURE__ */ jsxs(Dialog, {
              children: [/* @__PURE__ */ jsx(DialogTrigger, {
                asChild: true,
                children: /* @__PURE__ */ jsx(Button, {
                  variant: "secondary",
                  children: "Message"
                })
              }), /* @__PURE__ */ jsxs(DialogContent, {
                children: [/* @__PURE__ */ jsx(DialogHeader, {
                  children: /* @__PURE__ */ jsx(DialogTitle, {
                    children: "Message"
                  })
                }), /* @__PURE__ */ jsxs(DialogDescription, {
                  className: "space-y-4",
                  children: [/* @__PURE__ */ jsx("span", {
                    className: "text-sm text-muted-foreground",
                    children: "Send a message to John Doe"
                  }), /* @__PURE__ */ jsxs(Form, {
                    className: "space-y-4",
                    children: [/* @__PURE__ */ jsx(Textarea, {
                      placeholder: "Message",
                      className: "resize-none",
                      rows: 4
                    }), /* @__PURE__ */ jsx(Button, {
                      type: "submit",
                      children: "Send"
                    })]
                  })]
                })]
              })]
            })]
          }) : null]
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex gap-2 items-center",
          children: [/* @__PURE__ */ jsxs("span", {
            className: "text-sm text-muted-foreground",
            children: ["@", loaderData.user.username]
          }), /* @__PURE__ */ jsx(Badge, {
            variant: "secondary",
            children: loaderData.user.role
          }), /* @__PURE__ */ jsx(Badge, {
            variant: "secondary",
            children: "100 followers"
          }), /* @__PURE__ */ jsx(Badge, {
            variant: "secondary",
            children: "100 following"
          })]
        })]
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "flex gap-5",
      children: [{
        label: "About",
        to: `/users/${loaderData.user.username}`
      }, {
        label: "Products",
        to: `/users/${loaderData.user.username}/products`
      }, {
        label: "Posts",
        to: `/users/${loaderData.user.username}/posts`
      }].map((item) => /* @__PURE__ */ jsx(NavLink, {
        end: true,
        className: ({
          isActive
        }) => cn(buttonVariants({
          variant: "outline"
        }), isActive && "bg-accent text-foreground "),
        to: item.to,
        children: item.label
      }, item.label))
    }), /* @__PURE__ */ jsx("div", {
      className: "max-w-screen-md",
      children: /* @__PURE__ */ jsx(Outlet, {
        context: {
          headline: loaderData.user.headline,
          bio: loaderData.user.bio
        }
      })
    })]
  });
});
const route53 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: profileLayout,
  loader: loader$3,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const loader$2 = async ({
  request,
  params
}) => {
  const {
    client
  } = makeSSRClient(request);
  await client.rpc("track_event", {
    event_type: "profile_view",
    event_data: {
      username: params.username
    }
  });
  return null;
};
const profilePage = UNSAFE_withComponentProps(function ProfilePage() {
  const {
    headline,
    bio
  } = useOutletContext();
  return /* @__PURE__ */ jsxs("div", {
    className: "max-w-screen-md flex flex-col space-y-10",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "space-y-2",
      children: [/* @__PURE__ */ jsx("h4", {
        className: "text-lg font-bold",
        children: "Headline"
      }), /* @__PURE__ */ jsx("p", {
        className: "text-muted-foreground",
        children: headline
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "space-y-2",
      children: [/* @__PURE__ */ jsx("h4", {
        className: "text-lg font-bold",
        children: "Bio"
      }), /* @__PURE__ */ jsx("p", {
        className: "text-muted-foreground",
        children: bio
      })]
    })]
  });
});
const route54 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: profilePage,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
const meta = () => {
  return [{
    title: "Products | wemake"
  }];
};
const loader$1 = async ({
  request,
  params
}) => {
  const {
    client,
    headers
  } = makeSSRClient(request);
  const products = await getUserProducts(client, {
    username: params.username
  });
  return {
    products
  };
};
const profileProductsPage = UNSAFE_withComponentProps(function ProfileProductsPage({
  loaderData
}) {
  return /* @__PURE__ */ jsx("div", {
    className: "flex flex-col gap-5",
    children: loaderData.products.map((product) => /* @__PURE__ */ jsx(ProductCard, {
      id: product.product_id,
      name: product.name,
      description: product.tagline,
      reviewsCount: product.reviews,
      viewsCount: product.views,
      votesCount: product.upvotes
    }, product.product_id))
  });
});
const route55 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: profileProductsPage,
  loader: loader$1,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const loader = async ({
  request,
  params
}) => {
  const {
    client,
    headers
  } = makeSSRClient(request);
  const posts = await getUserPosts(client, {
    username: params.username
  });
  return {
    posts
  };
};
const profilePostsPage = UNSAFE_withComponentProps(function ProfilePostsPage({
  loaderData
}) {
  return /* @__PURE__ */ jsx("div", {
    className: "flex flex-col gap-5",
    children: loaderData.posts.map((post) => /* @__PURE__ */ jsx(PostCard, {
      id: post.post_id,
      title: post.title,
      author: post.author,
      authorAvatarUrl: post.author_avatar,
      category: post.topic,
      postedAt: post.created_at,
      expanded: true
    }, post.post_id))
  });
});
const route56 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: profilePostsPage,
  loader
}, Symbol.toStringTag, { value: "Module" }));
z$1.object({
  content: z$1.string().min(1)
});
const action = async ({
  request,
  params
}) => {
  if (request.method !== "POST") {
    return Response.json({
      error: "Method not allowed"
    }, {
      status: 405
    });
  }
  const formData = await request.formData();
  const {
    client
  } = makeSSRClient(request);
  const fromUserId = await getLoggedInUserId(client);
  const {
    profile_id: toUserId
  } = await getUserProfile(client, {
    username: params.username
  });
  const messageRoomId = await sendMessage(client, {
    fromUserId,
    toUserId,
    content: formData.get("content")
  });
  return redirect(`/my/messages/${messageRoomId}`);
};
const route57 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-DZL1bhld.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js", "/assets/index-DiBKe-2N.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-1SbqrUC0.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js", "/assets/index-DiBKe-2N.js", "/assets/separator-CLSYI2yw.js", "/assets/Combination-C5z_oyqV.js", "/assets/index-DPvrs7Pn.js", "/assets/chevron-down-CPR82xAL.js", "/assets/index-CXE3DtQk.js", "/assets/index-B3VxWFua.js", "/assets/index-BAOaxKow.js", "/assets/index-CJ0Od0fq.js", "/assets/utils-CDN07tui.js", "/assets/button-u7dZEDlP.js", "/assets/dropdown-menu-B8C9cL6G.js", "/assets/avatar-FKciKTW_.js", "/assets/message-circle-CC6p5Ajr.js", "/assets/createLucideIcon-EjFB4AoM.js", "/assets/luxon-BD7VOouX.js", "/assets/index-BYSaazUX.js", "/assets/tslib.es6-CmEaCU22.js", "/assets/index-B-Xl6_Xd.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "common/pages/home-page": { "id": "common/pages/home-page", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-page-DOehag2b.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js", "/assets/product-card-DboabsNL.js", "/assets/post-card-IW8GA35a.js", "/assets/idea-card-DnFPWDzW.js", "/assets/job-card-Dx6-6BnF.js", "/assets/team-card-D2ua2j9H.js", "/assets/button-u7dZEDlP.js", "/assets/card-D2n80Ghx.js", "/assets/utils-CDN07tui.js", "/assets/message-circle-CC6p5Ajr.js", "/assets/createLucideIcon-EjFB4AoM.js", "/assets/eye-rvHvLJEs.js", "/assets/chevron-up-DSqLDIL0.js", "/assets/avatar-FKciKTW_.js", "/assets/index-BAOaxKow.js", "/assets/index-BYSaazUX.js", "/assets/index-DiBKe-2N.js", "/assets/index-DPvrs7Pn.js", "/assets/luxon-BD7VOouX.js", "/assets/dot-DKLQtPWj.js", "/assets/heart-Dg6n6vz5.js", "/assets/lock-Bl90DKJ2.js", "/assets/badge-qJo-vPC0.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/products/pages/products-page": { "id": "features/products/pages/products-page", "parentId": "root", "path": "products", "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/products-page-DHkmImFN.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js", "/assets/product-card-DboabsNL.js", "/assets/card-D2n80Ghx.js", "/assets/utils-CDN07tui.js", "/assets/button-u7dZEDlP.js", "/assets/index-DPvrs7Pn.js", "/assets/message-circle-CC6p5Ajr.js", "/assets/createLucideIcon-EjFB4AoM.js", "/assets/eye-rvHvLJEs.js", "/assets/chevron-up-DSqLDIL0.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/products/layouts/leaderboard-layout": { "id": "features/products/layouts/leaderboard-layout", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/leaderboard-layout-DaUWGqzj.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/products/pages/leaderboard-page": { "id": "features/products/pages/leaderboard-page", "parentId": "features/products/layouts/leaderboard-layout", "path": "products/leaderboards", "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/leaderboard-page-CYnIdcEt.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js", "/assets/button-u7dZEDlP.js", "/assets/hero-XWmVON48.js", "/assets/product-card-DboabsNL.js", "/assets/index-DPvrs7Pn.js", "/assets/utils-CDN07tui.js", "/assets/card-D2n80Ghx.js", "/assets/message-circle-CC6p5Ajr.js", "/assets/createLucideIcon-EjFB4AoM.js", "/assets/eye-rvHvLJEs.js", "/assets/chevron-up-DSqLDIL0.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/products/pages/yearly-leaderboard-page": { "id": "features/products/pages/yearly-leaderboard-page", "parentId": "features/products/layouts/leaderboard-layout", "path": "products/leaderboards/yearly/:year", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/yearly-leaderboard-page-Cep2VuFm.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js", "/assets/luxon-BD7VOouX.js", "/assets/hero-XWmVON48.js", "/assets/product-card-DboabsNL.js", "/assets/button-u7dZEDlP.js", "/assets/product-pagination-B6yYyAhm.js", "/assets/card-D2n80Ghx.js", "/assets/utils-CDN07tui.js", "/assets/message-circle-CC6p5Ajr.js", "/assets/createLucideIcon-EjFB4AoM.js", "/assets/eye-rvHvLJEs.js", "/assets/chevron-up-DSqLDIL0.js", "/assets/index-DPvrs7Pn.js", "/assets/chevron-left-DqzSXQrO.js", "/assets/chevron-right-De2llA_i.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/products/pages/monthly-leaderboard-page": { "id": "features/products/pages/monthly-leaderboard-page", "parentId": "features/products/layouts/leaderboard-layout", "path": "products/leaderboards/monthly/:year/:month", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/monthly-leaderboard-page-CnjodAaB.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js", "/assets/luxon-BD7VOouX.js", "/assets/hero-XWmVON48.js", "/assets/product-card-DboabsNL.js", "/assets/button-u7dZEDlP.js", "/assets/product-pagination-B6yYyAhm.js", "/assets/card-D2n80Ghx.js", "/assets/utils-CDN07tui.js", "/assets/message-circle-CC6p5Ajr.js", "/assets/createLucideIcon-EjFB4AoM.js", "/assets/eye-rvHvLJEs.js", "/assets/chevron-up-DSqLDIL0.js", "/assets/index-DPvrs7Pn.js", "/assets/chevron-left-DqzSXQrO.js", "/assets/chevron-right-De2llA_i.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/products/pages/daily-leaderboard-page": { "id": "features/products/pages/daily-leaderboard-page", "parentId": "features/products/layouts/leaderboard-layout", "path": "products/leaderboards/daily/:year/:month/:day", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/daily-leaderboard-page-Bys7TO7K.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js", "/assets/luxon-BD7VOouX.js", "/assets/hero-XWmVON48.js", "/assets/product-card-DboabsNL.js", "/assets/button-u7dZEDlP.js", "/assets/product-pagination-B6yYyAhm.js", "/assets/card-D2n80Ghx.js", "/assets/utils-CDN07tui.js", "/assets/message-circle-CC6p5Ajr.js", "/assets/createLucideIcon-EjFB4AoM.js", "/assets/eye-rvHvLJEs.js", "/assets/chevron-up-DSqLDIL0.js", "/assets/index-DPvrs7Pn.js", "/assets/chevron-left-DqzSXQrO.js", "/assets/chevron-right-De2llA_i.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/products/pages/weekly-leaderboard-page": { "id": "features/products/pages/weekly-leaderboard-page", "parentId": "features/products/layouts/leaderboard-layout", "path": "products/leaderboards/weekly/:year/:week", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/weekly-leaderboard-page-CWd0pkgj.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js", "/assets/luxon-BD7VOouX.js", "/assets/hero-XWmVON48.js", "/assets/product-card-DboabsNL.js", "/assets/button-u7dZEDlP.js", "/assets/product-pagination-B6yYyAhm.js", "/assets/card-D2n80Ghx.js", "/assets/utils-CDN07tui.js", "/assets/message-circle-CC6p5Ajr.js", "/assets/createLucideIcon-EjFB4AoM.js", "/assets/eye-rvHvLJEs.js", "/assets/chevron-up-DSqLDIL0.js", "/assets/index-DPvrs7Pn.js", "/assets/chevron-left-DqzSXQrO.js", "/assets/chevron-right-De2llA_i.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/products/pages/leaderboards-redirection-page": { "id": "features/products/pages/leaderboards-redirection-page", "parentId": "features/products/layouts/leaderboard-layout", "path": "products/leaderboards/:period", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/leaderboards-redirection-page-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/products/pages/categories-page": { "id": "features/products/pages/categories-page", "parentId": "root", "path": "products/categories", "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/categories-page-kUArx4h4.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js", "/assets/hero-XWmVON48.js", "/assets/card-D2n80Ghx.js", "/assets/chevron-right-De2llA_i.js", "/assets/utils-CDN07tui.js", "/assets/createLucideIcon-EjFB4AoM.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/products/pages/category-page": { "id": "features/products/pages/category-page", "parentId": "root", "path": "products/categories/:category", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/category-page-s2g1Zql6.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js", "/assets/hero-XWmVON48.js", "/assets/product-card-DboabsNL.js", "/assets/product-pagination-B6yYyAhm.js", "/assets/card-D2n80Ghx.js", "/assets/utils-CDN07tui.js", "/assets/button-u7dZEDlP.js", "/assets/index-DPvrs7Pn.js", "/assets/message-circle-CC6p5Ajr.js", "/assets/createLucideIcon-EjFB4AoM.js", "/assets/eye-rvHvLJEs.js", "/assets/chevron-up-DSqLDIL0.js", "/assets/chevron-left-DqzSXQrO.js", "/assets/chevron-right-De2llA_i.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/products/pages/search-page": { "id": "features/products/pages/search-page", "parentId": "root", "path": "products/search", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/search-page-CxApm45f.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js", "/assets/product-card-DboabsNL.js", "/assets/button-u7dZEDlP.js", "/assets/input-CLoU7MB4.js", "/assets/hero-XWmVON48.js", "/assets/product-pagination-B6yYyAhm.js", "/assets/card-D2n80Ghx.js", "/assets/utils-CDN07tui.js", "/assets/message-circle-CC6p5Ajr.js", "/assets/createLucideIcon-EjFB4AoM.js", "/assets/eye-rvHvLJEs.js", "/assets/chevron-up-DSqLDIL0.js", "/assets/index-DPvrs7Pn.js", "/assets/chevron-left-DqzSXQrO.js", "/assets/chevron-right-De2llA_i.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/products/pages/submit-product-page": { "id": "features/products/pages/submit-product-page", "parentId": "root", "path": "products/submit", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/submit-product-page-CcSQj0h-.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js", "/assets/hero-XWmVON48.js", "/assets/input-pair-Dgm4wPlg.js", "/assets/input-CLoU7MB4.js", "/assets/select-pair-5HKq6Enq.js", "/assets/label-BdjToNss.js", "/assets/button-u7dZEDlP.js", "/assets/textarea-CyVRXCQx.js", "/assets/utils-CDN07tui.js", "/assets/index-DiBKe-2N.js", "/assets/Combination-C5z_oyqV.js", "/assets/index-BAOaxKow.js", "/assets/index-DPvrs7Pn.js", "/assets/tslib.es6-CmEaCU22.js", "/assets/chevron-down-CPR82xAL.js", "/assets/createLucideIcon-EjFB4AoM.js", "/assets/index-B-Xl6_Xd.js", "/assets/index-B3VxWFua.js", "/assets/index-CJ0Od0fq.js", "/assets/chevron-up-DSqLDIL0.js", "/assets/index-BYSaazUX.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/products/pages/promote-page": { "id": "features/products/pages/promote-page", "parentId": "root", "path": "products/promote", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/promote-page-dNW_CtWo.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js", "/assets/hero-XWmVON48.js", "/assets/select-pair-5HKq6Enq.js", "/assets/utils-CDN07tui.js", "/assets/button-u7dZEDlP.js", "/assets/chevron-left-DqzSXQrO.js", "/assets/chevron-right-De2llA_i.js", "/assets/chevron-down-CPR82xAL.js", "/assets/label-BdjToNss.js", "/assets/luxon-BD7VOouX.js", "/assets/index-DiBKe-2N.js", "/assets/Combination-C5z_oyqV.js", "/assets/index-BAOaxKow.js", "/assets/index-DPvrs7Pn.js", "/assets/tslib.es6-CmEaCU22.js", "/assets/index-B-Xl6_Xd.js", "/assets/index-B3VxWFua.js", "/assets/index-CJ0Od0fq.js", "/assets/chevron-up-DSqLDIL0.js", "/assets/createLucideIcon-EjFB4AoM.js", "/assets/index-BYSaazUX.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/products/pages/promote-success-page": { "id": "features/products/pages/promote-success-page", "parentId": "root", "path": "products/promote/success", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/promote-success-page-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/products/pages/product-redirect-page": { "id": "features/products/pages/product-redirect-page", "parentId": "root", "path": "products/:productId", "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/product-redirect-page-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/products/layouts/product-overview-layout": { "id": "features/products/layouts/product-overview-layout", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/product-overview-layout-DgwR47bx.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js", "/assets/button-u7dZEDlP.js", "/assets/utils-CDN07tui.js", "/assets/star-MiM9nY4c.js", "/assets/chevron-up-DSqLDIL0.js", "/assets/index-DPvrs7Pn.js", "/assets/createLucideIcon-EjFB4AoM.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/products/pages/product-overview-page": { "id": "features/products/pages/product-overview-page", "parentId": "features/products/layouts/product-overview-layout", "path": "products/:productId/overview", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/product-overview-page-Cu_mDqBK.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/products/pages/product-reviews-page": { "id": "features/products/pages/product-reviews-page", "parentId": "features/products/layouts/product-overview-layout", "path": "products/:productId/reviews", "index": true, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/product-reviews-page-C6FwMwEK.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js", "/assets/button-u7dZEDlP.js", "/assets/dialog-Dcdi1jHc.js", "/assets/luxon-BD7VOouX.js", "/assets/avatar-FKciKTW_.js", "/assets/star-MiM9nY4c.js", "/assets/input-pair-Dgm4wPlg.js", "/assets/label-BdjToNss.js", "/assets/index-DPvrs7Pn.js", "/assets/utils-CDN07tui.js", "/assets/index-BF9xJdJe.js", "/assets/createLucideIcon-EjFB4AoM.js", "/assets/Combination-C5z_oyqV.js", "/assets/index-BAOaxKow.js", "/assets/index-DiBKe-2N.js", "/assets/tslib.es6-CmEaCU22.js", "/assets/index-CXE3DtQk.js", "/assets/index-BYSaazUX.js", "/assets/input-CLoU7MB4.js", "/assets/textarea-CyVRXCQx.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/products/pages/product-visit-page": { "id": "features/products/pages/product-visit-page", "parentId": "root", "path": "products/:productId/visit", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/product-visit-page-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/ideas/pages/ideas-page": { "id": "features/ideas/pages/ideas-page", "parentId": "root", "path": "/ideas", "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/ideas-page-COf4PupK.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js", "/assets/hero-XWmVON48.js", "/assets/idea-card-DnFPWDzW.js", "/assets/card-D2n80Ghx.js", "/assets/utils-CDN07tui.js", "/assets/button-u7dZEDlP.js", "/assets/index-DPvrs7Pn.js", "/assets/luxon-BD7VOouX.js", "/assets/eye-rvHvLJEs.js", "/assets/createLucideIcon-EjFB4AoM.js", "/assets/dot-DKLQtPWj.js", "/assets/heart-Dg6n6vz5.js", "/assets/lock-Bl90DKJ2.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/ideas/pages/idea-page": { "id": "features/ideas/pages/idea-page", "parentId": "root", "path": "/ideas/:ideaId", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/idea-page-DMCj5npi.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js", "/assets/hero-XWmVON48.js", "/assets/button-u7dZEDlP.js", "/assets/luxon-BD7VOouX.js", "/assets/eye-rvHvLJEs.js", "/assets/dot-DKLQtPWj.js", "/assets/heart-Dg6n6vz5.js", "/assets/index-DPvrs7Pn.js", "/assets/utils-CDN07tui.js", "/assets/createLucideIcon-EjFB4AoM.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/ideas/pages/generate-idea-page": { "id": "features/ideas/pages/generate-idea-page", "parentId": "root", "path": "/ideas/generate", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/generate-idea-page-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/jobs/pages/jobs-page": { "id": "features/jobs/pages/jobs-page", "parentId": "root", "path": "/jobs", "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/jobs-page-Dp4t62jF.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js", "/assets/hero-XWmVON48.js", "/assets/job-card-Dx6-6BnF.js", "/assets/button-u7dZEDlP.js", "/assets/constants-DJ8Ewpry.js", "/assets/utils-CDN07tui.js", "/assets/card-D2n80Ghx.js", "/assets/badge-qJo-vPC0.js", "/assets/index-DPvrs7Pn.js", "/assets/luxon-BD7VOouX.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/jobs/pages/job-page": { "id": "features/jobs/pages/job-page", "parentId": "root", "path": "/jobs/:jobId", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/job-page-BxJjRiEe.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js", "/assets/badge-qJo-vPC0.js", "/assets/button-u7dZEDlP.js", "/assets/luxon-BD7VOouX.js", "/assets/dot-DKLQtPWj.js", "/assets/index-DPvrs7Pn.js", "/assets/utils-CDN07tui.js", "/assets/createLucideIcon-EjFB4AoM.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/jobs/pages/submit-job-page": { "id": "features/jobs/pages/submit-job-page", "parentId": "root", "path": "/jobs/submit", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/submit-job-page-9tBYgZGe.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js", "/assets/hero-XWmVON48.js", "/assets/input-pair-Dgm4wPlg.js", "/assets/select-pair-5HKq6Enq.js", "/assets/constants-DJ8Ewpry.js", "/assets/button-u7dZEDlP.js", "/assets/external-ByW0e6RG.js", "/assets/input-CLoU7MB4.js", "/assets/utils-CDN07tui.js", "/assets/label-BdjToNss.js", "/assets/index-BYSaazUX.js", "/assets/index-DiBKe-2N.js", "/assets/index-DPvrs7Pn.js", "/assets/textarea-CyVRXCQx.js", "/assets/Combination-C5z_oyqV.js", "/assets/index-BAOaxKow.js", "/assets/tslib.es6-CmEaCU22.js", "/assets/chevron-down-CPR82xAL.js", "/assets/createLucideIcon-EjFB4AoM.js", "/assets/index-B-Xl6_Xd.js", "/assets/index-B3VxWFua.js", "/assets/index-CJ0Od0fq.js", "/assets/chevron-up-DSqLDIL0.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/auth/layouts/auth-layout": { "id": "features/auth/layouts/auth-layout", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/auth-layout-Cddpwzep.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js", "/assets/utils-CDN07tui.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/auth/pages/login-page": { "id": "features/auth/pages/login-page", "parentId": "features/auth/layouts/auth-layout", "path": "/auth/login", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/login-page-DrYeWUPH.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js", "/assets/input-pair-Dgm4wPlg.js", "/assets/button-u7dZEDlP.js", "/assets/auth-buttons-BG2gBDdE.js", "/assets/loader-circle-Cqis1J1-.js", "/assets/input-CLoU7MB4.js", "/assets/utils-CDN07tui.js", "/assets/label-BdjToNss.js", "/assets/index-BYSaazUX.js", "/assets/index-DiBKe-2N.js", "/assets/index-DPvrs7Pn.js", "/assets/textarea-CyVRXCQx.js", "/assets/separator-CLSYI2yw.js", "/assets/message-circle-CC6p5Ajr.js", "/assets/createLucideIcon-EjFB4AoM.js", "/assets/lock-Bl90DKJ2.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/auth/pages/join-page": { "id": "features/auth/pages/join-page", "parentId": "features/auth/layouts/auth-layout", "path": "/auth/join", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/join-page-BvvxBTmH.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js", "/assets/button-u7dZEDlP.js", "/assets/input-pair-Dgm4wPlg.js", "/assets/auth-buttons-BG2gBDdE.js", "/assets/loader-circle-Cqis1J1-.js", "/assets/index-DPvrs7Pn.js", "/assets/utils-CDN07tui.js", "/assets/input-CLoU7MB4.js", "/assets/label-BdjToNss.js", "/assets/index-BYSaazUX.js", "/assets/index-DiBKe-2N.js", "/assets/textarea-CyVRXCQx.js", "/assets/separator-CLSYI2yw.js", "/assets/message-circle-CC6p5Ajr.js", "/assets/createLucideIcon-EjFB4AoM.js", "/assets/lock-Bl90DKJ2.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/auth/pages/otp-start-page": { "id": "features/auth/pages/otp-start-page", "parentId": "features/auth/layouts/auth-layout", "path": "/auth/otp/start", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/otp-start-page-w2MLlOgO.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js", "/assets/button-u7dZEDlP.js", "/assets/input-pair-Dgm4wPlg.js", "/assets/loader-circle-Cqis1J1-.js", "/assets/index-DPvrs7Pn.js", "/assets/utils-CDN07tui.js", "/assets/input-CLoU7MB4.js", "/assets/label-BdjToNss.js", "/assets/index-BYSaazUX.js", "/assets/index-DiBKe-2N.js", "/assets/textarea-CyVRXCQx.js", "/assets/createLucideIcon-EjFB4AoM.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/auth/pages/otp-complete-page": { "id": "features/auth/pages/otp-complete-page", "parentId": "features/auth/layouts/auth-layout", "path": "/auth/otp/complete", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/otp-complete-page-CDKOQBAE.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js", "/assets/input-pair-Dgm4wPlg.js", "/assets/button-u7dZEDlP.js", "/assets/loader-circle-Cqis1J1-.js", "/assets/input-CLoU7MB4.js", "/assets/utils-CDN07tui.js", "/assets/label-BdjToNss.js", "/assets/index-BYSaazUX.js", "/assets/index-DiBKe-2N.js", "/assets/index-DPvrs7Pn.js", "/assets/textarea-CyVRXCQx.js", "/assets/createLucideIcon-EjFB4AoM.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/auth/pages/social-start-page": { "id": "features/auth/pages/social-start-page", "parentId": "features/auth/layouts/auth-layout", "path": "/auth/social/:provider/start", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/social-start-page-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/auth/pages/social-complete-page": { "id": "features/auth/pages/social-complete-page", "parentId": "features/auth/layouts/auth-layout", "path": "/auth/social/:provider/complete", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/social-complete-page-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/auth/pages/logout-page": { "id": "features/auth/pages/logout-page", "parentId": "root", "path": "/auth/logout", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/logout-page-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/community/pages/community-page": { "id": "features/community/pages/community-page", "parentId": "root", "path": "/community", "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/community-page-BrDgz84D.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js", "/assets/hero-XWmVON48.js", "/assets/button-u7dZEDlP.js", "/assets/dropdown-menu-B8C9cL6G.js", "/assets/input-CLoU7MB4.js", "/assets/post-card-IW8GA35a.js", "/assets/chevron-down-CPR82xAL.js", "/assets/index-DPvrs7Pn.js", "/assets/utils-CDN07tui.js", "/assets/Combination-C5z_oyqV.js", "/assets/index-BAOaxKow.js", "/assets/index-DiBKe-2N.js", "/assets/tslib.es6-CmEaCU22.js", "/assets/index-B-Xl6_Xd.js", "/assets/index-CXE3DtQk.js", "/assets/card-D2n80Ghx.js", "/assets/avatar-FKciKTW_.js", "/assets/index-BYSaazUX.js", "/assets/luxon-BD7VOouX.js", "/assets/dot-DKLQtPWj.js", "/assets/createLucideIcon-EjFB4AoM.js", "/assets/chevron-up-DSqLDIL0.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/community/pages/post-page": { "id": "features/community/pages/post-page", "parentId": "root", "path": "/community/:postId", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/post-page-D8gT0bW4.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js", "/assets/index-DPvrs7Pn.js", "/assets/utils-CDN07tui.js", "/assets/chevron-right-De2llA_i.js", "/assets/button-u7dZEDlP.js", "/assets/textarea-CyVRXCQx.js", "/assets/avatar-FKciKTW_.js", "/assets/badge-qJo-vPC0.js", "/assets/luxon-BD7VOouX.js", "/assets/dot-DKLQtPWj.js", "/assets/message-circle-CC6p5Ajr.js", "/assets/chevron-up-DSqLDIL0.js", "/assets/createLucideIcon-EjFB4AoM.js", "/assets/index-BAOaxKow.js", "/assets/index-BYSaazUX.js", "/assets/index-DiBKe-2N.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/community/pages/upvote-post-page": { "id": "features/community/pages/upvote-post-page", "parentId": "root", "path": "/community/:postId/upvote", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/upvote-post-page-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/community/pages/submit-post-page": { "id": "features/community/pages/submit-post-page", "parentId": "root", "path": "/community/submit", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/submit-post-page-D33oL-aF.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js", "/assets/hero-XWmVON48.js", "/assets/input-pair-Dgm4wPlg.js", "/assets/select-pair-5HKq6Enq.js", "/assets/button-u7dZEDlP.js", "/assets/input-CLoU7MB4.js", "/assets/utils-CDN07tui.js", "/assets/label-BdjToNss.js", "/assets/index-BYSaazUX.js", "/assets/index-DiBKe-2N.js", "/assets/index-DPvrs7Pn.js", "/assets/textarea-CyVRXCQx.js", "/assets/Combination-C5z_oyqV.js", "/assets/index-BAOaxKow.js", "/assets/tslib.es6-CmEaCU22.js", "/assets/chevron-down-CPR82xAL.js", "/assets/createLucideIcon-EjFB4AoM.js", "/assets/index-B-Xl6_Xd.js", "/assets/index-B3VxWFua.js", "/assets/index-CJ0Od0fq.js", "/assets/chevron-up-DSqLDIL0.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/teams/pages/teams-page": { "id": "features/teams/pages/teams-page", "parentId": "root", "path": "/teams", "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/teams-page-B2RqD6l1.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js", "/assets/hero-XWmVON48.js", "/assets/team-card-D2ua2j9H.js", "/assets/card-D2n80Ghx.js", "/assets/utils-CDN07tui.js", "/assets/badge-qJo-vPC0.js", "/assets/index-DPvrs7Pn.js", "/assets/avatar-FKciKTW_.js", "/assets/index-BAOaxKow.js", "/assets/index-BYSaazUX.js", "/assets/index-DiBKe-2N.js", "/assets/button-u7dZEDlP.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/teams/pages/team-page": { "id": "features/teams/pages/team-page", "parentId": "root", "path": "/teams/:teamId", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/team-page-B4_vQn05.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js", "/assets/hero-XWmVON48.js", "/assets/button-u7dZEDlP.js", "/assets/avatar-FKciKTW_.js", "/assets/badge-qJo-vPC0.js", "/assets/input-pair-Dgm4wPlg.js", "/assets/card-D2n80Ghx.js", "/assets/index-DPvrs7Pn.js", "/assets/utils-CDN07tui.js", "/assets/index-BAOaxKow.js", "/assets/index-BYSaazUX.js", "/assets/index-DiBKe-2N.js", "/assets/input-CLoU7MB4.js", "/assets/label-BdjToNss.js", "/assets/textarea-CyVRXCQx.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/teams/pages/submit-team-page": { "id": "features/teams/pages/submit-team-page", "parentId": "root", "path": "/teams/create", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/submit-team-page-Dww7qQMU.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js", "/assets/hero-XWmVON48.js", "/assets/button-u7dZEDlP.js", "/assets/input-pair-Dgm4wPlg.js", "/assets/select-pair-5HKq6Enq.js", "/assets/external-ByW0e6RG.js", "/assets/index-DPvrs7Pn.js", "/assets/utils-CDN07tui.js", "/assets/input-CLoU7MB4.js", "/assets/label-BdjToNss.js", "/assets/index-BYSaazUX.js", "/assets/index-DiBKe-2N.js", "/assets/textarea-CyVRXCQx.js", "/assets/Combination-C5z_oyqV.js", "/assets/index-BAOaxKow.js", "/assets/tslib.es6-CmEaCU22.js", "/assets/chevron-down-CPR82xAL.js", "/assets/createLucideIcon-EjFB4AoM.js", "/assets/index-B-Xl6_Xd.js", "/assets/index-B3VxWFua.js", "/assets/index-CJ0Od0fq.js", "/assets/chevron-up-DSqLDIL0.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/users/layouts/dashboard-layout": { "id": "features/users/layouts/dashboard-layout", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/dashboard-layout-Oftsz-nK.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js", "/assets/sidebar-BSTZd5P-.js", "/assets/createLucideIcon-EjFB4AoM.js", "/assets/index-DPvrs7Pn.js", "/assets/utils-CDN07tui.js", "/assets/index-BF9xJdJe.js", "/assets/Combination-C5z_oyqV.js", "/assets/index-BAOaxKow.js", "/assets/index-DiBKe-2N.js", "/assets/tslib.es6-CmEaCU22.js", "/assets/index-CXE3DtQk.js", "/assets/index-B-Xl6_Xd.js", "/assets/index-CJ0Od0fq.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/users/pages/dashboard-page": { "id": "features/users/pages/dashboard-page", "parentId": "features/users/layouts/dashboard-layout", "path": "/my/dashboard", "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/dashboard-page-2eK5tm3P.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js", "/assets/card-D2n80Ghx.js", "/assets/chart-Oa51dn-y.js", "/assets/utils-CDN07tui.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/users/pages/dashboard-ideas-page": { "id": "features/users/pages/dashboard-ideas-page", "parentId": "features/users/layouts/dashboard-layout", "path": "/my/dashboard/ideas", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/dashboard-ideas-page-5ZrgWSRr.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js", "/assets/idea-card-DnFPWDzW.js", "/assets/card-D2n80Ghx.js", "/assets/utils-CDN07tui.js", "/assets/button-u7dZEDlP.js", "/assets/index-DPvrs7Pn.js", "/assets/luxon-BD7VOouX.js", "/assets/eye-rvHvLJEs.js", "/assets/createLucideIcon-EjFB4AoM.js", "/assets/dot-DKLQtPWj.js", "/assets/heart-Dg6n6vz5.js", "/assets/lock-Bl90DKJ2.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/users/pages/dashboard-product-page": { "id": "features/users/pages/dashboard-product-page", "parentId": "features/users/layouts/dashboard-layout", "path": "/my/dashboard/products/:productId", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/dashboard-product-page-B4ibiHu8.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js", "/assets/card-D2n80Ghx.js", "/assets/chart-Oa51dn-y.js", "/assets/utils-CDN07tui.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/users/layouts/messages-layout": { "id": "features/users/layouts/messages-layout", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/messages-layout-yIxjTMWi.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js", "/assets/avatar-FKciKTW_.js", "/assets/sidebar-BSTZd5P-.js", "/assets/index-BAOaxKow.js", "/assets/index-BYSaazUX.js", "/assets/index-DiBKe-2N.js", "/assets/index-DPvrs7Pn.js", "/assets/utils-CDN07tui.js", "/assets/index-BF9xJdJe.js", "/assets/createLucideIcon-EjFB4AoM.js", "/assets/Combination-C5z_oyqV.js", "/assets/tslib.es6-CmEaCU22.js", "/assets/index-CXE3DtQk.js", "/assets/index-B-Xl6_Xd.js", "/assets/index-CJ0Od0fq.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/users/pages/messages-page": { "id": "features/users/pages/messages-page", "parentId": "features/users/layouts/messages-layout", "path": "/my/messages", "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/messages-page-BCqAqLqo.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js", "/assets/message-circle-CC6p5Ajr.js", "/assets/createLucideIcon-EjFB4AoM.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/users/pages/message-page": { "id": "features/users/pages/message-page", "parentId": "features/users/layouts/messages-layout", "path": "/my/messages/:messageRoomId", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/message-page-Bilzd9fR.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js", "/assets/tslib.es6-CmEaCU22.js", "/assets/card-D2n80Ghx.js", "/assets/avatar-FKciKTW_.js", "/assets/utils-CDN07tui.js", "/assets/textarea-CyVRXCQx.js", "/assets/button-u7dZEDlP.js", "/assets/createLucideIcon-EjFB4AoM.js", "/assets/index-BAOaxKow.js", "/assets/index-BYSaazUX.js", "/assets/index-DiBKe-2N.js", "/assets/index-DPvrs7Pn.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/users/pages/my-profile-page": { "id": "features/users/pages/my-profile-page", "parentId": "root", "path": "/my/profile", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/my-profile-page-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/users/pages/settings-page": { "id": "features/users/pages/settings-page", "parentId": "root", "path": "/my/settings", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/settings-page-CEB2JU0z.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js", "/assets/input-pair-Dgm4wPlg.js", "/assets/select-pair-5HKq6Enq.js", "/assets/input-CLoU7MB4.js", "/assets/label-BdjToNss.js", "/assets/button-u7dZEDlP.js", "/assets/index-DPvrs7Pn.js", "/assets/utils-CDN07tui.js", "/assets/textarea-CyVRXCQx.js", "/assets/index-DiBKe-2N.js", "/assets/Combination-C5z_oyqV.js", "/assets/index-BAOaxKow.js", "/assets/tslib.es6-CmEaCU22.js", "/assets/chevron-down-CPR82xAL.js", "/assets/createLucideIcon-EjFB4AoM.js", "/assets/index-B-Xl6_Xd.js", "/assets/index-B3VxWFua.js", "/assets/index-CJ0Od0fq.js", "/assets/chevron-up-DSqLDIL0.js", "/assets/index-BYSaazUX.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/users/pages/notifications-page": { "id": "features/users/pages/notifications-page", "parentId": "root", "path": "/my/notifications", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/notifications-page-BrRBVx6t.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js", "/assets/card-D2n80Ghx.js", "/assets/avatar-FKciKTW_.js", "/assets/button-u7dZEDlP.js", "/assets/utils-CDN07tui.js", "/assets/eye-rvHvLJEs.js", "/assets/luxon-BD7VOouX.js", "/assets/index-BAOaxKow.js", "/assets/index-BYSaazUX.js", "/assets/index-DiBKe-2N.js", "/assets/index-DPvrs7Pn.js", "/assets/createLucideIcon-EjFB4AoM.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/users/pages/see-notification-page": { "id": "features/users/pages/see-notification-page", "parentId": "root", "path": "/my/notifications/:notificationId/see", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/see-notification-page-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/users/layouts/profile-layout": { "id": "features/users/layouts/profile-layout", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/profile-layout-jmdiFrGh.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js", "/assets/avatar-FKciKTW_.js", "/assets/badge-qJo-vPC0.js", "/assets/button-u7dZEDlP.js", "/assets/dialog-Dcdi1jHc.js", "/assets/textarea-CyVRXCQx.js", "/assets/utils-CDN07tui.js", "/assets/index-BAOaxKow.js", "/assets/index-BYSaazUX.js", "/assets/index-DiBKe-2N.js", "/assets/index-DPvrs7Pn.js", "/assets/index-BF9xJdJe.js", "/assets/createLucideIcon-EjFB4AoM.js", "/assets/Combination-C5z_oyqV.js", "/assets/tslib.es6-CmEaCU22.js", "/assets/index-CXE3DtQk.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/users/pages/profile-page": { "id": "features/users/pages/profile-page", "parentId": "features/users/layouts/profile-layout", "path": "/users/:username", "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/profile-page-c79ALzC6.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/users/pages/profile-products-page": { "id": "features/users/pages/profile-products-page", "parentId": "features/users/layouts/profile-layout", "path": "/users/:username/products", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/profile-products-page-BDYgDTfB.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js", "/assets/product-card-DboabsNL.js", "/assets/card-D2n80Ghx.js", "/assets/utils-CDN07tui.js", "/assets/button-u7dZEDlP.js", "/assets/index-DPvrs7Pn.js", "/assets/message-circle-CC6p5Ajr.js", "/assets/createLucideIcon-EjFB4AoM.js", "/assets/eye-rvHvLJEs.js", "/assets/chevron-up-DSqLDIL0.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/users/pages/profile-posts-page": { "id": "features/users/pages/profile-posts-page", "parentId": "features/users/layouts/profile-layout", "path": "/users/:username/posts", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/profile-posts-page-MhTQj2Ap.js", "imports": ["/assets/chunk-WWGJGFF6-BrB3zUVq.js", "/assets/post-card-IW8GA35a.js", "/assets/card-D2n80Ghx.js", "/assets/utils-CDN07tui.js", "/assets/avatar-FKciKTW_.js", "/assets/index-BAOaxKow.js", "/assets/index-BYSaazUX.js", "/assets/index-DiBKe-2N.js", "/assets/index-DPvrs7Pn.js", "/assets/button-u7dZEDlP.js", "/assets/luxon-BD7VOouX.js", "/assets/dot-DKLQtPWj.js", "/assets/createLucideIcon-EjFB4AoM.js", "/assets/chevron-up-DSqLDIL0.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/users/pages/send-message-page": { "id": "features/users/pages/send-message-page", "parentId": "root", "path": "/users/:username/messages", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/send-message-page-CIAyzkmw.js", "imports": ["/assets/external-ByW0e6RG.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-ed5d3248.js", "version": "ed5d3248", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_optimizeDeps": false, "unstable_subResourceIntegrity": false, "v8_middleware": false, "v8_splitRouteModules": false, "v8_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "common/pages/home-page": {
    id: "common/pages/home-page",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "features/products/pages/products-page": {
    id: "features/products/pages/products-page",
    parentId: "root",
    path: "products",
    index: true,
    caseSensitive: void 0,
    module: route2
  },
  "features/products/layouts/leaderboard-layout": {
    id: "features/products/layouts/leaderboard-layout",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "features/products/pages/leaderboard-page": {
    id: "features/products/pages/leaderboard-page",
    parentId: "features/products/layouts/leaderboard-layout",
    path: "products/leaderboards",
    index: true,
    caseSensitive: void 0,
    module: route4
  },
  "features/products/pages/yearly-leaderboard-page": {
    id: "features/products/pages/yearly-leaderboard-page",
    parentId: "features/products/layouts/leaderboard-layout",
    path: "products/leaderboards/yearly/:year",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "features/products/pages/monthly-leaderboard-page": {
    id: "features/products/pages/monthly-leaderboard-page",
    parentId: "features/products/layouts/leaderboard-layout",
    path: "products/leaderboards/monthly/:year/:month",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "features/products/pages/daily-leaderboard-page": {
    id: "features/products/pages/daily-leaderboard-page",
    parentId: "features/products/layouts/leaderboard-layout",
    path: "products/leaderboards/daily/:year/:month/:day",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "features/products/pages/weekly-leaderboard-page": {
    id: "features/products/pages/weekly-leaderboard-page",
    parentId: "features/products/layouts/leaderboard-layout",
    path: "products/leaderboards/weekly/:year/:week",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "features/products/pages/leaderboards-redirection-page": {
    id: "features/products/pages/leaderboards-redirection-page",
    parentId: "features/products/layouts/leaderboard-layout",
    path: "products/leaderboards/:period",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "features/products/pages/categories-page": {
    id: "features/products/pages/categories-page",
    parentId: "root",
    path: "products/categories",
    index: true,
    caseSensitive: void 0,
    module: route10
  },
  "features/products/pages/category-page": {
    id: "features/products/pages/category-page",
    parentId: "root",
    path: "products/categories/:category",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  },
  "features/products/pages/search-page": {
    id: "features/products/pages/search-page",
    parentId: "root",
    path: "products/search",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "features/products/pages/submit-product-page": {
    id: "features/products/pages/submit-product-page",
    parentId: "root",
    path: "products/submit",
    index: void 0,
    caseSensitive: void 0,
    module: route13
  },
  "features/products/pages/promote-page": {
    id: "features/products/pages/promote-page",
    parentId: "root",
    path: "products/promote",
    index: void 0,
    caseSensitive: void 0,
    module: route14
  },
  "features/products/pages/promote-success-page": {
    id: "features/products/pages/promote-success-page",
    parentId: "root",
    path: "products/promote/success",
    index: void 0,
    caseSensitive: void 0,
    module: route15
  },
  "features/products/pages/product-redirect-page": {
    id: "features/products/pages/product-redirect-page",
    parentId: "root",
    path: "products/:productId",
    index: true,
    caseSensitive: void 0,
    module: route16
  },
  "features/products/layouts/product-overview-layout": {
    id: "features/products/layouts/product-overview-layout",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route17
  },
  "features/products/pages/product-overview-page": {
    id: "features/products/pages/product-overview-page",
    parentId: "features/products/layouts/product-overview-layout",
    path: "products/:productId/overview",
    index: void 0,
    caseSensitive: void 0,
    module: route18
  },
  "features/products/pages/product-reviews-page": {
    id: "features/products/pages/product-reviews-page",
    parentId: "features/products/layouts/product-overview-layout",
    path: "products/:productId/reviews",
    index: true,
    caseSensitive: void 0,
    module: route19
  },
  "features/products/pages/product-visit-page": {
    id: "features/products/pages/product-visit-page",
    parentId: "root",
    path: "products/:productId/visit",
    index: void 0,
    caseSensitive: void 0,
    module: route20
  },
  "features/ideas/pages/ideas-page": {
    id: "features/ideas/pages/ideas-page",
    parentId: "root",
    path: "/ideas",
    index: true,
    caseSensitive: void 0,
    module: route21
  },
  "features/ideas/pages/idea-page": {
    id: "features/ideas/pages/idea-page",
    parentId: "root",
    path: "/ideas/:ideaId",
    index: void 0,
    caseSensitive: void 0,
    module: route22
  },
  "features/ideas/pages/generate-idea-page": {
    id: "features/ideas/pages/generate-idea-page",
    parentId: "root",
    path: "/ideas/generate",
    index: void 0,
    caseSensitive: void 0,
    module: route23
  },
  "features/jobs/pages/jobs-page": {
    id: "features/jobs/pages/jobs-page",
    parentId: "root",
    path: "/jobs",
    index: true,
    caseSensitive: void 0,
    module: route24
  },
  "features/jobs/pages/job-page": {
    id: "features/jobs/pages/job-page",
    parentId: "root",
    path: "/jobs/:jobId",
    index: void 0,
    caseSensitive: void 0,
    module: route25
  },
  "features/jobs/pages/submit-job-page": {
    id: "features/jobs/pages/submit-job-page",
    parentId: "root",
    path: "/jobs/submit",
    index: void 0,
    caseSensitive: void 0,
    module: route26
  },
  "features/auth/layouts/auth-layout": {
    id: "features/auth/layouts/auth-layout",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route27
  },
  "features/auth/pages/login-page": {
    id: "features/auth/pages/login-page",
    parentId: "features/auth/layouts/auth-layout",
    path: "/auth/login",
    index: void 0,
    caseSensitive: void 0,
    module: route28
  },
  "features/auth/pages/join-page": {
    id: "features/auth/pages/join-page",
    parentId: "features/auth/layouts/auth-layout",
    path: "/auth/join",
    index: void 0,
    caseSensitive: void 0,
    module: route29
  },
  "features/auth/pages/otp-start-page": {
    id: "features/auth/pages/otp-start-page",
    parentId: "features/auth/layouts/auth-layout",
    path: "/auth/otp/start",
    index: void 0,
    caseSensitive: void 0,
    module: route30
  },
  "features/auth/pages/otp-complete-page": {
    id: "features/auth/pages/otp-complete-page",
    parentId: "features/auth/layouts/auth-layout",
    path: "/auth/otp/complete",
    index: void 0,
    caseSensitive: void 0,
    module: route31
  },
  "features/auth/pages/social-start-page": {
    id: "features/auth/pages/social-start-page",
    parentId: "features/auth/layouts/auth-layout",
    path: "/auth/social/:provider/start",
    index: void 0,
    caseSensitive: void 0,
    module: route32
  },
  "features/auth/pages/social-complete-page": {
    id: "features/auth/pages/social-complete-page",
    parentId: "features/auth/layouts/auth-layout",
    path: "/auth/social/:provider/complete",
    index: void 0,
    caseSensitive: void 0,
    module: route33
  },
  "features/auth/pages/logout-page": {
    id: "features/auth/pages/logout-page",
    parentId: "root",
    path: "/auth/logout",
    index: void 0,
    caseSensitive: void 0,
    module: route34
  },
  "features/community/pages/community-page": {
    id: "features/community/pages/community-page",
    parentId: "root",
    path: "/community",
    index: true,
    caseSensitive: void 0,
    module: route35
  },
  "features/community/pages/post-page": {
    id: "features/community/pages/post-page",
    parentId: "root",
    path: "/community/:postId",
    index: void 0,
    caseSensitive: void 0,
    module: route36
  },
  "features/community/pages/upvote-post-page": {
    id: "features/community/pages/upvote-post-page",
    parentId: "root",
    path: "/community/:postId/upvote",
    index: void 0,
    caseSensitive: void 0,
    module: route37
  },
  "features/community/pages/submit-post-page": {
    id: "features/community/pages/submit-post-page",
    parentId: "root",
    path: "/community/submit",
    index: void 0,
    caseSensitive: void 0,
    module: route38
  },
  "features/teams/pages/teams-page": {
    id: "features/teams/pages/teams-page",
    parentId: "root",
    path: "/teams",
    index: true,
    caseSensitive: void 0,
    module: route39
  },
  "features/teams/pages/team-page": {
    id: "features/teams/pages/team-page",
    parentId: "root",
    path: "/teams/:teamId",
    index: void 0,
    caseSensitive: void 0,
    module: route40
  },
  "features/teams/pages/submit-team-page": {
    id: "features/teams/pages/submit-team-page",
    parentId: "root",
    path: "/teams/create",
    index: void 0,
    caseSensitive: void 0,
    module: route41
  },
  "features/users/layouts/dashboard-layout": {
    id: "features/users/layouts/dashboard-layout",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route42
  },
  "features/users/pages/dashboard-page": {
    id: "features/users/pages/dashboard-page",
    parentId: "features/users/layouts/dashboard-layout",
    path: "/my/dashboard",
    index: true,
    caseSensitive: void 0,
    module: route43
  },
  "features/users/pages/dashboard-ideas-page": {
    id: "features/users/pages/dashboard-ideas-page",
    parentId: "features/users/layouts/dashboard-layout",
    path: "/my/dashboard/ideas",
    index: void 0,
    caseSensitive: void 0,
    module: route44
  },
  "features/users/pages/dashboard-product-page": {
    id: "features/users/pages/dashboard-product-page",
    parentId: "features/users/layouts/dashboard-layout",
    path: "/my/dashboard/products/:productId",
    index: void 0,
    caseSensitive: void 0,
    module: route45
  },
  "features/users/layouts/messages-layout": {
    id: "features/users/layouts/messages-layout",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route46
  },
  "features/users/pages/messages-page": {
    id: "features/users/pages/messages-page",
    parentId: "features/users/layouts/messages-layout",
    path: "/my/messages",
    index: true,
    caseSensitive: void 0,
    module: route47
  },
  "features/users/pages/message-page": {
    id: "features/users/pages/message-page",
    parentId: "features/users/layouts/messages-layout",
    path: "/my/messages/:messageRoomId",
    index: void 0,
    caseSensitive: void 0,
    module: route48
  },
  "features/users/pages/my-profile-page": {
    id: "features/users/pages/my-profile-page",
    parentId: "root",
    path: "/my/profile",
    index: void 0,
    caseSensitive: void 0,
    module: route49
  },
  "features/users/pages/settings-page": {
    id: "features/users/pages/settings-page",
    parentId: "root",
    path: "/my/settings",
    index: void 0,
    caseSensitive: void 0,
    module: route50
  },
  "features/users/pages/notifications-page": {
    id: "features/users/pages/notifications-page",
    parentId: "root",
    path: "/my/notifications",
    index: void 0,
    caseSensitive: void 0,
    module: route51
  },
  "features/users/pages/see-notification-page": {
    id: "features/users/pages/see-notification-page",
    parentId: "root",
    path: "/my/notifications/:notificationId/see",
    index: void 0,
    caseSensitive: void 0,
    module: route52
  },
  "features/users/layouts/profile-layout": {
    id: "features/users/layouts/profile-layout",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route53
  },
  "features/users/pages/profile-page": {
    id: "features/users/pages/profile-page",
    parentId: "features/users/layouts/profile-layout",
    path: "/users/:username",
    index: true,
    caseSensitive: void 0,
    module: route54
  },
  "features/users/pages/profile-products-page": {
    id: "features/users/pages/profile-products-page",
    parentId: "features/users/layouts/profile-layout",
    path: "/users/:username/products",
    index: void 0,
    caseSensitive: void 0,
    module: route55
  },
  "features/users/pages/profile-posts-page": {
    id: "features/users/pages/profile-posts-page",
    parentId: "features/users/layouts/profile-layout",
    path: "/users/:username/posts",
    index: void 0,
    caseSensitive: void 0,
    module: route56
  },
  "features/users/pages/send-message-page": {
    id: "features/users/pages/send-message-page",
    parentId: "root",
    path: "/users/:username/messages",
    index: void 0,
    caseSensitive: void 0,
    module: route57
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
