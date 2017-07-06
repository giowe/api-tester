

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
