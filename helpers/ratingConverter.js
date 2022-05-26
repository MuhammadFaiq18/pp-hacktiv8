function ratingConverter(value) {
  if (value >= 90) {
    return "★ ★ ★ ★ ★";
  } else if (value >= 80) {
    return "★ ★ ★ ★";
  } else if (value >= 70) {
    return "★ ★ ★";
  } else if (value >= 60) {
    return "★ ★";
  } else if (value > 0 && value < 60) {
    return "★";
  }
}

module.exports = ratingConverter;
