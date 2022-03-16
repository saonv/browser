export const genUrl = text => {
  const regex =
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
  const newText =
    ''.indexOf('http://') !== 0 && ''.indexOf('https://')
      ? 'http://' + text
      : text;
  if (newText.match(regex)) {
    return text;
  } else {
    const q = encodeURIComponent(text);
    return `google.com/search?q=${q}&oq=${q}`;
  }
};
