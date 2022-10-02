function whatTimeIsIt() {
  const today = new Date();
  const timeNow = today.getHours();
  if ((timeNow > 0 && timeNow < 6) || timeNow >= 21) {
    return false;
  } else {
    return true;
  }
}

function isSunnyNow(icon) {
  if (icon === "sunny") {
    return true;
  } else {
    return false;
  }
}

function isCloudyNow(icon) {
  if (icon === "cloudy") {
    return true;
  } else {
    return false;
  }
}

function isRainyNow(icon) {
  if (icon === "rain") {
    return true;
  } else {
    return false;
  }
}

function isSnowyNow(icon) {
  if (icon === "snow") {
    return true;
  } else {
    return false;
  }
}

function isStormyNow(icon) {
  if (icon === "storm") {
    return true;
  } else {
    return false;
  }
}

function isFoggyNow(icon) {
  if (icon === "fog") {
    return true;
  } else {
    return false;
  }
}

export {
  whatTimeIsIt,
  isSunnyNow,
  isCloudyNow,
  isRainyNow,
  isSnowyNow,
  isStormyNow,
  isFoggyNow,
};
