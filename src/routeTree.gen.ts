/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from "@tanstack/react-router";

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as RegisterImport } from "./routes/register";
import { Route as LoginImport } from "./routes/login";
import { Route as Import } from "./routes/*";
import { Route as IndexImport } from "./routes/index";
import { Route as ManageAdminLayoutImport } from "./routes/manage/_adminLayout";
import { Route as ManageAdminLayoutIndexImport } from "./routes/manage/_adminLayout/index";
import { Route as ManageAdminLayoutTeachersImport } from "./routes/manage/_adminLayout/teachers";
import { Route as ManageAdminLayoutSubjectsImport } from "./routes/manage/_adminLayout/subjects";
import { Route as ManageAdminLayoutClassesImport } from "./routes/manage/_adminLayout/classes";

// Create Virtual Routes

const ManageImport = createFileRoute("/manage")();

// Create/Update Routes

const ManageRoute = ManageImport.update({
  path: "/manage",
  getParentRoute: () => rootRoute,
} as any);

const RegisterRoute = RegisterImport.update({
  path: "/register",
  getParentRoute: () => rootRoute,
} as any);

const LoginRoute = LoginImport.update({
  path: "/login",
  getParentRoute: () => rootRoute,
} as any);

const Route = Import.update({
  path: "/*",
  getParentRoute: () => rootRoute,
} as any);

const IndexRoute = IndexImport.update({
  path: "/",
  getParentRoute: () => rootRoute,
} as any);

const ManageAdminLayoutRoute = ManageAdminLayoutImport.update({
  id: "/_adminLayout",
  getParentRoute: () => ManageRoute,
} as any);

const ManageAdminLayoutIndexRoute = ManageAdminLayoutIndexImport.update({
  path: "/",
  getParentRoute: () => ManageAdminLayoutRoute,
} as any);

const ManageAdminLayoutTeachersRoute = ManageAdminLayoutTeachersImport.update({
  path: "/teachers",
  getParentRoute: () => ManageAdminLayoutRoute,
} as any);

const ManageAdminLayoutSubjectsRoute = ManageAdminLayoutSubjectsImport.update({
  path: "/subjects",
  getParentRoute: () => ManageAdminLayoutRoute,
} as any);

const ManageAdminLayoutClassesRoute = ManageAdminLayoutClassesImport.update({
  path: "/classes",
  getParentRoute: () => ManageAdminLayoutRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      id: "/";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    "/*": {
      id: "/*";
      path: "/*";
      fullPath: "/*";
      preLoaderRoute: typeof Import;
      parentRoute: typeof rootRoute;
    };
    "/login": {
      id: "/login";
      path: "/login";
      fullPath: "/login";
      preLoaderRoute: typeof LoginImport;
      parentRoute: typeof rootRoute;
    };
    "/register": {
      id: "/register";
      path: "/register";
      fullPath: "/register";
      preLoaderRoute: typeof RegisterImport;
      parentRoute: typeof rootRoute;
    };
    "/manage": {
      id: "/manage";
      path: "/manage";
      fullPath: "/manage";
      preLoaderRoute: typeof ManageImport;
      parentRoute: typeof rootRoute;
    };
    "/manage/_adminLayout": {
      id: "/manage/_adminLayout";
      path: "/manage";
      fullPath: "/manage";
      preLoaderRoute: typeof ManageAdminLayoutImport;
      parentRoute: typeof ManageRoute;
    };
    "/manage/_adminLayout/classes": {
      id: "/manage/_adminLayout/classes";
      path: "/classes";
      fullPath: "/manage/classes";
      preLoaderRoute: typeof ManageAdminLayoutClassesImport;
      parentRoute: typeof ManageAdminLayoutImport;
    };
    "/manage/_adminLayout/subjects": {
      id: "/manage/_adminLayout/subjects";
      path: "/subjects";
      fullPath: "/manage/subjects";
      preLoaderRoute: typeof ManageAdminLayoutSubjectsImport;
      parentRoute: typeof ManageAdminLayoutImport;
    };
    "/manage/_adminLayout/teachers": {
      id: "/manage/_adminLayout/teachers";
      path: "/teachers";
      fullPath: "/manage/teachers";
      preLoaderRoute: typeof ManageAdminLayoutTeachersImport;
      parentRoute: typeof ManageAdminLayoutImport;
    };
    "/manage/_adminLayout/": {
      id: "/manage/_adminLayout/";
      path: "/";
      fullPath: "/manage/";
      preLoaderRoute: typeof ManageAdminLayoutIndexImport;
      parentRoute: typeof ManageAdminLayoutImport;
    };
  }
}

// Create and export the route tree

interface ManageAdminLayoutRouteChildren {
  ManageAdminLayoutClassesRoute: typeof ManageAdminLayoutClassesRoute;
  ManageAdminLayoutSubjectsRoute: typeof ManageAdminLayoutSubjectsRoute;
  ManageAdminLayoutTeachersRoute: typeof ManageAdminLayoutTeachersRoute;
  ManageAdminLayoutIndexRoute: typeof ManageAdminLayoutIndexRoute;
}

