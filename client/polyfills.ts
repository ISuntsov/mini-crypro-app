if (!URL.canParse) {
  URL.canParse = function (url: string) {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };
}
