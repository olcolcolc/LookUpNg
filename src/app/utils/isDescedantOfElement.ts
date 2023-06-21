export function isDescendantOfElement(element: HTMLElement, className: string): boolean {
  let currentElement: HTMLElement | null = element;

  while (currentElement !== null && currentElement.tagName !== 'HTML') {
    if (currentElement.classList.contains(className)) {
      return true;
    }
    currentElement = currentElement.parentElement;
  }

  return false;
}
