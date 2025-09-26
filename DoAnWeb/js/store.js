function changeMap(location) {
  const map = document.getElementById("google-map");
  const encodedLocation = encodeURIComponent(location);
  map.src = `https://www.google.com/maps?q=${encodedLocation}&output=embed`;
}