"use client";

import type { NextComponentType, NextPageContext } from "next";
import { ArrowLeft, ArrowRight } from "../svgs";
import {
  CAROUSEL_CARD_CLASS,
  CAROUSEL_CONTAINER_CLASS,
  CAROUSEL_SCROLL_CONTAINER_CLASS,
} from "./MovieCarousel";
import { MouseEventHandler, useEffect, useRef } from "react";

interface Props {
  variant: "right" | "left";
}

const MovieCarouselArrow: NextComponentType<NextPageContext, {}, Props> = (
  props: Props
) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!buttonRef.current) return;
    buttonRef.current!.style.transition = "opacity 250ms";

    const container = buttonRef.current
      .closest(`.${CAROUSEL_CONTAINER_CLASS}`)
      ?.querySelector(`.${CAROUSEL_SCROLL_CONTAINER_CLASS}`) as
      | undefined
      | HTMLElement;

    if (!container) return;

    const hideCb = props.variant === "left" ? shouldHideLeft : shouldHideRight;
    const updateEl = () => {
      const shouldHide = hideCb(container);
      const style = buttonRef.current!.style;
      style.opacity = shouldHide ? "0" : "1";
      style.visibility = shouldHide ? "hidden" : "visible";
    };

    const listener = () => updateEl();

    updateEl();

    container.addEventListener("scroll", listener);

    return () => {
      container.removeEventListener("scroll", listener);
    };
  }, [buttonRef.current]);

  return props.variant === "left" ? (
    <button
      onClick={handleLeft}
      ref={buttonRef}
      className="absolute left-0 top-0 h-full w-16 bg-black bg-opacity-20 cursor-pointer grid place-items-center carousel-button z-10"
    >
      <ArrowLeft width="80%" height="80%" className="text-white" />
    </button>
  ) : (
    <button
      ref={buttonRef}
      onClick={handleRight}
      className="absolute right-0 top-0 h-full w-16 bg-black bg-opacity-20 cursor-pointer grid place-items-center carousel-button z-10"
    >
      <ArrowRight width="80%" height="80%" className="text-white" />
    </button>
  );
};

const handleLeft: MouseEventHandler<HTMLButtonElement> = (e) => {
  const res = prepareElements(e as unknown as MouseEvent);

  if (!res) return;
  const { scrollContainer, numVisible, cards } = res;

  const leftMost = findLeftMost(scrollContainer, cards);
  if (leftMost === undefined) return;

  const idx = leftMost - (leftMost % numVisible);
  const scrollTo =
    cards[Math.max(idx === leftMost ? idx - numVisible : idx, 0)];
  scrollTo.scrollIntoView();
};

const handleRight: MouseEventHandler<HTMLButtonElement> = (e) => {
  const res = prepareElements(e as unknown as MouseEvent);

  if (!res) return;
  const { scrollContainer, numVisible, cards } = res;

  const rightMost = findRightMost(scrollContainer, cards);
  if (rightMost === undefined) return;

  const scrollTo =
    cards[
      Math.min(
        rightMost - ((rightMost + 1) % numVisible) + numVisible,
        cards.length - 1
      )
    ];
  scrollTo.scrollIntoView();
};

const prepareElements = (e: MouseEvent) => {
  const container = (e.target as HTMLButtonElement).closest(
    `.${CAROUSEL_CONTAINER_CLASS}`
  ) as HTMLDivElement;
  if (!container) return;

  const card = container.querySelector(`.${CAROUSEL_CARD_CLASS}`);
  if (!card) return;

  const cards = container.querySelectorAll(`.${CAROUSEL_CARD_CLASS}`) as
    | NodeListOf<HTMLDivElement>
    | undefined;
  if (!cards) return;

  const numVisible = parseInt(
    container.style.getPropertyValue("--num-visible")
  );

  const scrollContainer = container.querySelector(
    `.${CAROUSEL_SCROLL_CONTAINER_CLASS}`
  ) as HTMLDivElement;
  if (!scrollContainer) return;

  return { scrollContainer, cards, numVisible };
};

const findLeftMost = (
  container: HTMLDivElement,
  cards: NodeListOf<HTMLDivElement>
) => {
  const scrollLeft = container.scrollLeft;

  for (let i = 0; i < cards.length; i++) {
    const cardOffset = cards[i].offsetLeft;
    if (cardOffset > scrollLeft || Math.abs(cardOffset - scrollLeft) < 3)
      return i;
  }

  return undefined;
};

const findRightMost = (
  container: HTMLDivElement,
  cards: NodeListOf<HTMLDivElement>
) => {
  const containerRight =
    container.scrollLeft + container.getBoundingClientRect().width;
  const cardWidth = cards[0].getBoundingClientRect().width;

  for (let i = 0; i < cards.length; i++) {
    const cardRight = cards[i].offsetLeft + cardWidth;
    if (cardRight > containerRight || Math.abs(cardRight - containerRight) < 3)
      return i;
  }

  return undefined;
};


const shouldHideLeft = (el: HTMLElement) => el.scrollLeft === 0;

const shouldHideRight = (el: HTMLElement) => {
  return el.scrollLeft + el.offsetWidth >= el.scrollWidth;
};


export default MovieCarouselArrow;
