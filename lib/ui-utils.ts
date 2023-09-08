export function createMenu(
  map: google.maps.Map,
  searchCountry: (country: string) => void,
  reset: () => void
) {
  const menuDiv = document.createElement('div');
  menuDiv.style.cssText =
    'margin: 40px 10px; border-radius: 8px; height: 220px; width: 180px;' +
    'background-color: white; font-size: 14px; font-family: Roboto;' +
    'text-align: center; color: grey;line-height: 32px; overflow: hidden';

  const titleDiv = document.createElement('div');
  titleDiv.style.cssText =
    'width: 100%; background-color: #4285f4; color: white; font-size: 20px;' +
    'line-height: 40px;margin-bottom: 24px';
  titleDiv.innerText = 'Options';

  const pieceTitleDiv = document.createElement('div');
  pieceTitleDiv.innerText = 'Select country:';
  pieceTitleDiv.style.fontWeight = '800';

  const countryInput = document.createElement('input');
  countryInput.style.cssText =
    'border: 2px solid lightgrey; background-color: white; color: #4275f4;' +
    'border-radius: 5px;' +
    'width: 150px;' +
    'padding: 6px;';

  const button = document.createElement('button');
  button.innerText = 'Submit';
  button.style.cssText = `
    color: rgb(66, 117, 244);
    font-weight: 800;
    cursor: pointer;
    border-color: rgb(66, 117, 244);
    border-radius: 9px;
    background: aliceblue;
  `;

  button.onclick = () => {
    searchCountry(countryInput.value);
  };

  const resetDiv = document.createElement('div');
  resetDiv.innerText = 'Reset';
  resetDiv.style.cssText =
    'cursor: pointer; border-top: 1px solid lightgrey; margin-top: 18px;' +
    'color: #4275f4; line-height: 40px; font-weight: 800';
  resetDiv.onclick = () => {
    countryInput.value = '';
    reset();
  };

  menuDiv.appendChild(titleDiv);
  menuDiv.appendChild(pieceTitleDiv);
  menuDiv.appendChild(countryInput);
  menuDiv.appendChild(button);
  menuDiv.appendChild(resetDiv);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(menuDiv);
}
