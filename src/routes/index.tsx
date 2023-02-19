import { NavLink } from "@solidjs/router";
import { ParentComponent } from "solid-js";

const GradientGridItem: ParentComponent<{ href?: string }> = ({
  children,
  href,
}) => (
  <NavLink href={href}>
    <div class="bg-gradient-to-r from-purple-500 to-pink-500 p-1">
      <div class="py-2 font-bold text-lg w-full hover:bg-opacity-0 transition  bg-white hover:text-white">
        {children}
      </div>
    </div>
  </NavLink>
);

const Index = () => {
  return (
    <>
      <section class="max-w-max mx-auto text-center">
        <h1 class="text-4xl text-center my-14  text-gray-700">
          Which utility would you like to use? 🧰
        </h1>
        <section class="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          <GradientGridItem href="/datetime">Date-time</GradientGridItem>
        </section>
      </section>
    </>
  );
};

export default Index;
