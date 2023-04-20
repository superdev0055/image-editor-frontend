

import FontFaceObserver from 'fontfaceobserver';

/**
 * @description: Image file to string
 * @param {Blob|File} file document
 * @return {String}
 */
export function getImgStr(file) {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * @description: Download the font file according to the json template
 * @param {String} str
 * @return {Promise}
 */
export function downFontByJSON(str) {
  const skipFonts = ['arial', 'Microsoft YaHei'];
  const fontFamilys = JSON.parse(str)
    .objects.filter(
      (item) =>
        // is text and does not contain fonts
        // eslint-disable-next-line implicit-arrow-linebreak
        item.type.includes('text') && !skipFonts.includes(item.fontFamily)
    )
    .map((item) => item.fontFamily);
    const fontFamilysAll = fontFamilys.map((fontName) => {
    const font = new FontFaceObserver(fontName);
    return font.load(null, 150000);
  });
  return Promise.all(fontFamilysAll);
}

/**
 * @description:Select a document
 * @param {Object} options accept = '', capture = false, multiple = false
 * @return {Promise}
 */
export function selectFiles(options) {
  const createInputFile = ({ accept = '', capture = false, multiple = false }) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = accept;
    input.capture = capture;
    input.multiple = multiple;
    return input;
  };

  return new Promise((resolve) => {
    const input = createInputFile(options);

    input.addEventListener('change', () => resolve(input.files || null));

    setTimeout(() => {
      const event = new MouseEvent('click');
      input.dispatchEvent(event);
    }, 0);
  });
}