const ManageAdminLayoutRouteChildren: ManageAdminLayoutRouteChildren = {
  ManageAdminLayoutClassesRoute: ManageAdminLayoutClassesRoute,
  ManageAdminLayoutSubjectsRoute: ManageAdminLayoutSubjectsRoute,
  ManageAdminLayoutTeachersRoute: ManageAdminLayoutTeachersRoute,
  ManageAdminLayoutIndexRoute: ManageAdminLayoutIndexRoute,
};

const ManageAdminLayoutRouteWithChildren =
  ManageAdminLayoutRoute._addFileChildren(ManageAdminLayoutRouteChildren);

interface ManageRouteChildren {
  ManageAdminLayoutRoute: typeof ManageAdminLayoutRouteWithChildren;
}

const ManageRouteChildren: ManageRouteChildren = {
  ManageAdminLayoutRoute: ManageAdminLayoutRouteWithChildren,
};

const ManageRouteWithChildren =
  ManageRoute._addFileChildren(ManageRouteChildren);

export interface FileRoutesByFullPath {
  "/": typeof IndexRoute;
  "/*": typeof Route;
  "/login": typeof LoginRoute;
  "/register": typeof RegisterRoute;
  "/manage": typeof ManageAdminLayoutRouteWithChildren;
  "/manage/classes": typeof ManageAdminLayoutClassesRoute;
  "/manage/subjects": typeof ManageAdminLayoutSubjectsRoute;
  "/manage/teachers": typeof ManageAdminLayoutTeachersRoute;
  "/manage/": typeof ManageAdminLayoutIndexRoute;
}

export interface FileRoutesByTo {
  "/": typeof IndexRoute;
  "/*": typeof Route;
  "/login": typeof LoginRoute;
  "/register": typeof RegisterRoute;
  "/manage": typeof ManageAdminLayoutIndexRoute;
  "/manage/classes": typeof ManageAdminLayoutClassesRoute;
  "/manage/subjects": typeof ManageAdminLayoutSubjectsRoute;
  "/manage/teachers": typeof ManageAdminLayoutTeachersRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  "/": typeof IndexRoute;
  "/*": typeof Route;
  "/login": typeof LoginRoute;
  "/register": typeof RegisterRoute;
  "/manage": typeof ManageRouteWithChildren;
  "/manage/_adminLayout": typeof ManageAdminLayoutRouteWithChildren;
  "/manage/_adminLayout/classes": typeof ManageAdminLayoutClassesRoute;
  "/manage/_adminLayout/subjects": typeof ManageAdminLayoutSubjectsRoute;
  "/manage/_adminLayout/teachers": typeof ManageAdminLayoutTeachersRoute;
  "/manage/_adminLayout/": typeof ManageAdminLayoutIndexRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths:
    | "/"
    | "/*"
    | "/login"
    | "/register"
    | "/manage"
    | "/manage/classes"
    | "/manage/subjects"
    | "/manage/teachers"
    | "/manage/";
  fileRoutesByTo: FileRoutesByTo;
  to:
    | "/"
    | "/*"
    | "/login"
    | "/register"
    | "/manage"
    | "/manage/classes"
    | "/manage/subjects"
    | "/manage/teachers";
  id:
    | "__root__"
    | "/"
    | "/*"
    | "/login"
    | "/register"
    | "/manage"
    | "/manage/_adminLayout"
    | "/manage/_adminLayout/classes"
    | "/manage/_adminLayout/subjects"
    | "/manage/_adminLayout/teachers"
    | "/manage/_adminLayout/";
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute;
  Route: typeof Route;
  LoginRoute: typeof LoginRoute;
  RegisterRoute: typeof RegisterRoute;
  ManageRoute: typeof ManageRouteWithChildren;
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  Route: Route,
  LoginRoute: LoginRoute,
  RegisterRoute: RegisterRoute,
  ManageRoute: ManageRouteWithChildren,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/*",
        "/login",
        "/register",
        "/manage"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/*": {
      "filePath": "*.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/register": {
      "filePath": "register.tsx"
    },
    "/manage": {
      "filePath": "manage",
      "children": [
        "/manage/_adminLayout"
      ]
    },
    "/manage/_adminLayout": {
      "filePath": "manage/_adminLayout.tsx",
      "parent": "/manage",
      "children": [
        "/manage/_adminLayout/classes",
        "/manage/_adminLayout/subjects",
        "/manage/_adminLayout/teachers",
        "/manage/_adminLayout/"
      ]
    },
    "/manage/_adminLayout/classes": {
      "filePath": "manage/_adminLayout/classes.tsx",
      "parent": "/manage/_adminLayout"
    },
    "/manage/_adminLayout/subjects": {
      "filePath": "manage/_adminLayout/subjects.tsx",
      "parent": "/manage/_adminLayout"
    },
    "/manage/_adminLayout/teachers": {
      "filePath": "manage/_adminLayout/teachers.tsx",
      "parent": "/manage/_adminLayout"
    },
    "/manage/_adminLayout/": {
      "filePath": "manage/_adminLayout/index.tsx",
      "parent": "/manage/_adminLayout"
    }
  }
}
ROUTE_MANIFEST_END */
