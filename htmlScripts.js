'use strict';

const changeVisibility = (name, index) => {
  const className = `${name}-${index}-visibility`;
  const elements = document.getElementsByClassName(className);
  const elementsLength = elements.length;
  console.log('prima: ', elements[0].style.display)
  for (let i = 0; i < elementsLength; i++) {
    elements[i].style.display = elements[i].style.display === 'none' ? 'table-row': 'none';
  }
  console.log('fatto');
  console.log('dopo: ', elements[0].style.display);
};

const changeToShow = (name, index, field) => {
  const id = `${name}-${index}-${field}`;
  const element = document.getElementById(id);
  console.log('prima : ', element.firstElementChild,element.firstElementChild.className);
  element.firstElementChild.className = element.firstElementChild.className === 'partial' ? 'full' : 'partial';
  const viewMore = document.getElementById(`${id}-viewMore`);
  viewMore.innerHTML = viewMore.innerHTML === 'Collapse' ? 'View more' : 'Collapse';
  viewMore.href = viewMore.innerHTML === 'Collapse' ? `#${id}` : '#';
  console.log('fatto');
  console.log('dopo: ', element.firstElementChild, element.firstElementChild.className);
};
