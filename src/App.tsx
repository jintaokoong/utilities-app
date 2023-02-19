import { useRoutes } from "@solidjs/router";
import type { Component } from "solid-js";
import routes from "./configurations/routes";
import { OcMarkgithub2 } from "solid-icons/oc";

const App: Component = () => {
  const Routes = useRoutes(routes);

  return (
    <>
      <a
        href={import.meta.env.VITE_GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        class="absolute top-0 right-0 m-4"
      >
        <OcMarkgithub2 size="1.75rem" class="hover:opacity-60" />
      </a>
      <Routes />
      <footer class="text-center text-gray-500 text-sm mt-10 mb-4">
        Made with ❤️ by {import.meta.env.VITE_AUTHOR_NAME}
      </footer>
    </>
  );
};

export default App;
