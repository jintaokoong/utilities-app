import { createEffect, createSignal, Show } from "solid-js";
import { twMerge as twm } from "tailwind-merge";

import { BsArrowRight, BsArrowDown, BsArrowClockwise } from "solid-icons/bs";

const padLeft = (length: number, char: string) => (str: string) => {
  return char.repeat(length - str.length) + str;
};

const padTwoDigits = padLeft(2, "0");

/**
 * Takes a date and returns a string in format "YYYY-MM-DDTHH:MM"
 * @param {Date} date A date object
 */
const getDateTime = (date: Date) => {
  // get local time
  const year = date.getFullYear();
  const month = padTwoDigits((date.getMonth() + 1).toString());
  const day = padTwoDigits(date.getDate().toString());
  const hours = padTwoDigits(date.getHours().toString());
  const minutes = padTwoDigits(date.getMinutes().toString());
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

/**
 * Takes 2 dates in format "YYYY-MM-DDTHH:MM" and returns a random date between them in milliseconds
 * @param min min milliseconds
 * @param max max milliseconds
 */
const getRandomDateWithRange = (min: string, max: string) => {
  const minDate = new Date(min);
  const maxDate = new Date(max);
  const minMilliseconds = minDate.getTime();
  const maxMilliseconds = maxDate.getTime();
  const randomMilliseconds = Math.floor(
    Math.random() * (maxMilliseconds - minMilliseconds) + minMilliseconds
  );
  return randomMilliseconds;
};

const RandomDate = () => {
  const [startDate, setStartDate] = createSignal(getDateTime(new Date()));
  const [endDate, setEndDate] = createSignal(getDateTime(new Date()));

  const [randomDate, setRandomDate] = createSignal<number | null>(null);

  createEffect(() => {
    const r =
      startDate() < endDate() && startDate() !== endDate()
        ? getRandomDateWithRange(startDate(), endDate())
        : null;
    setRandomDate(r);
  });

  return (
    <>
      <h1 class="text-3xl md:text-4xl mt-10 mb-12 font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
        Generate a random date?
      </h1>
      <Show when={randomDate()}>
        <div
          class="mb-8 rounded-md "
          onClick={() => {
            navigator.clipboard.writeText(randomDate().toString());
          }}
        >
          <h2 class="text-xl md:text-2xl font-bold text-gray-400 break-words mb-4">
            <span class="text-gray-700 text-2xl md:text-3xl mr-2  hover:opacity-75 trnasition cursor-pointer hover:underline">
              {randomDate()}
            </span>
            milliseconds
          </h2>
          <button
            class="active:translate-y-0.5 transition-colors text-sm bg-white border-2 border-purple-500 rounded-full px-4 py-2 text-purple-500 font-bold hover:bg-purple-500 hover:text-white"
            onClick={() => {
              const r =
                startDate() < endDate() && startDate() !== endDate()
                  ? getRandomDateWithRange(startDate(), endDate())
                  : null;
              setRandomDate(r);
            }}
          >
            Generate another one
          </button>
        </div>
      </Show>
      <section class="flex flex-col md:flex-row gap-2 mb-2">
        <input
          type="datetime-local"
          class="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md p-4 text-white text-xl font-bold"
          value={startDate()}
          onInput={(e) => setStartDate((e.target as HTMLInputElement).value)}
        />
        <BsArrowRight size={"2rem"} class="self-center hidden md:block" />
        <BsArrowDown size={"2rem"} class="self-center md:hidden" />
        <input
          type="datetime-local"
          class={twm(
            "flex-1 rounded-md p-4 text-white text-xl font-bold ",
            endDate() < startDate()
              ? "bg-red-500"
              : "bg-gradient-to-r from-purple-500 to-pink-500"
          )}
          value={endDate()}
          onInput={(e) => setEndDate((e.target as HTMLInputElement).value)}
        />
      </section>
      <Show when={endDate() < startDate()}>
        <small class="text-red-500 text-sm">
          End date must be after start date
        </small>
      </Show>
    </>
  );
};

const Milliseconds = () => {
  const [chosenDate, setChosenDate] = createSignal(new Date());

  return (
    <section class="max-w-[720px] mx-auto px-4 md:px-0">
      <h1 class="text-3xl md:text-4xl mt-10 mb-12 font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
        Date-time Utilities
      </h1>

      <div class="flex flex-col gap-8">
        <h2 class="text-xl md:text-2xl font-bold text-gray-400 break-words">
          <span
            class="text-gray-700 text-2xl md:text-3xl mr-2 active:-translate-y-0.5 cursor-pointer hover:underline"
            onClick={() =>
              navigator.clipboard.writeText(chosenDate().getTime().toString())
            }
          >
            {chosenDate().getTime()}
          </span>
          milliseconds
        </h2>
        <input
          class="rounded-md text-xl p-4 font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none "
          type="date"
          value={chosenDate().toISOString().split("T")[0]}
          onChange={(e) => setChosenDate(new Date(e.currentTarget.value))}
        />
      </div>
      <RandomDate />
    </section>
  );
};

export default Milliseconds;
