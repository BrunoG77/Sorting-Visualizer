import CompletedEffect from "./Sounds/Completed.mp3";

const right_color_bar = document.getElementsByClassName(
  "right-color-bar"
) as HTMLCollectionOf<HTMLElement>;
const left_color_bar = document.getElementsByClassName(
  "left-color-bar"
) as HTMLCollectionOf<HTMLElement>;
const front_color_bar = document.getElementsByClassName(
  "front-color-bar"
) as HTMLCollectionOf<HTMLElement>;
const back_color_bar = document.getElementsByClassName(
  "back-color-bar"
) as HTMLCollectionOf<HTMLElement>;
const bottom_color_bar = document.getElementsByClassName(
  "bottom"
) as HTMLCollectionOf<HTMLElement>;

export function getBarStyle(index: number): CSSStyleDeclaration[] {
  const barStyle: CSSStyleDeclaration[] = [];

  const elements = [
    right_color_bar[index],
    left_color_bar[index],
    back_color_bar[index],
    front_color_bar[index],
    bottom_color_bar[index],
  ];

  elements.forEach((element) => {
    if (element && element.style) {
      barStyle.push(element.style);
    }
  });

  return barStyle;
}

export function changeBackgroundColor(index: number, color: string): void {
  const styleOfElement = getBarStyle(index);
  for (let i = 0; i < styleOfElement.length; i++)
    styleOfElement[i].backgroundColor = color;
}

export function changeBoxShadow(index: number, shadow: string): void {
  const styleOfElement = getBarStyle(index);
  for (let i = 0; i < styleOfElement.length; i++)
    styleOfElement[i].boxShadow = shadow;
}

export function swapBars(index1: number, index2: number): void {
  const styleOfElement1 = getBarStyle(index1),
    styleOfElement2 = getBarStyle(index2);
  for (let i = 0; i < 4; i++) {
    const tempHeight = styleOfElement1[i].height;
    styleOfElement1[i].height = styleOfElement2[i].height;
    styleOfElement2[i].height = tempHeight;

    const h1 = parseInt(styleOfElement1[i].height, 10),
      h2 = parseInt(styleOfElement2[i].height, 10);

    styleOfElement1[i].transform = `translateY(${60 - h1}vh)`;
    styleOfElement2[i].transform = `translateY(${60 - h2}vh)`;
  }
}

export function resetBarStyleDefault(
  array: number[],
  animationSpeed: number
): void {
  setTimeout(() => {
    for (let i = 0; i < array.length; i++) {
      changeBackgroundColor(i, "rgba(0, 13, 255, 0.5)");
      changeBoxShadow(i, "5px 5px 50px 5px rgba(0, 4, 255, 0.25)");
    }
  }, animationSpeed);
}

export function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function enableButtons(): void {
  (document.getElementById("reset") as HTMLButtonElement).disabled = false;
  (document.getElementById("bubbleSortButton") as HTMLButtonElement).disabled =
    false;
  (
    document.getElementById("selectionSortButton") as HTMLButtonElement
  ).disabled = false;
  (
    document.getElementById("insertionSortButton") as HTMLButtonElement
  ).disabled = false;
  (document.getElementById("range-slider") as HTMLElement).style.opacity = "1";
  (document.getElementById("range-slider") as HTMLElement).style.visibility =
    "visible";
}

export function disableButtons(): void {
  const buttons = [
    "reset",
    "bubbleSortButton",
    "selectionSortButton",
    "insertionSortButton",
  ];

  buttons.forEach((buttonId) => {
    const button = document.getElementById(
      buttonId
    ) as HTMLButtonElement | null;
    if (button) {
      button.disabled = true;
    }
  });

  (document.getElementById("range-slider") as HTMLElement).style.opacity = "0";
  (document.getElementById("range-slider") as HTMLElement).style.visibility =
    "hidden";
}

export function playAudio(myAudio: string): void {
  const audio = new Audio(myAudio);
  audio.preload = "auto";
  const playing = audio.play();
  playing.then(() => {}).catch(() => {});
}

export function playCompletedSoundEffect(): void {
  playAudio(CompletedEffect);
}
