const inputVerifier = {
  name: (name: string, setNameError?: any) => {
    if (!name || name === "") {
      //error: name cant be empty
      setNameError("name Cant be empty");
      return false;
    }
    setNameError("");
    return true;
  },
  about: (about: string, setAboutError?: any) => {
    if (!about || about === "") {
      // cant be null
      setAboutError("about Cant be empty");
      return false;
    }
    setAboutError("");
    return true;
  },
  price: (value: number, setPriceError?: any) => {
    if (!value) {
      //error: name cant be empty
      setPriceError("Price cant be empty");
      return false;
    }
    setPriceError("");
    return true;
  },
  image: (image: File, setImageError?: any) => {
    if (!image) {
      // cant be null
      setImageError("image Cant be empty");
      return false;
    }
    setImageError("");
    return true;
  },
  all: () => {
    // if (
    //   inputVerifier.name(name) &&
    //   inputVerifier.about(about) &&
    //   inputVerifier.image(selectedImage)
    // )
    //   return true;
    // else return false;
  },
};

export default inputVerifier;